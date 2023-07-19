import logo from "../assets/images/logo.jpg";
import NotificationSvg from "./svg/NotificationSvg";

export default function Header() {
  return (
    <header className="w-full h-12 bg-dust-0 flex justify-between items-center px-6 lg:hidden">
      <img src={logo} alt="logo" className="h-[90%]" />
      <NotificationSvg />
    </header>
  );
}
