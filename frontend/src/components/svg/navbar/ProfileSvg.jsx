import { useThemeContext } from "../../../contexts/ThemeContext";

export default function ProfileSvg() {
  const { theme } = useThemeContext();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={theme === "dark" ? "#f1efe7" : "currentColor"}
      className="h-6 w-6 transition-all hover:scale-110 hover:text-granite-0 dark:hover:text-sand-0"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
      />
    </svg>
  );
}