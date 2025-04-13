
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
import confetti from "@/utils/confetti";

const Home = () => {
  const [playerName, setPlayerName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const { startQuiz, getLeaderboard } = useQuiz();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Display a welcome animation on first load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Load player name from local storage if available
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
    
    // Save player name to local storage
    localStorage.setItem("pixelQuizPlayerName", playerName);
    
    // Start confetti effect
    confetti.start();
    
    // Stop confetti after 2 seconds
    setTimeout(() => {
      confetti.stop();
      startQuiz(selectedCategory, playerName);
    }, 1000);
  };
  
  // Get top scores for the featured section
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
            <p className="font-pixelfy text-pixel-brown text-xl">Loading adventure...</p>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="font-pixelfy text-4xl md:text-6xl  text-pixel-black mb-2 relative inline-block">
            Pixel Quiz 
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -top-6 -right-6 text-yellow-500"
            >
              <Star className="w-10 h-10" />
            </motion.div>
          </h1>
          <p className="text-xl font-pixelfy text-pixel-brown">
            Test your knowledge and compete for high scores!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <PixelatedBox className="mb-8">
              <PixelHeader>Choose Your Quest</PixelHeader>
              <div className="mb-6">
                <label className="block mb-2 font-pixelfy text-lg text-pixel-black">
                  Enter Your Name:
                </label>
                <Input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Your gaming nickname"
                  className="pixel-input w-full font-pixelfy"
                  maxLength={15}
                />
              </div>

              <div className="mb-6">
                <h3 className="font-pixelfy text-lg text-pixel-black mb-4 flex items-center">
                  <Gamepad2 className="mr-2" />
                  Select Quiz Category:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map((category, index) => (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`cursor-pointer p-4 border-4 ${
                        selectedCategory === category.id
                          ? "border-minecraft-grass bg-minecraft-grass/20"
                          : "border-pixel-black"
                      } hover:border-minecraft-grass transition-colors`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <Gamepad2 className="w-6 h-6" />
                        <div
                          className={`inline-block px-2 py-1 rounded text-xs font-pixelfy ${
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
                      <h4 className="font-pixelfy text-base mb-1">{category.name}</h4>
                      <p className="text-sm text-pixel-black/80">{category.description}</p>
                      <div className="mt-2 text-xs font-pixelfy flex items-center">
                        <div className="flex items-center">
                          <Brain className="w-3 h-3 mr-1" />
                          <span>{category.questionsCount} Questions</span>
                        </div>
                        <div className="flex items-center ml-2">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>30s per Q</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <PixelButton 
                  onClick={handleStartQuiz} 
                  className="mx-2 font-pixelfy"
                >
                  <Zap className="mr-2 w-5 h-5" />
                  Start Quest!
                </PixelButton>
                <PixelButton
                  onClick={() => navigate('/leaderboard')}
                  variant="secondary"
                  className="mx-2"
                >
                  <Trophy className="mr-2 w-5 h-5" />
                  Leaderboard
                </PixelButton>
              </div>
            </PixelatedBox>
          </div>

          <div className="lg:col-span-4">
            <PixelatedBox className="mb-6">
              <PixelHeader level={2}>Top Adventurers</PixelHeader>
              
              {topScores.length > 0 ? (
                <div className="space-y-3">
                  {topScores.map((score, index) => (
                    <motion.div
                      key={score.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center p-3 border-2 border-pixel-black bg-white/50"
                    >
                      <div className="flex items-center justify-center w-8 h-8 mr-3">
                        {index === 0 ? (
                          <Award className="w-6 h-6 text-yellow-500" />
                        ) : index === 1 ? (
                          <Award className="w-6 h-6 text-gray-400" />
                        ) : (
                          <Award className="w-6 h-6 text-amber-700" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-pixelfy">{score.name}</p>
                        <div className="flex justify-between">
                          <span className="text-sm text-pixel-green font-bold">
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
                      onClick={() => navigate('/leaderboard')} 
                      variant="secondary"
                      className="text-sm w-full"
                    >
                      View All Scores
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </PixelButton>
                  </div>
                </div>
              ) : (
                <div className="text-center p-4">
                  <p className="font-pixelfy text-pixel-black/70">
                    No scores yet! Be the first adventurer on the leaderboard.
                  </p>
                </div>
              )}
            </PixelatedBox>
            
            <PixelatedBox>
              <PixelHeader level={2}>Quick Tips</PixelHeader>
              <ul className="space-y-3 font-pixelfy text-sm">
                <li className="flex items-start">
                  <Clock className="w-5 h-5 mr-2 text-minecraft-dirt flex-shrink-0 mt-1" />
                  <span>Answer faster to earn more points!</span>
                </li>
                <li className="flex items-start">
                  <Star className="w-5 h-5 mr-2 text-minecraft-grass flex-shrink-0 mt-1" />
                  <span>Earn achievements by completing quizzes</span>
                </li>
                <li className="flex items-start">
                  <Award className="w-5 h-5 mr-2 text-minecraft-wood flex-shrink-0 mt-1" />
                  <span>Check the leaderboard to see top players</span>
                </li>
              </ul>
              
              <div className="mt-4 text-center border-solid">
                <PixelButton 
                  onClick={() => navigate('/how-to-play')}
                  variant="secondary"
                  className="text-sm w-full border-solid"
                >
                  <HelpCircle className="mr-2 w-4 h-4" />
                  How to Play
                </PixelButton>
              </div>
            </PixelatedBox>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8 font-pixelfy text-sm text-pixel-black/70 "
        >
          <p>© 2025 Pixel Quiz Quest | The Ultimate Knowledge Adventure</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
