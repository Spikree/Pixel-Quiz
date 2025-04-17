import { motion } from "framer-motion";
import PixelatedBox from "@/components/PixelatedBox";
import PixelHeader from "@/components/PixelHeader";
import { Cpu, Code, Palette, Heart, Sparkles, Github } from "lucide-react";

const AboutPage = () => {
  const features = [
    {
      title: "Pixel Graphics",
      icon: <Palette className="w-8 h-8 text-pink-500" />,
      description: "Nostalgic pixel art aesthetics inspired by retro games",
      delay: 0.1
    },
    {
      title: "React Powered",
      icon: <Code className="w-8 h-8 text-blue-500" />,
      description: "Built with modern React, Tailwind CSS, and Framer Motion",
      delay: 0.2
    },
    {
      title: "Interactive",
      icon: <Cpu className="w-8 h-8 text-purple-500" />,
      description: "Engaging quiz experience with animations and feedback",
      delay: 0.3
    },
    {
      title: "Open Source",
      icon: <Github className="w-8 h-8 text-gray-700" />,
      description: "Free to use, modify and contribute",
      delay: 0.4
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
          <h1 className="text-4xl font-pixel text-pixel-black">About</h1>
          <p className="text-lg font-minecraft text-pixel-brown mt-2">
            The story behind Pixel Quiz Quest
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <PixelatedBox className="mb-6">
              <PixelHeader level={2}>The Project</PixelHeader>
              
              <div className="space-y-4 font-minecraft">
                <p>
                  Pixel Quiz Quest was created as an interactive web application that combines 
                  the nostalgia of pixel art with the fun of trivia quizzes.
                </p>
                
                <p>
                  The application was designed with a focus on user experience, providing an
                  engaging and visually appealing platform for users to test their knowledge 
                  across various categories.
                </p>
                
                <div className="p-4 border-l-4 border-minecraft-grass bg-minecraft-grass/10 italic">
                  "Knowledge is power, but pixels make it fun."
                </div>
                
                <p>
                  The project uses modern web technologies to create a responsive, fast, and
                  engaging quiz experience that works across all devices.
                </p>
              </div>
              
              <div className="mt-8">
                <PixelHeader level={3}>Key Features</PixelHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: feature.delay }}
                      className="border-2 border-pixel-black p-4 cursor-pointer bg-white/80"
                    >
                      <div className="flex items-center mb-2">
                        {feature.icon}
                        <h3 className="font-minecraft text-lg ml-3">
                          {feature.title}
                        </h3>
                      </div>
                      <p className="text-sm text-pixel-black/80">
                        {feature.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </PixelatedBox>
          </div>
          
          <div className="lg:col-span-4">
            <PixelatedBox className="mb-6">
              <PixelHeader level={2}>Technologies</PixelHeader>
              
              <ul className="space-y-3 font-minecraft">
                <li className="flex items-center p-2 border-b border-dotted border-pixel-black/30">
                  <div className="w-3 h-3 bg-blue-500 border border-pixel-black mr-3"></div>
                  React
                </li>
                <li className="flex items-center p-2 border-b border-dotted border-pixel-black/30">
                  <div className="w-3 h-3 bg-cyan-500 border border-pixel-black mr-3"></div>
                  TypeScript
                </li>
                <li className="flex items-center p-2 border-b border-dotted border-pixel-black/30">
                  <div className="w-3 h-3 bg-teal-500 border border-pixel-black mr-3"></div>
                  Tailwind CSS
                </li>
                <li className="flex items-center p-2 border-b border-dotted border-pixel-black/30">
                  <div className="w-3 h-3 bg-purple-500 border border-pixel-black mr-3"></div>
                  Framer Motion
                </li>
                <li className="flex items-center p-2 border-b border-dotted border-pixel-black/30">
                  <div className="w-3 h-3 bg-green-500 border border-pixel-black mr-3"></div>
                  Vite
                </li>
                <li className="flex items-center p-2">
                  <div className="w-3 h-3 bg-gray-500 border border-pixel-black mr-3"></div>
                  Lucide Icons
                </li>
              </ul>
            </PixelatedBox>
            
            <PixelatedBox>
              <PixelHeader level={2}>Made With Love</PixelHeader>
              
              <div className="text-center p-6">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    repeat: Infinity,
                    repeatDelay: 1,
                    duration: 1
                  }}
                  className="inline-block"
                >
                  <Heart className="w-16 h-16 mx-auto text-red-500" />
                </motion.div>
                
                <p className="font-minecraft mt-4">
                  Thanks for playing Pixel Quiz Quest! We hope you enjoy the experience.
                </p>
                
                <div className="mt-6 flex justify-center">
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center font-minecraft text-sm bg-gray-800 text-white px-4 py-2 border-2 border-pixel-black hover:bg-gray-700 transition-colors"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View on GitHub
                  </a>
                </div>
              </div>
            </PixelatedBox>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8 font-minecraft text-sm flex items-center justify-center"
        >
          <Sparkles className="w-4 h-4 mr-2 text-yellow-500" />
          <p>Version 1.0.0 | Created with React and Pixel Art</p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
