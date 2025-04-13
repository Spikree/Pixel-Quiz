
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

const ProgressBar = ({ current, total, className }: ProgressBarProps) => {
  const percentage = Math.round((current / total) * 100);
  
  return (
    <div className={cn("w-full", className)}>
      <div className="font-minecraft text-sm mb-1 flex justify-between">
        <span>Question {current} of {total}</span>
        <span>{percentage}%</span>
      </div>
      <div className="w-full h-4 bg-white border-2 border-pixel-black">
        <motion.div
          className="h-full bg-minecraft-grass"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
