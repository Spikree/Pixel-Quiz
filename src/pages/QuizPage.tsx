import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useQuiz } from "@/context/QuizContext";
import PixelatedBox from "@/components/PixelatedBox";
import PixelButton from "@/components/PixelButton";
import PixelHeader from "@/components/PixelHeader";
import Timer from "@/components/Timer";
import ProgressBar from "@/components/ProgressBar";
import { getCategoryById } from "@/data/quiz-data";
import { CheckCircle2, XCircle } from "lucide-react";

const QuizPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const {
    currentQuestionData,
    quizState,
    submitAnswer,
    endQuiz,
    timePerQuestion,
    isQuizActive,
  } = useQuiz();

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  // const [timeSpent, setTimeSpent] = useState(0);

  const category = categoryId ? getCategoryById(categoryId) : undefined;

  // Reset timer when new question loads
  useEffect(() => {
    if (currentQuestionData) {
      setQuestionStartTime(Date.now());
      setSelectedOption(null);
      setShowFeedback(false);
    }
  }, [currentQuestionData]);

  const handleSelectOption = (optionId: string) => {
    if (selectedOption || !currentQuestionData) return;

    setSelectedOption(optionId);
    const timeSpentMs = Date.now() - questionStartTime;
    const timeSpentSec = Math.min(
      Math.floor(timeSpentMs / 1000),
      timePerQuestion
    );
    // setTimeSpent(timeSpentSec);

    const selectedAnswerIsCorrect = currentQuestionData.options.find(
      (opt) => opt.id === optionId
    )?.isCorrect;

    setIsCorrect(!!selectedAnswerIsCorrect);
    setShowFeedback(true);

    // Submit answer after showing feedback
    setTimeout(() => {
      if (currentQuestionData) {
        submitAnswer(currentQuestionData.id, optionId, timeSpentSec);
      }
      setShowFeedback(false);
    }, 1500);
  };

  const handleTimeUp = () => {
    if (selectedOption || !currentQuestionData) return;

    // Auto-select a wrong answer when time is up
    const wrongOption = currentQuestionData.options.find(
      (opt) => !opt.isCorrect
    );
    if (wrongOption) {
      setSelectedOption(wrongOption.id);
      setIsCorrect(false);
      setShowFeedback(true);

      setTimeout(() => {
        if (currentQuestionData) {
          submitAnswer(currentQuestionData.id, wrongOption.id, timePerQuestion);
        }
        setShowFeedback(false);
      }, 1500);
    }
  };

  if (!currentQuestionData || !quizState || !category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <PixelatedBox>
          <PixelHeader>Loading Quiz...</PixelHeader>
          <PixelButton onClick={() => navigate("/")} variant="secondary">
            Back to Home
          </PixelButton>
        </PixelatedBox>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <PixelatedBox className="w-full max-w-3xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <PixelHeader level={2}>{category.name}</PixelHeader>
          <div className="flex space-x-4 items-center">
            <div className="text-pixel-black font-minecraft">
              Score:{" "}
              <span className="text-minecraft-grass">{quizState.score}</span>
            </div>
            <Timer
              key={currentQuestionData.id} // Add key to force re-render when question changes
              duration={timePerQuestion}
              onTimeUp={handleTimeUp}
              isRunning={!showFeedback && !selectedOption}
            />
          </div>
        </div>

        <ProgressBar
          current={quizState.currentQuestion + 1}
          total={category.questionsCount}
          className="mb-6"
        />

        <motion.div
          key={currentQuestionData.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <h3 className="text-xl font-minecraft mb-8 text-center p-4 border-b-4 border-pixel-black">
            {currentQuestionData.text}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestionData.options.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  p-4 border-4 cursor-pointer transition-all
                  ${
                    selectedOption === option.id
                      ? option.isCorrect
                        ? "border-minecraft-grass bg-minecraft-grass/20"
                        : "border-red-500 bg-red-100"
                      : "border-pixel-black hover:border-minecraft-dirt"
                  }
                  ${
                    showFeedback && option.isCorrect
                      ? "border-minecraft-grass bg-minecraft-grass/20"
                      : ""
                  }
                `}
                onClick={() => handleSelectOption(option.id)}
              >
                <div className="flex items-center">
                  {showFeedback && option.id === selectedOption && (
                    <span className="mr-2">
                      {option.isCorrect ? (
                        <CheckCircle2 className="h-5 w-5 text-minecraft-grass" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </span>
                  )}
                  <span className="font-minecraft">{option.text}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {showFeedback && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-4 rounded border-4 mb-4 text-center font-minecraft ${
                isCorrect
                  ? "border-minecraft-grass bg-minecraft-grass/10 text-minecraft-grass"
                  : "border-red-500 bg-red-100 text-red-500"
              }`}
            >
              {isCorrect
                ? "Correct! Well done!"
                : "Incorrect! Try again next time!"}
            </motion.div>
          </AnimatePresence>
        )}

        <div className="flex justify-between mt-4">
          <PixelButton onClick={() => endQuiz()} variant="secondary">
            Quit Quiz
          </PixelButton>

          {quizState.currentQuestion === category.questionsCount - 1 &&
            selectedOption &&
            !showFeedback && (
              <PixelButton onClick={() => navigate("/results")}>
                See Results
              </PixelButton>
            )}
        </div>
      </PixelatedBox>
    </div>
  );
};

export default QuizPage;
