import { NavLink } from "react-router-dom";
import HomeSvg from "./svg/HomeSvg";
import ActiveHomeSvg from "./svg/ActiveHomeSvg";
import ProfileSvg from "./svg/ProfileSvg";
import ActiveProfileSvg from "./svg/ActiveProfileSvg";
import PostSvg from "./svg/PostSvg";
import ActivePostSvg from "./svg/ActivePostSvg";

export default function NavBar() {
  return (
    <nav className="bottom-0 fixed z-10 bg-gradient-to-b from-dust-0 via-dust-0 via-30% to-dust-0 flex justify-evenly items-center w-full h-12">
      <ul className="w-full h-full flex justify-evenly items-center">
        <li>
          <NavLink to="/">
            {({ isActive }) => (isActive ? <ActiveHomeSvg /> : <HomeSvg />)}
          </NavLink>
        </li>
        <li>
          <NavLink to="/post">
            {({ isActive }) => (isActive ? <ActivePostSvg /> : <PostSvg />)}
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile">
            {({ isActive }) =>
              isActive ? <ActiveProfileSvg /> : <ProfileSvg />
            }
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
