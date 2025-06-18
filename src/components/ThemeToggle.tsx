import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import useTheme from "../hooks/useTheme";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-1 rounded transition-colors bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <FaSun /> : <FaMoon />}
      <span className="text-xs">{theme === "dark" ? "Light" : "Dark"} Mode</span>
    </button>
  );
};

export default ThemeToggle;