export type LLMProvider = 'gemini' | 'ollama';

export interface AppSettings {
  provider: LLMProvider;
  ollamaUrl: string;
  ollamaModel: string;
  targetWords: number;
}

export interface DailyContent {
  date: string; // YYYY-MM-DD or "Day X"
  topic: string;
  description: string;
  vocabulary: {
    word: string;
    definition: string;
    example: string;
  }[];
  plan?: string;
  isCourse?: boolean; // Flag to identify if this is a course day
  courseDay?: number;
}

export interface AnalysisResult {
  score: number;
  feedback: string;
  suggestions: string[];
}

export interface CourseDay {
  day: number;
  title: string;
  focus: string;
  prompt: string;
  vocab: { word: string; definition: string; example: string; }[];
}

export interface Book {
  title: string;
  author: string;
  description: string;
  coverColor: string;
}