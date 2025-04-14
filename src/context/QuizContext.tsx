import { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { QuizState, Question, PlayerScore } from "@/types";
import {
  getQuestionsByCategory,
  calculateScore,
  leaderboardData,
  getCategoryById,
} from "@/data/quiz-data";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/components/ui/use-toast";

interface QuizContextType {
  startQuiz: (categoryId: string, playerName: string) => void;
  submitAnswer: (
    questionId: string,
    optionId: string,
    timeSpent: number
  ) => void;
  endQuiz: () => void;
  currentQuestionData: Question | null;
  quizState: QuizState | null;
  playerName: string;
  categoryId: string;
  isQuizActive: boolean;
  timePerQuestion: number;
  updateTimePerQuestion: (newTime: number) => void;
  leaderboard: PlayerScore[];
  addToLeaderboard: (score: PlayerScore) => void;
  getLeaderboard: (categoryId?: string) => PlayerScore[];
}

const initialQuizState: QuizState = {
  currentQuestion: 0,
  timeSpent: 0,
  score: 0,
  answers: [],
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [quizState, setQuizState] = useState<QuizState | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [playerName, setPlayerName] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [isQuizActive, setIsQuizActive] = useState<boolean>(false);
  const [leaderboard, setLeaderboard] =
    useState<PlayerScore[]>(leaderboardData);
  const [timePerQuestion, setTimePerQuestion] = useState(() => {
    // Get the saved quiz duration from localStorage
    const savedDuration = localStorage.getItem("pixelQuizDuration");
    if (savedDuration === "quick") return 20;
    if (savedDuration === "extended") return 45;
    return 30; // Default normal duration
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const currentQuestionData =
    quizState && quizState.currentQuestion < questions.length
      ? questions[quizState.currentQuestion]
      : null;

  const updateTimePerQuestion = (newTime: number) => {
    setTimePerQuestion(newTime);
  };

  const startQuiz = (categoryId: string, playerName: string) => {
    const categoryQuestions = getQuestionsByCategory(categoryId);

    if (categoryQuestions.length === 0) {
      toast({
        title: "Error",
        description: "No questions found for this category",
        variant: "destructive",
      });
      return;
    }

    setQuestions(categoryQuestions);
    setPlayerName(playerName);
    setCategoryId(categoryId);
    setQuizState({ ...initialQuizState });
    setIsQuizActive(true);

    navigate(`/quiz/${categoryId}`);
  };

  const submitAnswer = (
    questionId: string,
    optionId: string,
    timeSpent: number
  ) => {
    if (!quizState || !currentQuestionData) return;

    const selectedOption = currentQuestionData.options.find(
      (opt) => opt.id === optionId
    );

    if (!selectedOption) return;

    const isCorrect = selectedOption.isCorrect;
    const scoreDelta = calculateScore(isCorrect, timeSpent, timePerQuestion);

    const newAnswer = {
      questionId,
      selectedOptionId: optionId,
      isCorrect,
      timeSpent,
    };

    setQuizState((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        timeSpent: prev.timeSpent + timeSpent,
        score: prev.score + scoreDelta,
        answers: [...prev.answers, newAnswer],
      };
    });

    // If this was the last question, end the quiz
    if (quizState.currentQuestion === questions.length - 1) {
      setTimeout(() => {
        endQuiz();
      }, 1000);
    }
  };

  const endQuiz = () => {
    if (!quizState || !categoryId || !playerName) return;

    const category = getCategoryById(categoryId);
    if (!category) return;

    const correctAnswers = quizState.answers.filter((a) => a.isCorrect).length;

    const newScore: PlayerScore = {
      id: uuidv4(),
      name: playerName,
      score: quizState.score,
      timeSpent: quizState.timeSpent,
      correctAnswers,
      totalQuestions: questions.length,
      categoryId,
      date: new Date(),
    };
    
    addToLeaderboard(newScore);
    setIsQuizActive(false);
    navigate("/results");
  };

  const addToLeaderboard = (score: PlayerScore) => {
    setLeaderboard((prev) =>
      [...prev, score].sort((a, b) => b.score - a.score)
    );

    toast({
      title: "Score saved!",
      description: `You scored ${score.score} points!`,
    });
  };

  const getLeaderboard = (categoryId?: string): PlayerScore[] => {
    if (!categoryId) return [...leaderboard].sort((a, b) => b.score - a.score);
    return [...leaderboard]
      .filter((score) => score.categoryId === categoryId)
      .sort((a, b) => b.score - a.score);
  };

  return (
    <QuizContext.Provider
      value={{
        startQuiz,
        submitAnswer,
        endQuiz,
        currentQuestionData,
        quizState,
        playerName,
        categoryId,
        isQuizActive,
        timePerQuestion,
        updateTimePerQuestion,
        leaderboard,
        addToLeaderboard,
        getLeaderboard,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};
