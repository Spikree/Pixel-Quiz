import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Plus, Home, Trophy, HelpCircle, BookOpen, Settings, X } from "lucide-react";
import { cn } from "@/lib/utils";

const QuickActions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const actions = [
    { icon: <Home className="h-5 w-5" />, label: "Home", path: "/" },
    { icon: <Trophy className="h-5 w-5" />, label: "Leaderboard", path: "/leaderboard" },
    { icon: <HelpCircle className="h-5 w-5" />, label: "How to Play", path: "/how-to-play" },
    { icon: <BookOpen className="h-5 w-5" />, label: "About", path: "/about" },
    { icon: <Settings className="h-5 w-5" />, label: "Settings", path: "/settings" },
  ];

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute bottom-16 right-0 mb-4"
          >
            <div className="flex flex-col-reverse space-y-reverse space-y-2">
              {actions.map((action, index) => (
                <motion.button
                  key={action.path}
                  onClick={() => handleNavigate(action.path)}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ delay: index * 0.05 }}
                  className="group flex items-center"
                >
                  <span className="font-minecraft text-sm bg-white border-2 border-pixel-black px-2 py-1 mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {action.label}
                  </span>
                  <div className="pixel-border flex items-center justify-center w-10 h-10 bg-white hover:bg-minecraft-grass/20">
                    {action.icon}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleOpen}
        className={cn(
          "pixel-border inline-flex items-center justify-center w-12 h-12",
          isOpen ? "bg-red-400" : "bg-minecraft-grass"
        )}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
      >
        {isOpen ? <X className="h-6 w-6 text-white" /> : <Plus className="h-6 w-6 text-white" />}
      </motion.button>
    </div>
  );
};

export default QuickActions;
