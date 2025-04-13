import { motion } from "framer-motion";
import { Github, Twitter, Mail, Coffee } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-auto border-t-4 border-pixel-black bg-minecraft-wood/20 py-6 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between">

        <div className="text-center md:text-left">
            <h3 className="font-pixel text-lg mb-3 text-pixel-black">Pixel Quiz Quest</h3>
            <p className="font-minecraft text-sm text-pixel-black/70 mb-2">
              The ultimate pixelated knowledge adventure!
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center text-sm font-minecraft"
            >
              <span>Made with pixels and passion</span>
            </motion.div>
          </div>

          <div className="text-center md:text-right">
            <h3 className="font-pixel text-lg mb-3 text-pixel-black">Connect</h3>
            <div className="flex justify-center md:justify-end space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.a 
                      href="#" 
                      className="pixel-border inline-flex items-center justify-center w-10 h-10 bg-white hover:bg-minecraft-grass/20"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="h-5 w-5" />
                    </motion.a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>GitHub</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.a 
                      href="#" 
                      className="pixel-border inline-flex items-center justify-center w-10 h-10 bg-white hover:bg-minecraft-grass/20"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Twitter className="h-5 w-5" />
                    </motion.a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Twitter</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.a 
                      href="#" 
                      className="pixel-border inline-flex items-center justify-center w-10 h-10 bg-white hover:bg-minecraft-grass/20"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Mail className="h-5 w-5" />
                    </motion.a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Contact Us</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.a 
                      href="#" 
                      className="pixel-border inline-flex items-center justify-center w-10 h-10 bg-white hover:bg-minecraft-grass/20"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Coffee className="h-5 w-5" />
                    </motion.a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Buy us a coffee</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div className="mt-4">
              <p className="font-minecraft text-xs text-pixel-black/70">
                &copy; {currentYear} Pixel Quiz Quest
              </p>
              <p className="font-minecraft text-xs text-pixel-black/70 mt-1">
                All rights reserved
              </p>
            </div>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 pt-4 border-t border-pixel-black/20 text-center"
        >
          <p className="font-minecraft text-xs text-pixel-black/60">
            Pixel Quiz Quest is not affiliated with Minecraft. All game elements are used for educational purposes only.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
