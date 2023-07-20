import { createContext, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";

const ThemeContext = createContext();

export default ThemeContext;

export function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "system"
  );
  const darkMedia = window.matchMedia("(prefers-color-scheme: dark)");
  const darkTheme =
    theme === "dark" || (!("theme" in localStorage) && darkMedia.matches);

  function onWindowMatch() {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && darkMedia.matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  useEffect(() => {
    switch (theme) {
      case "dark":
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
        break;
      case "light":
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
        break;
      default:
        localStorage.removeItem("theme");
        onWindowMatch();
        break;
    }
  }, [theme]);

  const whichTheme = useMemo(
    () => ({
      darkTheme,
      theme,
      setTheme,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={whichTheme}>{children}</ThemeContext.Provider>
  );
}

export const useThemeContext = () => useContext(ThemeContext);

ThemeContextProvider.propTypes = {
  children: PropTypes.shape().isRequired,
};
