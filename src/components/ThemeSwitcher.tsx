
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Paintbrush } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

const THEMES = [
  { id: "default", name: "Default", bgColor: "", gridColor: "" },
  { id: "candy", name: "Candy", bgColor: "#FFE5E5", gridColor: "rgba(255, 182, 193, 0.6)" },
  { id: "forest", name: "Forest", bgColor: "#2A3E2A", gridColor: "rgba(150, 210, 150, 0.6)" },
];

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState("default");
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Load saved theme from localStorage if available
    const savedTheme = localStorage.getItem("pixelQuizTheme");
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);
  
  const applyTheme = (themeId: string) => {
    const selectedTheme = THEMES.find(t => t.id === themeId);
    if (!selectedTheme) return;
    
    document.body.style.backgroundColor = selectedTheme.bgColor;
    document.body.style.backgroundImage = `
      linear-gradient(
        ${selectedTheme.gridColor} 2px, 
        transparent 2px
      ),
      linear-gradient(
        90deg, 
        ${selectedTheme.gridColor} 2px, 
        transparent 2px
      )
    `;
    
    // Save theme preference
    localStorage.setItem("pixelQuizTheme", themeId);
  };
  
  const handleThemeChange = (themeId: string) => {
    setTheme(themeId);
    applyTheme(themeId);
    setIsOpen(false);
    
    const themeName = THEMES.find(t => t.id === themeId)?.name || 'Default';
    toast({
      title: "Theme Changed",
      description: `You've switched to ${themeName} theme`,
      duration: 1500,
    });
  };
  
  return (
    <div className="relative z-50">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="pixel-border inline-flex items-center justify-center w-10 h-10 bg-white hover:bg-accent/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Theme switcher"
            >
              {theme === "default" && <Sun className="h-5 w-5" />}
              {theme === "night" && <Moon className="h-5 w-5" />}
              {(theme === "candy" || theme === "forest") && <Paintbrush className="h-5 w-5" />}
            </motion.button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Change theme</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 mt-2 pixel-container w-48"
        >
          <h3 className="font-minecraft text-base text-pixel-black mb-2">Select Theme</h3>
          <div className="space-y-2">
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => handleThemeChange(t.id)}
                className={cn(
                  "w-full text-left px-3 py-2 font-minecraft text-sm flex items-center",
                  theme === t.id ? "bg-minecraft-grass/20 border-l-4 border-minecraft-grass" : "hover:bg-accent/20"
                )}
              >
                <div 
                  className="w-4 h-4 mr-2 border border-pixel-black/50 rounded-sm" 
                  style={{ backgroundColor: t.bgColor }}
                />
                {t.name}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
