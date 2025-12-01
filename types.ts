export type LLMProvider = 'gemini' | 'ollama';

export interface AppSettings {
  provider: LLMProvider;
  ollamaUrl: string;
  ollamaModel: string;
  targetWords: number;
}

export interface DailyContent {
  date: string; // YYYY-MM-DD
  topic: string;
  description: string;
  vocabulary: {
    word: string;
    definition: string;
    example: string;
  }[];
  plan?: string;
}

export interface AnalysisResult {
  score: number;
  feedback: string;
  suggestions: string[];
}
