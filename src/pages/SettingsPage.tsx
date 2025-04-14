import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PixelatedBox from "@/components/PixelatedBox";
import PixelButton from "@/components/PixelButton";
import PixelHeader from "@/components/PixelHeader";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Save, Trash2, Volume2, User, Palette, Clock, Zap } from "lucide-react";
import { useQuiz } from "@/context/QuizContext";
import audioManager from "@/utils/audio";

const SettingsPage = () => {
  const [playerName, setPlayerName] = useState("");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [highContrastMode, setHighContrastMode] = useState(false);
  const [quizDuration, setQuizDuration] = useState<"normal" | "extended" | "quick">("normal");
  const { toast } = useToast();
  const { updateTimePerQuestion } = useQuiz();
  
  useEffect(() => {
    // Load settings from localStorage
    const savedName = localStorage.getItem("pixelQuizPlayerName") || "";
    const savedSound = localStorage.getItem("pixelQuizSound") !== "false";
    const savedAnimations = localStorage.getItem("pixelQuizAnimations") !== "false";
    const savedContrast = localStorage.getItem("pixelQuizHighContrast") === "true";
    const savedDuration = localStorage.getItem("pixelQuizDuration") as "normal" | "extended" | "quick" || "normal";
    
    setPlayerName(savedName);
    setSoundEnabled(savedSound);
    setAnimationsEnabled(savedAnimations);
    setHighContrastMode(savedContrast);
    setQuizDuration(savedDuration);
  }, []);
  
  const saveSettings = () => {
    // Save to localStorage
    localStorage.setItem("pixelQuizPlayerName", playerName);
    localStorage.setItem("pixelQuizSound", soundEnabled.toString());
    localStorage.setItem("pixelQuizAnimations", animationsEnabled.toString());
    localStorage.setItem("pixelQuizHighContrast", highContrastMode.toString());
    localStorage.setItem("pixelQuizDuration", quizDuration);

    // Apply the settings
    audioManager.setSoundEnabled(soundEnabled);

    // Update quiz duration in the context
    if (quizDuration === "quick") {
      updateTimePerQuestion(20);
    } else if (quizDuration === "normal") {
      updateTimePerQuestion(30);
    } else if (quizDuration === "extended") {
      updateTimePerQuestion(45);
    }
    
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated."
    });
  };
  
  const resetSettings = () => {
    setPlayerName("");
    setSoundEnabled(true);
    setAnimationsEnabled(true);
    setHighContrastMode(false);
    setQuizDuration("normal");
    
    // Clear localStorage
    localStorage.removeItem("pixelQuizPlayerName");
    localStorage.removeItem("pixelQuizSound");
    localStorage.removeItem("pixelQuizAnimations");
    localStorage.removeItem("pixelQuizHighContrast");
    localStorage.removeItem("pixelQuizDuration");
    
    // Apply default settings
    audioManager.setSoundEnabled(true);
    updateTimePerQuestion(30);
    
    toast({
      title: "Settings reset",
      description: "All settings have been reset to default."
    });
  };

  const handleButtonClickSound = () => {
    audioManager.playButtonClick();
  };

  return (
    <div className="min-h-screen pt-20 pb-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-pixel text-pixel-black">Settings</h1>
          <p className="text-lg font-minecraft text-pixel-brown mt-2">
            Customize your quiz experience
          </p>
        </motion.div>

        <PixelatedBox>
          <PixelHeader level={2}>User Preferences</PixelHeader>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="mb-6">
                <label className="mb-2 font-minecraft text-lg text-pixel-black flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Default Player Name:
                </label>
                <Input
                  type="text"
                  value={playerName}
                  onChange={(e) => {setPlayerName(e.target.value);handleButtonClickSound()}}
                  placeholder="Your gaming nickname"
                  className="pixel-input w-full"
                  maxLength={15}
                />
                <p className="text-xs font-minecraft mt-2 text-pixel-black/70">
                  This name will be pre-filled when you start a new quiz
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <label className="font-minecraft text-lg text-pixel-black flex items-center">
                    <Volume2 className="w-5 h-5 mr-2" />
                    Sound Effects:
                  </label>
                  <Switch 
                    checked={soundEnabled}
                    onCheckedChange={(value) => {setSoundEnabled(value);handleButtonClickSound()}}
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <label className="font-minecraft text-lg text-pixel-black flex items-center">
                    <Zap className="w-5 h-5 mr-2" />
                    Animations:
                  </label>
                  <Switch 
                    checked={animationsEnabled}
                    onCheckedChange={(value) => {setAnimationsEnabled(value);handleButtonClickSound()}}
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <label className="font-minecraft text-lg text-pixel-black flex items-center">
                    <Palette className="w-5 h-5 mr-2" />
                    High Contrast Mode:
                  </label>
                  <Switch 
                    checked={highContrastMode}
                    onCheckedChange={(value) => {setHighContrastMode(value);handleButtonClickSound()}}
                  />
                </div>
              </div>
            </div>
            
            <div>
              <div className="mb-6">
                <label className="mb-2 font-minecraft text-lg text-pixel-black flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Quiz Duration:
                </label>
                
                <div className="grid grid-cols-3 gap-2">
                  <button
                    className={`p-3 font-minecraft text-sm border-2 ${
                      quizDuration === "quick"
                        ? "border-minecraft-grass bg-minecraft-grass/20"
                        : "border-pixel-black hover:bg-accent/10"
                    }`}
                    onClick={() => {setQuizDuration("quick");handleButtonClickSound()}}
                  >
                    Quick
                  </button>
                  <button
                    className={`p-3 font-minecraft text-sm border-2 ${
                      quizDuration === "normal"
                        ? "border-minecraft-grass bg-minecraft-grass/20"
                        : "border-pixel-black hover:bg-accent/10"
                    }`}
                    onClick={() => {setQuizDuration("normal");handleButtonClickSound()}}
                  >
                    Normal
                  </button>
                  <button
                    className={`p-3 font-minecraft text-sm border-2 ${
                      quizDuration === "extended"
                        ? "border-minecraft-grass bg-minecraft-grass/20"
                        : "border-pixel-black hover:bg-accent/10"
                    }`}
                    onClick={() => {setQuizDuration("extended");;handleButtonClickSound()}}
                  >
                    Extended
                  </button>
                </div>
                
                <p className="text-xs font-minecraft mt-2 text-pixel-black/70">
                  {quizDuration === "quick" && "Less time per question but bonus points for speed (20 seconds)"}
                  {quizDuration === "normal" && "Standard time per question (30 seconds)"}
                  {quizDuration === "extended" && "More time to think with slightly reduced points (45 seconds)"}
                </p>
              </div>
              
              <div className="p-4 border-2 border-pixel-black bg-white/80 font-minecraft text-sm mt-4">
                <h3 className="font-bold mb-2">About User Data</h3>
                <p className="mb-2">
                  Your settings and high scores are stored locally on your device.
                  No personal data is sent to any server.
                </p>
                <p>
                  Clearing your browser data or using the Reset button below will remove all saved settings and scores.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:justify-end gap-4 mt-8">
            <PixelButton
              onClick={() => {resetSettings(); handleButtonClickSound()}}
              variant="danger"
              className="w-full sm:w-auto"
            >
              <Trash2 className="mr-2 w-5 h-5" />
              Reset All
            </PixelButton>
            
            <PixelButton
              onClick={() => {saveSettings();handleButtonClickSound()}}
              className="w-full sm:w-auto"
            >
              <Save className="mr-2 w-5 h-5" />
              Save Settings
            </PixelButton>
          </div>
        </PixelatedBox>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 font-minecraft text-sm text-pixel-black/70"
        >
          <p>Settings are saved locally in your browser's storage</p>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;