import { GoogleGenAI, Type } from "@google/genai";
import { AppSettings, DailyContent, AnalysisResult } from '../types';

// Initialize Gemini client (will only work if API_KEY is present)
const apiKey = process.env.API_KEY || '';
let geminiClient: GoogleGenAI | null = null;
if (apiKey) {
  geminiClient = new GoogleGenAI({ apiKey });
}

// Helper to check if we can use Gemini
export const isGeminiAvailable = () => !!geminiClient;

/**
 * Generates the daily topic and vocabulary.
 */
export const generateDailyContent = async (settings: AppSettings): Promise<DailyContent> => {
  const prompt = `
    Generate a unique, thought-provoking daily writing topic for a journal. 
    Also provide 2 sophisticated vocabulary words that would fit well with this topic.
    Return JSON format with keys: topic, description, vocabulary (array of objects with word, definition, example).
  `;

  if (settings.provider === 'gemini' && isGeminiAvailable()) {
    try {
      const response = await geminiClient!.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              topic: { type: Type.STRING },
              description: { type: Type.STRING },
              vocabulary: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    word: { type: Type.STRING },
                    definition: { type: Type.STRING },
                    example: { type: Type.STRING },
                  }
                }
              }
            }
          }
        }
      });
      return JSON.parse(response.text) as DailyContent;
    } catch (e) {
      console.error("Gemini Error:", e);
      throw new Error("Failed to fetch from Gemini");
    }
  } else if (settings.provider === 'ollama') {
    return fetchOllamaJSON<DailyContent>(settings, prompt);
  }

  // Fallback if no provider configured or fails
  return {
    date: new Date().toISOString().split('T')[0],
    topic: "Reflection on Silence",
    description: "Write about a moment of silence that spoke louder than words.",
    vocabulary: [
      { word: "Taciturn", definition: "Reserved or uncommunicative in speech; saying little.", example: "He was a taciturn man who rarely joined the conversation." },
      { word: "Ephemeral", definition: "Lasting for a very short time.", example: "Fashions are ephemeral, changing with every season." }
    ]
  };
};

/**
 * Generates a writing plan/outline based on the topic.
 */
export const generateWritingPlan = async (settings: AppSettings, topic: string): Promise<string> => {
  const prompt = `
    Create a structured writing outline for a journal entry about: "${topic}".
    The goal is to write 500-700 words.
    Provide 3-4 section headers with guiding questions for each.
    Keep it concise.
  `;

  if (settings.provider === 'gemini' && isGeminiAvailable()) {
    const response = await geminiClient!.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } else if (settings.provider === 'ollama') {
    return fetchOllamaText(settings, prompt);
  }
  return "Could not generate plan. Please check your AI settings.";
};

/**
 * Analyzes the user's text.
 */
export const analyzeWriting = async (settings: AppSettings, text: string, topic: string): Promise<AnalysisResult> => {
  const prompt = `
    Analyze this journal entry based on the topic: "${topic}".
    Text: "${text}"
    
    Provide:
    1. A score from 1-100 based on clarity, depth, and vocabulary usage.
    2. Brief encouraging feedback (max 2 sentences).
    3. 3 specific suggestions for improvement (e.g., specific sentence rewrites or questions to expand on).
    
    Return JSON.
  `;

  if (settings.provider === 'gemini' && isGeminiAvailable()) {
    const response = await geminiClient!.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                score: { type: Type.NUMBER },
                feedback: { type: Type.STRING },
                suggestions: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
        }
      }
    });
    return JSON.parse(response.text) as AnalysisResult;
  } else if (settings.provider === 'ollama') {
    return fetchOllamaJSON<AnalysisResult>(settings, prompt);
  }

  return {
    score: 0,
    feedback: "AI service not connected.",
    suggestions: ["Check settings", "Try writing more"]
  };
};

/**
 * Autocompletes the next 1-2 sentences.
 */
export const generateCompletion = async (settings: AppSettings, currentText: string, topic: string): Promise<string> => {
  // We only send the last 1000 characters to keep context relevant and fast
  const context = currentText.slice(-1000);
  const prompt = `
    You are a writing assistant. Continue the following text naturally, keeping the same tone and style.
    The topic is: "${topic}".
    
    Current text: "...${context}"
    
    Generate only the next 1-2 sentences to help the writer continue. Do not repeat the existing text.
  `;

  if (settings.provider === 'gemini' && isGeminiAvailable()) {
    const response = await geminiClient!.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text.trim();
  } else if (settings.provider === 'ollama') {
    return fetchOllamaText(settings, prompt);
  }
  return "";
};

/**
 * Fixes grammar and spelling for the provided text.
 */
export const fixGrammar = async (settings: AppSettings, text: string): Promise<string> => {
  const prompt = `
    Act as a professional editor. Correct the grammar, spelling, and punctuation of the following text.
    Do not change the style, tone, or meaning. Only fix errors.
    Return ONLY the corrected text.
    
    Text to fix:
    "${text}"
  `;

  if (settings.provider === 'gemini' && isGeminiAvailable()) {
    const response = await geminiClient!.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text.trim();
  } else if (settings.provider === 'ollama') {
    return fetchOllamaText(settings, prompt);
  }
  return text;
};

// --- Ollama Helpers ---

async function fetchOllamaText(settings: AppSettings, prompt: string): Promise<string> {
  try {
    const response = await fetch(`${settings.ollamaUrl}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: settings.ollamaModel,
        prompt: prompt,
        stream: false
      })
    });
    
    if (!response.ok) throw new Error('Ollama connection failed');
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Ollama Error:", error);
    throw new Error("Failed to connect to Ollama. Ensure it is running and CORS is configured (OLLAMA_ORIGINS='*').");
  }
}

async function fetchOllamaJSON<T>(settings: AppSettings, prompt: string): Promise<T> {
  // We append a robust instruction for JSON ensuring Ollama complies
  const jsonPrompt = `${prompt} \n\n IMPORTANT: RESPOND ONLY WITH VALID JSON. NO MARKDOWN.`;
  
  try {
    const text = await fetchOllamaText(settings, jsonPrompt);
    // Simple cleanup to extract JSON if model wraps it in markdown blocks
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanText);
  } catch (e) {
    console.error("Ollama JSON Parse Error", e);
    throw new Error("Ollama response was not valid JSON.");
  }
}
