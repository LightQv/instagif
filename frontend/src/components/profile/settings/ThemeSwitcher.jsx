import PropTypes from "prop-types";
import { useThemeContext } from "../../../contexts/ThemeContext";
import DownSvg from "../../svg/navigation/DownSvg";
import ActiveSunSvg from "../../svg/theme/ActiveSunSvg";
import SunSvg from "../../svg/theme/SunSvg";
import ActiveMoonSvg from "../../svg/theme/ActiveMoonSvg";
import MoonSvg from "../../svg/theme/MoonSvg";
import ActiveSystemSvg from "../../svg/theme/ActiveSystemSvg";
import SystemSvg from "../../svg/theme/SystemSvg";

export default function ThemeSwitcher({ isShow, setIsShow }) {
  const { theme, setTheme } = useThemeContext();

  return (
    <>
      <div className="flex w-full items-center justify-between px-6 py-1">
        <button
          type="button"
          aria-label="theme switch"
          onClick={() => setIsShow({ appTheme: !isShow.appTheme })}
          className="h-fit w-full"
        >
          <h2 className="text-left text-sm font-semibold text-cobble-0 dark:text-dust-0">
            Instagif Theme Switcher
          </h2>
        </button>
        <button
          type="button"
          aria-label="show more"
          onClick={() => setIsShow({ appTheme: !isShow.appTheme })}
          className={
            isShow.appTheme
              ? "h-6 w-6 rotate-180 transition-all dark:text-dust-0"
              : "h-6 w-6 transition-all dark:text-dust-0"
          }
        >
          <DownSvg isShow={isShow} />
        </button>
      </div>
      {isShow.appTheme && (
        <div className="flex h-fit w-full justify-between gap-2 px-6">
          <button
            type="button"
            aria-label="light theme"
            onClick={() => setTheme("light")}
            className={`flex h-fit items-center justify-center rounded-md p-2 text-sm font-semibold transition-all
            ${
              theme === "light"
                ? "w-4/6 cursor-default bg-red-800 text-dust-0"
                : "w-1/6 bg-gray-300 text-cobble-0 hover:scale-[1.03] dark:bg-granite-0 dark:text-sand-0"
            }
          `}
          >
            {theme === "light" ? <ActiveSunSvg /> : <SunSvg />}
          </button>
          <button
            type="button"
            aria-label="dark theme"
            onClick={() => setTheme("dark")}
            className={`flex h-fit items-center justify-center rounded-md p-2 text-sm font-semibold transition-all
            ${
              theme === "dark"
                ? "w-4/6 cursor-default bg-red-800 text-dust-0"
                : "w-1/6 bg-gray-300 text-cobble-0 hover:scale-[1.03] dark:bg-granite-0 dark:text-sand-0"
            }
          `}
          >
            {theme === "dark" ? <ActiveMoonSvg /> : <MoonSvg />}
          </button>
          <button
            type="button"
            aria-label="system theme"
            onClick={() => setTheme("system")}
            className={`flex h-fit items-center justify-center rounded-md p-2 text-sm font-semibold transition-all
            ${
              theme === "system"
                ? "w-4/6 cursor-default bg-red-800 text-dust-0"
                : "w-1/6 bg-gray-300 text-cobble-0 hover:scale-[1.03] dark:bg-granite-0 dark:text-sand-0"
            }
          `}
          >
            {theme === "system" ? <ActiveSystemSvg /> : <SystemSvg />}
          </button>
        </div>
      )}
    </>
  );
}

ThemeSwitcher.propTypes = {
  isShow: PropTypes.shape().isRequired,
  setIsShow: PropTypes.func.isRequired,
};
