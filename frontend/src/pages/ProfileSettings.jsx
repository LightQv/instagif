import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import BackSvg from "../components/svg/navigation/BackSvg";
import LikedPosts from "../components/profile/settings/LikedPosts";
import ThemeSwitcher from "../components/profile/settings/ThemeSwitcher";
import ChangeMail from "../components/profile/settings/ChangeMail";
import ChangePw from "../components/profile/settings/ChangePw";
import DeleteAccountModal from "../components/profile/settings/DeleteAccountModal";

export default function ProfileSettings() {
  const { logout } = useUserContext();
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState({
    likedPosts: false,
    appTheme: false,
    changeMail: false,
    changePw: false,
    deleteModal: false,
  });

  return (
    <main className="flex min-h-screen flex-col justify-start bg-dust-0 pb-12 font-inter dark:bg-cobble-0 lg:mb-0 lg:pb-0 lg:pl-60">
      <header className="flex h-12 w-full items-center justify-between bg-dust-0 px-6 dark:bg-cobble-0 lg:hidden">
        <div className="h-fit w-full">
          <button
            type="button"
            className="float-left transition-all hover:scale-110 hover:text-granite-0"
            onClick={() => navigate("/my-profile")}
          >
            <BackSvg />
          </button>
          <h3 className="mr-6 text-center font-spartan text-xl font-semibold dark:text-dust-0">
            Settings
          </h3>
        </div>
      </header>
      <div className="flex w-full flex-col gap-4 py-4 lg:w-3/5 lg:self-center">
        <LikedPosts isShow={isShow} setIsShow={setIsShow} />
        <ThemeSwitcher isShow={isShow} setIsShow={setIsShow} />
        <ChangeMail isShow={isShow} setIsShow={setIsShow} />
        <ChangePw isShow={isShow} setIsShow={setIsShow} />
        <div className="px-6">
          <button
            type="button"
            onClick={logout}
            className="h-10 w-full rounded-md bg-cobble-0 py-1 text-sm font-semibold text-dust-0 transition-all hover:scale-[1.03] hover:bg-granite-0 dark:bg-granite-0 dark:text-sand-0"
          >
            Log out
          </button>
        </div>
        <div className="px-6">
          <button
            type="button"
            onClick={() => setIsShow({ deleteModal: true })}
            className="h-10 w-full rounded-md bg-red-800 py-1 text-sm font-semibold text-dust-0 transition-all hover:scale-[1.03] hover:bg-red-600"
          >
            Delete account
          </button>
        </div>
      </div>
      <div
        className={
          isShow.deleteModal
            ? "fixed left-0 top-0 z-20 flex min-h-screen min-w-full items-center justify-center bg-black/90"
            : "hidden"
        }
      >
        {isShow.deleteModal && <DeleteAccountModal setIsShow={setIsShow} />}
      </div>
    </main>
  );
}
