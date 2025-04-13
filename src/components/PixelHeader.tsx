import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React, { JSX } from "react";

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

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
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
