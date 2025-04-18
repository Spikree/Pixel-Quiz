
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import PixelatedBox from "@/components/PixelatedBox";
import PixelButton from "@/components/PixelButton";
import PixelHeader from "@/components/PixelHeader";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <PixelatedBox className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        >
          <PixelHeader>404</PixelHeader>
          <div className="text-8xl font-minecraft mb-6">
            ¯\_(ツ)_/¯
          </div>
          <p className="text-xl font-minecraft text-pixel-brown mb-8">
            Oops! Looks Like You Are Lost
          </p>
          
          <PixelButton onClick={() => navigate("/")}>
            Return to Home
          </PixelButton>
        </motion.div>
      </PixelatedBox>
    </div>
  );
};

export default NotFound;
