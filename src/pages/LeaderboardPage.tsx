import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useQuiz } from "@/context/QuizContext";
import PixelatedBox from "@/components/PixelatedBox";
import PixelButton from "@/components/PixelButton";
import { categories } from "@/data/quiz-data";
import { Trophy, Medal, Clock, Check, Crown, Award, User, Home, Filter } from "lucide-react";

const LeaderboardPage = () => {
  const navigate = useNavigate();
  const { getLeaderboard } = useQuiz();
  const [selectedCategory, setSelectedCategory] = useState<string | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [animateTopScore, setAnimateTopScore] = useState(false);
  
  const leaderboard = selectedCategory === 'all' 
    ? getLeaderboard()
    : getLeaderboard(selectedCategory);
  
  // Only show top 10
  const topScores = leaderboard.slice(0, 10);
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };


  // Animate when category changes
  useEffect(() => {
    setAnimateTopScore(false);
    setTimeout(() => {
      if (topScores.length > 0) {
        setAnimateTopScore(true);
      }
    }, 100);
  }, [selectedCategory]);
  
  return (
    <div className="min-h-screen flex flex-col items-center p-4 py-8 mt-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="relative">
          <Trophy className="w-16 h-16 mx-auto mb-2 text-yellow-500" />
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center font-pixel text-xs"
          >
            {topScores.length}
          </motion.div>
        </div>
        <h1 className="sm:text-4xl text-2xl font-pixel text-pixel-black drop-shadow-md">Leaderboard</h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg font-minecraft text-pixel-brown mt-2"
        >
          Top Pixel Quiz Masters
        </motion.p>
      </motion.div>
      
      <div className="w-full max-w-4xl">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-4 w-full">
          <PixelButton 
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-center"
          >
            <Filter className="w-4 h-4 mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </PixelButton>
        </div>
        
        {/* Category Filters */}
        <AnimatePresence>
          {(showFilters || window.innerWidth >= 768) && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 overflow-hidden"
            >
              <div className="flex flex-wrap justify-center gap-2 p-2 bg-white/70 rounded-lg shadow-inner">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 font-minecraft text-sm border-2 rounded transition-all ${
                    selectedCategory === 'all'
                      ? 'border-minecraft-grass bg-minecraft-grass/20 text-pixel-black shadow-md transform scale-105'
                      : 'border-pixel-black/50 text-pixel-black hover:border-minecraft-dirt hover:bg-minecraft-dirt/10'
                  }`}
                >
                  All Categories
                </button>
                
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 font-minecraft text-sm border-2 rounded transition-all ${
                      selectedCategory === category.id
                        ? 'border-minecraft-grass bg-minecraft-grass/20 text-pixel-black shadow-md transform scale-105'
                        : 'border-pixel-black/50 text-pixel-black hover:border-minecraft-dirt hover:bg-minecraft-dirt/10'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <PixelatedBox className="w-full bg-white/80 backdrop-blur-sm">
          {topScores.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-4 border-pixel-black bg-pixel-black/10">
                    <th className="px-4 py-3 text-left font-pixel text-sm">#</th>
                    <th className="px-4 py-3 text-left font-pixel text-sm">Player</th>
                    <th className="px-4 py-3 text-left font-pixel text-sm">Score</th>
                    <th className="px-4 py-3 text-left font-pixel text-sm hidden md:table-cell">Accuracy</th>
                    <th className="px-4 py-3 text-left font-pixel text-sm hidden md:table-cell">Time</th>
                    <th className="px-4 py-3 text-left font-pixel text-sm hidden md:table-cell">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {topScores.map((score, index) => {
                    const accuracy = Math.round((score.correctAnswers / score.totalQuestions) * 100);
                    const isTopScore = index === 0;
                    
                    // Define medal appearance
                    let MedalIcon = Medal;
                    let medalColor = '';
                    if (index === 0) {
                      MedalIcon = Crown;
                      medalColor = 'text-yellow-500';
                    } else if (index === 1) {
                      medalColor = 'text-gray-400';
                    } else if (index === 2) {
                      medalColor = 'text-amber-700';
                    } else {
                      MedalIcon = Award;
                      medalColor = 'text-purple-500';
                    }
                    
                    return (
                      <motion.tr
                        key={score.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ 
                          opacity: 1, 
                          x: 0,
                          scale: isTopScore && animateTopScore ? [1, 1.02, 1] : 1,
                          backgroundColor: isTopScore && animateTopScore ? 
                            ['rgba(255,255,255,0.5)', 'rgba(255,255,207,0.7)', 'rgba(255,255,255,0.5)'] : 
                            undefined
                        }}
                        transition={{ 
                          delay: index * 0.05,
                          scale: { repeat: isTopScore ? 2 : 0, duration: 1, repeatType: 'reverse' },
                          backgroundColor: { repeat: isTopScore ? 2 : 0, duration: 1, repeatType: 'reverse' }
                        }}
                        className={`border-b-2 border-pixel-black/20 ${
                          index === 0 
                            ? 'bg-yellow-50/80' 
                            : index % 2 === 0 
                              ? 'bg-white/50' 
                              : 'bg-white/30'
                        } hover:bg-minecraft-grass/10 transition-colors`}
                      >
                        <td className="px-4 py-3 font-minecraft">
                          <MedalIcon className={`h-5 w-5 ${medalColor}`} />
                        </td>
                        <td className="px-4 py-3 font-minecraft flex items-center">
                          <div className="bg-pixel-black/10 w-6 h-6 rounded-full flex items-center justify-center mr-2">
                            <User className="h-3 w-3" />
                          </div>
                          <span className={index === 0 ? 'font-bold' : ''}>{score.name}</span>
                        </td>
                        <td className="px-4 py-3 font-minecraft text-minecraft-grass font-bold">
                          {index === 0 ? (
                            <motion.span 
                              animate={animateTopScore ? { scale: [1, 1.2, 1] } : {}}
                              transition={{ repeat: 2, duration: 0.5 }}
                              className="inline-block"
                            >
                              {score.score}
                            </motion.span>
                          ) : (
                            score.score
                          )}
                        </td>
                        <td className="px-4 py-3 font-minecraft hidden md:table-cell">
                          <div className="flex items-center">
                            <Check className="h-4 w-4 mr-1 text-minecraft-grass" />
                            {accuracy}%
                          </div>
                        </td>
                        <td className="px-4 py-3 font-minecraft hidden md:table-cell">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-minecraft-dirt" />
                            {formatTime(score.timeSpent)}
                          </div>
                        </td>
                        <td className="px-4 py-3 font-minecraft text-sm hidden md:table-cell">
                          {formatDate(score.date)}
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center p-8"
            >
              <div className="py-6 px-4 border-2 border-dashed border-minecraft-dirt/50 rounded-lg bg-white/30">
                <Trophy className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="font-minecraft text-lg mb-4">No scores yet for this category!</p>
                <p className="text-sm text-pixel-brown mb-6">Be the first to set a high score!</p>
                <PixelButton onClick={() => navigate('/quiz')}>
                  Play Now
                </PixelButton>
              </div>
            </motion.div>
          )}
          
          <div className="mt-8 text-center">
            <PixelButton 
              onClick={() => navigate('/')}
              className="flex items-center justify-center"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </PixelButton>
          </div>
        </PixelatedBox>
        
        {/* Category Stats Section */}
        {topScores.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-6"
          >
            <PixelatedBox className="bg-white/80 p-4">
              <h2 className="font-pixel text-lg mb-4 text-center">
                {selectedCategory === 'all' ? 'Overall Stats' : `${categories.find(c => c.id === selectedCategory)?.name} Stats`}
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-3 rounded border border-blue-200 text-center">
                  <p className="text-sm font-minecraft text-gray-600">Players</p>
                  <p className="text-2xl font-pixel text-blue-600">{topScores.length}</p>
                </div>
                
                <div className="bg-green-50 p-3 rounded border border-green-200 text-center">
                  <p className="text-sm font-minecraft text-gray-600">Top Score</p>
                  <p className="text-2xl font-pixel text-green-600">
                    {topScores.length > 0 ? topScores[0].score : 0}
                  </p>
                </div>
                
                <div className="bg-yellow-50 p-3 rounded border border-yellow-200 text-center">
                  <p className="text-sm font-minecraft text-gray-600">Avg Score</p>
                  <p className="text-2xl font-pixel text-yellow-600">
                    {topScores.length > 0 
                      ? Math.round(topScores.reduce((sum, score) => sum + score.score, 0) / topScores.length) 
                      : 0}
                  </p>
                </div>
                
                <div className="bg-purple-50 p-3 rounded border border-purple-200 text-center">
                  <p className="text-sm font-minecraft text-gray-600">Avg Time</p>
                  <p className="text-2xl font-pixel text-purple-600">
                    {topScores.length > 0 
                      ? formatTime(Math.round(topScores.reduce((sum, score) => sum + score.timeSpent, 0) / topScores.length))
                      : '0:00'}
                  </p>
                </div>
              </div>
            </PixelatedBox>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardPage;