import { NavLink, Link } from "react-router-dom";
import HomeSvg from "./svg/HomeSvg";
import ActiveHomeSvg from "./svg/ActiveHomeSvg";
import ProfileSvg from "./svg/ProfileSvg";
import ActiveProfileSvg from "./svg/ActiveProfileSvg";
import PostSvg from "./svg/PostSvg";
import ActivePostSvg from "./svg/ActivePostSvg";
import logo from "../assets/images/logo.jpg";
import NotificationSvg from "./svg/NotificationSvg";

export default function NavBar() {
  return (
    <nav className="fixed bottom-0 z-10 flex h-12 w-full items-center justify-evenly bg-gradient-to-b from-dust-0 via-dust-0 via-30% to-dustparent-0 lg:top-0 lg:h-16 lg:justify-between lg:bg-dust-0 lg:px-12">
      <div className="hidden lg:flex lg:h-full lg:w-full lg:items-center lg:gap-6">
        <Link to="/" className="h-full">
          <img src={logo} alt="logo" className="lg:h-full" />
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
