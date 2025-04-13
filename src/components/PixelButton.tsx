
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PixelButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  delay?: number;
}

const PixelButton = ({ 
  onClick, 
  children, 
  className, 
  variant = 'primary', 
  disabled = false,
  delay = 0 
}: PixelButtonProps) => {
  const baseClass = variant === 'primary' 
    ? 'pixel-btn' 
    : variant === 'secondary' 
      ? 'pixel-btn-secondary' 
      : 'pixel-btn-danger';
  
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={cn(baseClass, className)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.2,
        delay: delay
      }}
      whileHover={{ 
        scale: 1.05, 
        transition: { duration: 0.2 } 
      }}
      whileTap={{ 
        scale: 0.95,
        transition: { duration: 0.1 } 
      }}
    >
      {children}
    </motion.button>
  );
};

export default PixelButton;
