import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React, { JSX } from "react";
import { useContext } from "react";
import { AnimationContext } from "@/context/StateContext";

interface PixelHeaderProps {
  children: React.ReactNode;
  className?: string;
  level?: 1 | 2 | 3;
}

const PixelHeader = ({ children, className, level = 1 }: PixelHeaderProps) => {
  const baseClasses = "font-pixelfy text-pixel-black tracking-wide";
  const sizeClasses = {
    1: "text-2xl md:text-4xl mb-6",
    2: "text-xl md:text-2xl mb-4",
    3: "text-lg md:text-xl mb-3",
  };

  const Component = `h${level}` as keyof JSX.IntrinsicElements;
  const { animationsEnabled } = useContext(AnimationContext);

  return (
    <motion.div
    initial={animationsEnabled ? { opacity: 0, y: -20 } : false}
    animate={animationsEnabled ? { opacity: 1, y: 0 } : false}
      transition={{ duration: 0.5 }}
      className={!animationsEnabled ? 'framer-motion-disabled' : ''}
    >
      {React.createElement(
        Component as React.ElementType,
        { className: cn(baseClasses, sizeClasses[level], className) },
        children
      )}
    </motion.div>
  );
};

export default PixelHeader;
