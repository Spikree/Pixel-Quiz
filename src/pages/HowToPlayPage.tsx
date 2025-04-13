import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PixelatedBox from "@/components/PixelatedBox";
import PixelButton from "@/components/PixelButton";
import PixelHeader from "@/components/PixelHeader";
import { Clock, CheckCircle, XCircle, Brain, Star, Award, ArrowRight } from "lucide-react";

const HowToPlayPage = () => {
  const navigate = useNavigate();
  
  const instructions = [
    {
      title: "Choose a Category",
      icon: <Brain className="w-8 h-8 text-minecraft-stone" />,
      description: "Select from different quiz categories based on your interests and difficulty preferences.",
      delay: 0.1
    },
    {
      title: "Answer Questions",
      icon: <CheckCircle className="w-8 h-8 text-minecraft-grass" />,
      description: "Read each question carefully and select the answer you believe is correct.",
      delay: 0.2
    },
    {
      title: "Time Management",
      icon: <Clock className="w-8 h-8 text-minecraft-dirt" />,
      description: "Each question has a 30-second time limit. Answer faster to earn more points!",
      delay: 0.3
    },
    {
      title: "Avoid Mistakes",
      icon: <XCircle className="w-8 h-8 text-red-500" />,
      description: "Incorrect answers don't deduct points, but you'll miss out on the potential score.",
      delay: 0.4
    },
    {
      title: "Earn Points",
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      description: "Your score is based on correct answers and the speed of your responses.",
      delay: 0.5
    },
    {
      title: "Compete",
      icon: <Award className="w-8 h-8 text-minecraft-wood" />,
      description: "View the leaderboard to see how you rank against other players.",
      delay: 0.6
    }
  ];

  const scoringRules = [
    { 
      time: "Under 10 seconds", 
      points: "100 points",
      color: "text-green-500" 
    },
    { 
      time: "10-15 seconds", 
      points: "75 points",
      color: "text-cyan-500" 
    },
    { 
      time: "15-20 seconds", 
      points: "50 points",
      color: "text-blue-500" 
    },
    { 
      time: "20-25 seconds", 
      points: "25 points",
      color: "text-purple-500" 
    },
    { 
      time: "Over 25 seconds", 
      points: "10 points",
      color: "text-indigo-500" 
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-pixel text-pixel-black">How to Play</h1>
          <p className="text-lg font-minecraft text-pixel-brown mt-2">
            Master the art of pixel quizzing
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PixelatedBox className="mb-6">
              <PixelHeader level={2}>Game Instructions</PixelHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {instructions.map((instruction, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: instruction.delay }}
                    className="border-2 border-pixel-black p-4 bg-white/80"
                  >
                    <div className="flex items-center mb-2">
                      {instruction.icon}
                      <h3 className="font-minecraft text-lg ml-3">
                        {instruction.title}
                      </h3>
                    </div>
                    <p className="text-sm text-pixel-black/80">
                      {instruction.description}
                    </p>
                  </motion.div>
                ))}
              </div>
              
              <div className="flex justify-center mt-8">
                <PixelButton 
                  onClick={() => navigate('/')}
                  className="mx-2"
                >
                  Ready to Play!
                </PixelButton>
              </div>
            </PixelatedBox>
          </div>
          
          <div className="lg:col-span-1">
            <PixelatedBox className="mb-6">
              <PixelHeader level={2}>Scoring System</PixelHeader>
              
              <div className="space-y-4">
                <p className="font-minecraft">
                  Points are awarded based on how quickly you answer correctly:
                </p>
                
                <div className="border-2 border-pixel-black">
                  <div className="grid grid-cols-2 font-minecraft text-sm border-b-2 border-pixel-black">
                    <div className="p-2 border-r-2 border-pixel-black font-bold">Answer Time</div>
                    <div className="p-2 font-bold">Points Earned</div>
                  </div>
                  
                  {scoringRules.map((rule, index) => (
                    <div key={index} className="grid grid-cols-2 font-minecraft text-sm border-b-2 border-pixel-black last:border-b-0">
                      <div className="p-2 border-r-2 border-pixel-black">{rule.time}</div>
                      <div className={`p-2 ${rule.color} font-bold`}>{rule.points}</div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 border-2 border-pixel-black bg-minecraft-grass/10">
                  <p className="font-minecraft text-sm">
                    <strong>Tip:</strong> Incorrect answers receive 0 points. Be accurate but quick!
                  </p>
                </div>
              </div>
            </PixelatedBox>
            
            <PixelatedBox>
              <PixelHeader level={2}>Ready to Start?</PixelHeader>
              
              <div className="text-center p-4">
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, 1, -1, 0] 
                  }}
                  transition={{ 
                    repeat: Infinity,
                    repeatDelay: 1,
                    duration: 1
                  }}
                  className="w-24 h-24 mx-auto mb-4 bg-minecraft-grass border-4 border-pixel-black rounded-lg flex items-center justify-center"
                >
                  <Brain className="w-12 h-12 text-white" />
                </motion.div>
                
                <p className="font-minecraft mb-6">
                  Challenge yourself with fun quizzes and compete for the top spot on the leaderboard!
                </p>
                
                <PixelButton
                  onClick={() => navigate('/')}
                  className="mx-auto"
                >
                  Start a Quiz <ArrowRight className="ml-2" />
                </PixelButton>
              </div>
            </PixelatedBox>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToPlayPage;
