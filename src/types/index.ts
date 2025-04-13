
export interface QuizCategory {
    id: string;
    name: string;
    description: string;
    imageUrl?: string;
    questionsCount: number;
    difficulty: 'easy' | 'medium' | 'hard';
  }
  
  export interface Question {
    id: string;
    text: string;
    options: {
      id: string;
      text: string;
      isCorrect: boolean;
    }[];
    explanation?: string;
    categoryId: string;
  }
  
  export interface PlayerScore {
    id: string;
    name: string;
    score: number;
    timeSpent: number; // in seconds
    correctAnswers: number;
    totalQuestions: number;
    categoryId: string;
    date: Date;
  }
  
  export interface QuizState {
    currentQuestion: number;
    timeSpent: number;
    score: number;
    answers: {
      questionId: string;
      selectedOptionId: string;
      isCorrect: boolean;
      timeSpent: number;
    }[];
  }
  