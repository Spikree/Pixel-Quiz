import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QuizProvider } from "./context/QuizContext";
import NavBar from "./components/NavBar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import QuizPage from "./pages/QuizPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import HowToPlayPage from "./pages/HowToPlayPage";
import AboutPage from "./pages/AboutPage";
import SettingsPage from "./pages/SettingsPage";
import ResultsPage from "./pages/ResultsPage";
import QuickActions from "./components/QuickActions";
import Footer from "./components/Footer";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import audioManager from "./utils/audio";
import {  useEffect, useState } from "react";
import { AnimationContext } from "./context/StateContext";


const queryClient = new QueryClient();

const RouteChangeHandler = () => {
  const location = useLocation();
  
  useEffect(() => {
    audioManager.playPageTransition();
  }, [location.pathname]);
  
  return null;
};

const App = () => {

  const [animationsEnabled, setAnimationsEnabled] = useState(() => {
    // Load animation setting from localStorage
    return localStorage.getItem("pixelQuizAnimations") !== "false";
  });

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "pixelQuizAnimations") {
        setAnimationsEnabled(e.newValue !== "false");
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also check for local changes
    const checkAnimationSetting = () => {
      const setting = localStorage.getItem("pixelQuizAnimations");
      setAnimationsEnabled(setting !== "false");
    };
    
    // Check every second for changes (simple approach)
    const interval = setInterval(checkAnimationSetting, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);
  return (
    <AnimationContext.Provider value={{ animationsEnabled }}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <QuizProvider>
          <div className="flex flex-col min-h-screen">
            <RouteChangeHandler/>
            <NavBar />
            <div className="min-h-screen bg-[radial-gradient(#4caf50_1px,transparent_1px)] bg-[size:10px_10px] font-pixelify ">
              {/* <div className="font-pixelify min-h-screen bg-[url('C:\Users\Avishkar\Desktop\pixel-quiz\src\assets\minecraft.png')] bg-cover bg-center "> */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/quiz/:categoryId" element={<QuizPage />} />
                <Route path="/results" element={<ResultsPage />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />
                <Route path="/how-to-play" element={<HowToPlayPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage/>} />
              </Routes>
            </div>
            <div className="block md:hidden">
              <QuickActions />
            </div>
            <Footer/>
          </div>
        </QuizProvider>
      </TooltipProvider>
    </QueryClientProvider>
    </AnimationContext.Provider>
  );
};

export default App;
