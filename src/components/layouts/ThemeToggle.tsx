// src/components/layout/ThemeToggle.tsx
import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "../../store/themeStore";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-8 rounded-full bg-gray-300 dark:bg-gray-700 transition-all duration-500 overflow-hidden shadow-inner"
    >
      <div
        className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-md transition-all duration-500 flex items-center justify-center
          ${
            theme === "dark"
              ? "translate-x-6 bg-gray-900"
              : "translate-x-0 bg-yellow-400"
          }
        `}
      >
        {theme === "dark" ? (
          <Moon className="w-4 h-4 text-yellow-300" />
        ) : (
          <Sun className="w-4 h-4 text-yellow-600" />
        )}
      </div>
    </button>
  );
}
