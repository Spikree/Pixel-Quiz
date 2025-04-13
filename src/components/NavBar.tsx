import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import pixelQuizzLogo from "@/assets/pixelQuizzLogo.png"
import {
  Menu,
  X,
  Home,
  Trophy,
  Info,
  Settings,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeSwitcher from "./ThemeSwitcher";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const navItems = [
    { path: "/", name: "Home", icon: <Home className="w-5 h-5" /> },
    {
      path: "/leaderboard",
      name: "Leaderboard",
      icon: <Trophy className="w-5 h-5" />,
    },
    {
      path: "/how-to-play",
      name: "How to Play",
      icon: <HelpCircle className="w-5 h-5" />,
    },
    { path: "/about", name: "About", icon: <Info className="w-5 h-5" /> },
    {
      path: "/settings",
      name: "Settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        scrolled ? "pixel-container bg-white/95 backdrop-blur-sm py-2" : "py-4"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, -5, 5, -2, 2, 0] }}
            transition={{ repeat: Infinity, repeatDelay: 5, duration: 0.5 }}
            className="mr-2 rounded-lg overflow-hidden w-10 h-10"
          >
            <img className="w-full h-full object-cover rounded-lg" src={pixelQuizzLogo} alt="" />
          </motion.div>
          <span className="font-pixelify text-lg md:text-xl text-pixel-black hidden md:inline">
            Pixel Quiz Quest
          </span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-2 font-pixelify">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center px-3 py-2 font-pixelfy transition-all",
                isActive(item.path)
                  ? "bg-minecraft-grass/20 text-pixel-black border-b-2 border-minecraft-grass"
                  : "text-pixel-black/70 hover:text-pixel-black hover:bg-accent/20"
              )}
            >
              {item.icon}
              <span className="ml-1">{item.name}</span>
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-2">
          <ThemeSwitcher />
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center space-x-2 md:hidden">
        <ThemeSwitcher />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-pixel-black"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full right-0 left-0 pixel-container md:hidden py-2 mt-2 mx-4"
          >
            <div className="flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center px-4 py-3 font-pixelfy",
                    isActive(item.path)
                      ? "bg-minecraft-grass/20 text-pixel-black border-l-4 border-minecraft-grass"
                      : "text-pixel-black/70 hover:text-pixel-black hover:bg-accent/20"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
