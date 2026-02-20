import light from "../assets/icons/light.svg";
import dark from "../assets/icons/dark.svg";

import { useTheme } from "../hooks/useTheme";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 sm:px-8 py-5">
      {/* Left Section */}
      <div className="pl-10 sm:pl-0">
        <h1
          className="block sm:hidden text-lg font-semibold tracking-tight 
          bg-linear-to-r from-blue-500 to-cyan-500 
          bg-clip-text text-transparent"
        >
          LaptopAI
        </h1>

        <h1
          className="hidden sm:block text-2xl md:text-3xl font-bold tracking-tight 
          bg-linear-to-r from-blue-500 via-cyan-500 to-indigo-500 
          bg-clip-text text-transparent"
        >
          Laptop Price Prediction System
        </h1>

        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">
          AI-powered regression intelligence platform
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle Button */}
        {/* Theme Toggle Button */}
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="
            relative group
            flex items-center gap-2
            px-3 py-2
            rounded-xl
            border border-slate-300 dark:border-white/10
            bg-white/80 dark:bg-slate-900/70
            backdrop-blur-xl
            shadow-md dark:shadow-lg
            hover:shadow-blue-500/20
            transition-all duration-300
            hover:scale-105
          "
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-xl bg-linear-to-r from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"></div>

          {/* Icon */}
          <img
            src={theme === "dark" ? light : dark}
            alt="Theme Toggle"
            className="relative w-4 h-4 transition-transform duration-300 group-hover:rotate-12"
          />

          {/* Label */}
          <span className="relative text-xs font-medium text-slate-700 dark:text-slate-200">
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </span>
        </button>

        {/* Status Indicator */}
        <div className="flex items-center gap-2 text-xs text-green-500">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Model Active
        </div>
      </div>
    </div>
  );
};

export default Header;
