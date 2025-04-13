
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PixelatedBoxProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const PixelatedBox = ({ children, className, delay = 0 }: PixelatedBoxProps) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: delay 
      }}
      className={cn('pixel-container', className)}
    >
      {children}
    </motion.div>
  );
};

export default PixelatedBox;
