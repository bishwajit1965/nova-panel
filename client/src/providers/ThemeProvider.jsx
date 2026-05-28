import { useEffect, useState } from "react";

import ThemeContext from "../contexts/ThemeContext";

const ThemeProvider = ({ children }) => {
  // Initialize directly from localStorage
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  // Sync body class whenever theme changes
  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);

    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
