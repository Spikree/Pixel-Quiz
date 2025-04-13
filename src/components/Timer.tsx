
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Clock } from 'lucide-react';

interface TimerProps {
  duration: number; // in seconds
  onTimeUp: () => void;
  className?: string;
  isRunning?: boolean;
}

const Timer = ({ duration, onTimeUp, className, isRunning = true }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  
  useEffect(() => {
    if (!isRunning) return;
    
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }
    
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft, onTimeUp, isRunning]);
  
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  const getColorClass = () => {
    const percentage = (timeLeft / duration) * 100;
    if (percentage > 60) return 'text-minecraft-grass';
    if (percentage > 30) return 'text-minecraft-dirt';
    return 'text-destructive';
  };
  
  return (
    <motion.div
      className={cn("flex items-center font-minecraft text-xl", className, getColorClass())}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Clock className="mr-2 h-5 w-5" />
      <span className="inline-block min-w-[60px]">
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </span>
    </motion.div>
  );
};

export default Timer;
