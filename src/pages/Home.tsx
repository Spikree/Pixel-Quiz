import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuiz } from "@/context/QuizContext";
import { categories } from "@/data/quiz-data";
import PixelatedBox from "@/components/PixelatedBox";
import PixelButton from "@/components/PixelButton";
import PixelHeader from "@/components/PixelHeader";
import { Input } from "@/components/ui/input";
import { Gamepad2, Award, Clock, ArrowRight, Star, Brain, Zap, Trophy, HelpCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import audioManager from "@/utils/audio";
// import confetti from "@/utils/confetti";
// import minecraftCelebration from "@/utils/minecraftCelebration";

const Home = () => {
  const [playerName, setPlayerName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const { startQuiz, getLeaderboard, timePerQuestion } = useQuiz();
  const { toast } = useToast();
  const navigate = useNavigate();

   // Display a welcome animation on first load only if it's never been shown
   useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("pixelQuizWelcomeSeen");
    
    if (!hasSeenWelcome) {
      setShowWelcome(true);
      const timer = setTimeout(() => {
        setShowWelcome(false);
        localStorage.setItem("pixelQuizWelcomeSeen", "true");
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const savedName = localStorage.getItem("pixelQuizPlayerName");
    if (savedName) {
      setPlayerName(savedName);
    }
  }, []);

  const handleStartQuiz = () => {
    if (!playerName.trim()) {
      toast({
        title: "Enter your name",
        description: "Please enter your name to start the quiz",
        variant: "destructive",
      });
      return;
    }

    if (!selectedCategory) {
      toast({
        title: "Select a category",
        description: "Please select a quiz category to continue",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem("pixelQuizPlayerName", playerName);
    // minecraftCelebration.start();
    // setTimeout(() => {
    //   minecraftCelebration.stop();
    //   startQuiz(selectedCategory, playerName);
    // }, 1000);

    startQuiz(selectedCategory, playerName);
  };

  const topScores = getLeaderboard().slice(0, 3);

  // Welcome animation
  if (showWelcome) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="text-center"
        >
          <h1 className="text-5xl font-pixel text-pixel-black mb-4">
            <span className="text-minecraft-grass">P</span>
            <span className="text-minecraft-dirt">i</span>
            <span className="text-pixel-blue">x</span>
            <span className="text-minecraft-grass">e</span>
            <span className="text-minecraft-wood">l</span>
            <span> </span>
            <span className="text-minecraft-water">Q</span>
            <span className="text-minecraft-leaves">u</span>
            <span className="text-minecraft-dirt">i</span>
            <span className="text-pixel-black">z</span>
          </h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="font-minecraft text-pixel-brown text-xl">Loading adventure...</p>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  const handleButtonClickSound = () => {
    audioManager.playButtonClick();
  }
  
  return (
    <div className="min-h-screen pixel-gradient-bg font-pixelify mt-10 mb-4 pt-16 pb-8 overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-screen-xl">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-press-start text-pixel-black mb-2 relative inline-block">
            Pixel Quiz Quest
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -top-5 -right-5 text-yellow-500"
            >
              <Star className="w-8 h-8 sm:w-10 sm:h-10" />
            </motion.div>
          </h1>
          <p className="text-base sm:text-lg font-vt323 text-pixel-brown">
            Test your knowledge and compete for high scores!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          <div className="lg:col-span-8">
            <PixelatedBox className="mb-6 p-4 sm:p-6">
              <PixelHeader className="text-xl sm:text-2xl">Choose Your Quest</PixelHeader>
              <div className="mb-4 sm:mb-6">
                <label className="block mb-2 font-pixelify text-base sm:text-lg text-pixel-black">
                  Enter Your Name:
                </label>
                <Input
                  type="text"
                  value={playerName}
                  onChange={(e) => {setPlayerName(e.target.value);handleButtonClickSound()}}
                  placeholder="Your gaming nickname"
                  className="pixel-input w-full font-pixelify text-base py-2 sm:py-3"
                  maxLength={15}
                />
              </div>

              <div className="mb-4 sm:mb-6">
                <h3 className="font-pixelify text-base sm:text-lg text-pixel-black mb-3 sm:mb-4 flex items-center">
                  <Gamepad2 className="mr-2 w-5 h-5 sm:w-6 sm:h-6" />
                  Select Quiz Category:
                </h3>
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  {categories.map((category, index) => (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`cursor-pointer p-3 sm:p-4 border-4 ${
                        selectedCategory === category.id
                          ? "border-minecraft-grass bg-minecraft-grass/20"
                          : "border-pixel-black"
                      } hover:border-minecraft-grass transition-colors`}
                      onClick={() => {setSelectedCategory(category.id);handleButtonClickSound()}}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6" />
                        <div
                          className={`inline-block px-2 py-1 rounded text-xs font-pixelify ${
                            category.difficulty === "easy"
                              ? "bg-minecraft-grass text-white"
                              : category.difficulty === "medium"
                              ? "bg-minecraft-dirt text-white"
                              : "bg-red-500 text-white"
                          }`}
                        >
                          {category.difficulty.toUpperCase()}
                        </div>
                      </div>
                      <h4 className="font-pixelify text-sm sm:text-base mb-1">{category.name}</h4>
                      <p className="text-xs sm:text-sm font-vt323 text-pixel-black/80">
                        {category.description}
                      </p>
                      <div className="mt-2 text-xs font-pixelify flex items-center gap-3 sm:gap-4">
                        <div className="flex items-center">
                          <Brain className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          <span>{category.questionsCount} Questions</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          <span>{timePerQuestion} per question</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-4 sm:mt-6">
                <PixelButton
                  onClick={() => {handleStartQuiz();handleButtonClickSound()}}
                  className="font-pixelify px-4 py-2 text-base sm:px-6 sm:py-3 sm:text-lg"
                >
                  <Zap className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                  Start Quest!
                </PixelButton>
                <PixelButton
                  onClick={() => {navigate('/leaderboard');handleButtonClickSound();}}
                  variant="secondary"
                  className="font-pixelify px-4 py-2 text-base sm:px-6 sm:py-3 sm:text-lg"
                >
                  <Trophy className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                  Leaderboard
                </PixelButton>
              </div>
            </PixelatedBox>
          </div>

          <div className="lg:col-span-4">
            <PixelatedBox className="mb-4 sm:mb-6 p-4 sm:p-6">
              <PixelHeader level={2} className="text-lg sm:text-xl">
                Top Adventurers
              </PixelHeader>
              {topScores.length > 0 ? (
                <div className="space-y-3">
                  {topScores.map((score, index) => (
                    <motion.div
                      key={score.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center p-3 border-2 cursor-pointer border-pixel-black bg-white/50"
                    >
                      <div className="flex items-center justify-center w-8 h-8 mr-3">
                        {index === 0 ? (
                          <Award className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
                        ) : index === 1 ? (
                          <Award className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                        ) : (
                          <Award className="w-5 h-5 sm:w-6 sm:h-6 text-amber-700" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-pixelify text-sm sm:text-base">{score.name}</p>
                        <div className="flex justify-between">
                          <span className="text-xs sm:text-sm text-pixel-green font-bold">
                            {score.score} pts
                          </span>
                          <span className="text-xs text-pixel-black/70">
                            {new Date(score.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <div className="text-center mt-4">
                    <PixelButton
                      onClick={() => {navigate('/leaderboard');handleButtonClickSound();}}
                      variant="secondary"
                      className="text-xs sm:text-sm w-full font-pixelify px-4 py-2 sm:px-6 sm:py-3"
                    >
                      View All Scores
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </PixelButton>
                  </div>
                </div>
              ) : (
                <div className="text-center p-4">
                  <p className="font-pixelify text-pixel-black/70 text-sm sm:text-base">
                    No scores yet! Be the first adventurer on the leaderboard.
                  </p>
                </div>
              )}
            </PixelatedBox>

            <PixelatedBox className="p-4 sm:p-6">
              <PixelHeader level={2} className="text-lg sm:text-xl">
                Quick Tips
              </PixelHeader>
              <ul className="space-y-3 font-pixelify text-xs sm:text-sm">
                <li className="flex items-start">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-minecraft-dirt flex-shrink-0 mt-1" />
                  <span>Answer faster to earn more points!</span>
                </li>
                <li className="flex items-start">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-minecraft-grass flex-shrink-0 mt-1" />
                  <span>Earn achievements by completing quizzes</span>
                </li>
                <li className="flex items-start">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-minecraft-wood flex-shrink-0 mt-1" />
                  <span>Check the leaderboard to see top players</span>
                </li>
              </ul>
              <div className="mt-4 text-center">
                <PixelButton
                  onClick={() => {navigate('/how-to-play');handleButtonClickSound()}}
                  variant="secondary"
                  className="text-xs sm:text-sm w-full font-pixelify px-4 py-2 sm:px-6 sm:py-3"
                >
                  <HelpCircle className="mr-2 w-4 h-4" />
                  How to Play
                </PixelButton>
              </div>
            </PixelatedBox>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;