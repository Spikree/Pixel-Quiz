
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuiz } from "@/context/QuizContext";
import PixelatedBox from "@/components/PixelatedBox";
import PixelButton from "@/components/PixelButton";
import PixelHeader from "@/components/PixelHeader";
import { getCategoryById } from "@/data/quiz-data";
import { Trophy, Clock, CheckSquare, Gamepad2, Star, Award, Sparkles, Medal } from "lucide-react";
import confetti from "@/utils/confetti";
import audioManager from "@/utils/audio";

const ResultsPage = () => {
  const navigate = useNavigate();
  const { quizState, playerName, categoryId, leaderboard } = useQuiz();
  // const [showConfetti, setShowConfetti] = useState(false);
  
  const category = categoryId ? getCategoryById(categoryId) : undefined;
  const playerScores = leaderboard.filter(score => score.name === playerName);
  const latestScore = playerScores.length > 0 
    ? playerScores.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )[0] 
    : null;
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  useEffect(() => {
    if (latestScore && latestScore.score > 300) {
      // setShowConfetti(true);
      confetti.start();
      audioManager.playQuizFinish();
      
      return () => {
        confetti.stop();
      };
    }
  }, [latestScore]);
  
  useEffect(() => {
    if (!quizState || !latestScore) {
      navigate('/');
    }
  }, [quizState, latestScore, navigate]);
  
  if (!quizState || !latestScore || !category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <PixelatedBox>
          <PixelHeader>Loading Results...</PixelHeader>
          <PixelButton onClick={() => navigate('/')} variant="secondary">
            Back to Home
          </PixelButton>
        </PixelatedBox>
      </div>
    );
  }
  
  // Calculate rank
  const allScores = leaderboard
    .filter(score => score.categoryId === categoryId)
    .sort((a, b) => b.score - a.score);
  
  const playerRank = allScores.findIndex(score => 
    score.id === latestScore.id
  ) + 1;
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4  mt-20 mb-16">
      <PixelatedBox className="w-full max-w-3xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-6 -left-6 w-12 h-12 transform rotate-12">
          <Star className="w-full h-full text-yellow-400 animate-pulse" />
        </div>
        <div className="absolute -bottom-6 -right-6 w-12 h-12 transform -rotate-12">
          <Star className="w-full h-full text-yellow-400 animate-pulse" />
        </div>
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="relative inline-block">
            <Trophy className="w-20 h-20 mx-auto mb-2 text-yellow-500" />
            {playerRank <= 3 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute -top-2 -right-2"
              >
                <Medal className="w-8 h-8 text-yellow-600" />
              </motion.div>
            )}
          </div>
          
          <PixelHeader className="bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500 text-transparent bg-clip-text">
            Quest Complete!
          </PixelHeader>
        </motion.div>
        
        <div className="mb-8 text-center">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-minecraft mb-2 text-minecraft-blue">
              {playerName}
              <Sparkles className="w-5 h-5 inline-block ml-2 text-yellow-400" />
            </h3>
            <p className="font-minecraft text-md rounded-full bg-minecraft-grass/30 inline-block px-4 py-1 text-pixel-black">
              {category.name} Quiz
            </p>
          </motion.div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ScoreCard 
            icon={<Trophy className="w-8 h-8 mr-4 text-yellow-500" />}
            title="Final Score"
            value={latestScore.score.toString()}
            bgColor="bg-gradient-to-r from-yellow-100 to-yellow-200"
            delay={0.1}
          />
          
          <ScoreCard 
            icon={<Clock className="w-8 h-8 mr-4 text-orange-500" />}
            title="Time Spent"
            value={formatTime(latestScore.timeSpent)}
            bgColor="bg-gradient-to-r from-orange-100 to-orange-200"
            delay={0.2}
          />
          
          <ScoreCard 
            icon={<CheckSquare className="w-8 h-8 mr-4 text-green-500" />}
            title="Correct Answers"
            value={`${latestScore.correctAnswers} / ${latestScore.totalQuestions}`}
            bgColor="bg-gradient-to-r from-green-100 to-green-200"
            delay={0.3}
          />
          
          <ScoreCard 
            icon={<Gamepad2 className="w-8 h-8 mr-4 text-blue-500" />}
            title="Leaderboard Rank"
            value={`#${playerRank}`}
            bgColor="bg-gradient-to-r from-blue-100 to-blue-200"
            delay={0.4}
          />
        </motion.div>
        
        <AnimatedMessage score={latestScore.score} />
        
        <div className="flex flex-col md:flex-row justify-center mt-8 space-y-4 md:space-y-0 md:space-x-4">
          <PixelButton 
            onClick={() => navigate('/')}
            className="w-full md:w-auto"
          >
            New Quest
          </PixelButton>
          
          <PixelButton 
            onClick={() => navigate('/leaderboard')}
            variant="secondary"
            className="w-full md:w-auto"
          >
            View Leaderboard
          </PixelButton>
        </div>
        
        {/* Achievement badge */}
        {latestScore.score >= 350 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
            className="absolute top-4 right-4"
          >
            <div className="bg-yellow-500 text-white rounded-full w-16 h-16 flex items-center justify-center transform rotate-12 border-2 border-pixel-black">
              <Award className="w-10 h-10" />
            </div>
          </motion.div>
        )}
      </PixelatedBox>
    </div>
  );
};
// Score card component
interface ScoreCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  bgColor: string;
  delay?: number;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ icon, title, value, bgColor, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className={`border-4 border-pixel-black p-4 flex items-center ${bgColor} hover:scale-105 transition-transform duration-200`}
    >
      {icon}
      <div>
        <p className="text-sm text-pixel-brown">{title}</p>
        <p className="font-minecraft text-2xl">{value}</p>
      </div>
    </motion.div>
  );
};

// Animated message based on score
const AnimatedMessage = ({ score }: { score: number }) => {
  let message = '';
  let emoji = '';
  let bgColor = '';
  
  if (score >= 450) {
    message = "Legendary performance!";
    emoji = "🏆";
    bgColor = "bg-gradient-to-r from-yellow-300 to-yellow-100";
  } else if (score >= 350) {
    message = "Awesome job!";
    emoji = "🌟";
    bgColor = "bg-gradient-to-r from-blue-300 to-purple-200";
  } else if (score >= 250) {
    message = "Well done!";
    emoji = "👍";
    bgColor = "bg-gradient-to-r from-green-300 to-green-100";
  } else {
    message = "Keep practicing!";
    emoji = "💪";
    bgColor = "bg-gradient-to-r from-orange-200 to-yellow-100";
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className={`text-center p-6 border-4 border-pixel-black ${bgColor}`}
    >
      <p className="font-pixel text-xl">
        {emoji} {message} {emoji}
      </p>
      <p className="font-minecraft mt-2 text-pixel-black/80">
        {score >= 350 ? "You're a true pixel quiz master!" : "Come back soon for another quest!"}
      </p>
    </motion.div>
  );
};

export default ResultsPage;
