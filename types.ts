
export type AppView = 'intro' | 'quiz' | 'analyzing' | 'result' | 'main';

export interface QuizStep {
  id: number;
  question: string;
  options: string[];
}

export interface GalleryImage {
  url: string;
  type: 'before-after' | 'personal' | 'comment';
}
