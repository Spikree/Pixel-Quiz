
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { AnimationContext } from '@/context/StateContext';

interface PixelatedBoxProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const PixelatedBox = ({ children, className, delay = 0 }: PixelatedBoxProps) => {
  const { animationsEnabled } = useContext(AnimationContext);
  return (
    <motion.div
    initial={animationsEnabled ? { scale: 0 } : false}
    animate={animationsEnabled ? { scale: 1 } : false}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: delay 
      }}
      className={cn(
        'pixel-container', 
        className,
        !animationsEnabled && 'framer-motion-disabled'
      )}
    >
      {children}
    </motion.div>
  );
};

export default PixelatedBox;
