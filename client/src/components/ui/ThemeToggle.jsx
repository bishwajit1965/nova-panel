import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg dar:hover:bg-gray-700 transition-colors"
    >
      {theme === "dark" ? (
        <Sun className="w-4.5 h-4.5 text-yellow-400" />
      ) : (
        <Moon className="w-4.5 h-4.5 text-gray-800" />
      )}
    </button>
  );
}
