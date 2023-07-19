import logo from "../assets/images/logo.jpg";
import NotificationSvg from "./svg/NotificationSvg";

export default function Header() {
  return (
    <header className="flex h-12 w-full items-center justify-between bg-dust-0 px-6 lg:hidden">
      <img src={logo} alt="logo" className="h-[90%]" />
      <NotificationSvg />
    </header>
  );
}
