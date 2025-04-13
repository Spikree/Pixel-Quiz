import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QuizProvider } from "./context/QuizContext";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <QuizProvider>
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <div className="min-h-screen bg-[radial-gradient(#4caf50_1px,transparent_1px)] bg-[size:10px_10px] font-pixelify ">
              {/* <div className="font-pixelify min-h-screen bg-[url('C:\Users\Avishkar\Desktop\pixel-quiz\src\assets\minecraft.png')] bg-cover bg-center "> */}
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </div>
          </div>
        </QuizProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
