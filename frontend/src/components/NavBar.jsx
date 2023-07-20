import { NavLink, Link } from "react-router-dom";
import HomeSvg from "./svg/navbar/HomeSvg";
import ActiveHomeSvg from "./svg/navbar/ActiveHomeSvg";
import ProfileSvg from "./svg/navbar/ProfileSvg";
import ActiveProfileSvg from "./svg/navbar/ActiveProfileSvg";
import PostSvg from "./svg/navbar/PostSvg";
import ActivePostSvg from "./svg/navbar/ActivePostSvg";
import logo from "../assets/images/logo.jpg";
import logoDark from "../assets/images/logo-dark.jpg";
import NotificationSvg from "./svg/interactions/NotificationSvg";
import { useThemeContext } from "../contexts/ThemeContext";

export default function NavBar() {
  const { theme } = useThemeContext();
  return (
    <nav className="fixed bottom-0 z-10 flex h-12 w-full items-center justify-evenly bg-gradient-to-b from-dust-0 via-dust-0 via-30% to-dustparent-0 dark:from-cobble-0 dark:via-cobble-0 dark:to-cobbleparent-0 lg:top-0 lg:h-16 lg:justify-between lg:bg-dust-0 lg:px-12 lg:dark:bg-cobble-0 lg:dark:bg-none">
      <div className="hidden lg:flex lg:h-full lg:w-full lg:items-center lg:gap-6">
        <Link to="/" className="h-full">
          <img
            src={theme === "dark" ? logoDark : logo}
            alt="logo"
            className="lg:h-full"
          />
        </Link>
        <NotificationSvg />
      </div>
      <ul className="flex h-full w-full items-center justify-evenly lg:w-1/4 lg:justify-between">
        <li>
          <NavLink to="/">
            {({ isActive }) => (isActive ? <ActiveHomeSvg /> : <HomeSvg />)}
          </NavLink>
        </li>
        <li>
          <NavLink to="/create">
            {({ isActive }) => (isActive ? <ActivePostSvg /> : <PostSvg />)}
          </NavLink>
        </li>
        <li>
          <NavLink to="/my-profile">
            {({ isActive }) =>
              isActive ? <ActiveProfileSvg /> : <ProfileSvg />
            }
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
