import { NavLink, Link } from "react-router-dom";
import HomeSvg from "./svg/navbar/HomeSvg";
import ActiveHomeSvg from "./svg/navbar/ActiveHomeSvg";
import SearchSvg from "./svg/navbar/SearchSvg";
import ActiveSearchSvg from "./svg/navbar/ActiveSearchSvg";
import ProfileSvg from "./svg/navbar/ProfileSvg";
import ActiveProfileSvg from "./svg/navbar/ActiveProfileSvg";
import PostSvg from "./svg/navbar/PostSvg";
import ActivePostSvg from "./svg/navbar/ActivePostSvg";
import SettingsSvg from "./svg/navigation/SettingsSvg";
import logo from "../assets/images/logo.png";
import logoDark from "../assets/images/logo-dark.png";
import NotificationSvg from "./svg/interactions/NotificationSvg";
import { useThemeContext } from "../contexts/ThemeContext";
import { useUserContext } from "../contexts/UserContext";

export default function NavBar() {
  const { user } = useUserContext();
  const { darkTheme } = useThemeContext();

  const navData = [
    {
      id: 1,
      label: "Home",
      link: "/",
      active: <ActiveHomeSvg />,
      inactive: <HomeSvg />,
    },
    {
      id: 2,
      label: "Search",
      link: "/search",
      active: <ActiveSearchSvg />,
      inactive: <SearchSvg />,
    },
    {
      id: 3,
      label: "Create",
      link: "/create",
      active: <ActivePostSvg />,
      inactive: <PostSvg />,
    },
    {
      id: 4,
      label: "Profile",
      link: "/my-profile",
      active: <ActiveProfileSvg />,
      inactive: <ProfileSvg />,
    },
  ];

  return (
    <nav className="fixed bottom-0 z-10 flex h-12 w-full items-center justify-evenly bg-gradient-to-b from-dust-0 via-dust-0 via-30% to-dustparent-0 dark:from-cobble-0 dark:via-cobble-0 dark:to-cobbleparent-0 lg:left-0 lg:h-full lg:w-60 lg:flex-col lg:justify-start lg:border-r-[1px] lg:border-sand-0 lg:bg-none lg:px-8 lg:py-12 lg:dark:border-granite-0 lg:dark:bg-cobble-0 lg:dark:bg-none">
      <div className="hidden lg:-ml-2 lg:mb-24 lg:block lg:h-fit lg:w-3/4 lg:self-start">
        <Link to="/" className="h-full">
          <img src={darkTheme ? logoDark : logo} alt="logo" />
        </Link>
        <div className="lg:hidden">
          <NotificationSvg />
        </div>
      </div>
      <ul className="flex h-full w-full items-center justify-evenly lg:h-1/4 lg:flex-col lg:items-start lg:justify-center lg:gap-10">
        {navData.map((nav) => (
          <li key={nav.id}>
            <NavLink to={nav.link} className="lg:flex lg:items-center lg:gap-2">
              {({ isActive }) =>
                isActive ? (
                  <>
                    {nav.active}
                    <p className="hidden lg:block lg:text-base lg:font-bold lg:text-red-800">
                      {nav.label}
                    </p>
                  </>
                ) : (
                  <div className="transition-all hover:text-granite-0 dark:hover:text-sand-0 lg:flex lg:items-center lg:gap-2">
                    {nav.inactive}
                    <p className="hidden lg:block lg:text-base lg:font-normal lg:dark:text-sand-0">
                      {nav.label}
                    </p>
                  </div>
                )
              }
            </NavLink>
          </li>
        ))}
      </ul>
      {user.id && (
        <div className="hidden lg:mt-auto lg:block lg:w-full lg:items-start">
          <NavLink
            to="/my-profile/settings"
            className="flex gap-2 transition-all hover:text-granite-0 dark:text-sand-0 dark:hover:text-sand-0"
          >
            <SettingsSvg />
            <p className="text-base font-normal">Settings</p>
          </NavLink>
        </div>
      )}
    </nav>
  );
}
