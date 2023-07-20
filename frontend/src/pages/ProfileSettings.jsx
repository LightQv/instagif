import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import BackSvg from "../components/svg/BackSvg";
// import APIService from "../services/APIService";
// import { editProfileSchema } from "../services/validators";
// import { notifyError } from "../services/toasts";
import DeleteAccountModal from "../components/profile/DeleteAccountModal";

export default function ProfileSettings() {
  const { logout } = useUserContext();
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false);

  return (
    <main className="flex min-h-screen flex-col justify-start bg-dust-0 pb-12 font-inter lg:mb-0 lg:pb-0 lg:pt-16">
      <header className="flex h-12 w-full items-center justify-between bg-dust-0 px-6 lg:hidden">
        <div className="h-fit w-full">
          <button
            type="button"
            className="float-left transition-all hover:scale-110 hover:text-granite-0"
            onClick={() => navigate(-1)}
          >
            <BackSvg />
          </button>
          <h3 className="mr-6 text-center font-spartan text-xl font-semibold">
            Settings
          </h3>
        </div>
      </header>
      <div className="flex w-full flex-col gap-4 p-4 lg:w-1/3">
        <h3>See all liked posts</h3>
        <h3>Switch app theme</h3>
        <h3>Change mail</h3>
        <h3>Change password</h3>
        <button
          type="button"
          onClick={logout}
          className="h-fit w-full rounded-md bg-cobble-0 py-1 text-sm font-semibold text-dust-0 transition-all hover:scale-[1.03] hover:bg-granite-0"
        >
          Log out
        </button>
        <button
          type="button"
          onClick={() => setIsShow(true)}
          className="h-fit w-full rounded-md bg-red-800 py-1 text-sm font-semibold text-dust-0 transition-all hover:scale-[1.03] hover:bg-red-600"
        >
          Delete account
        </button>
      </div>
      <div
        className={
          isShow
            ? "fixed left-0 top-0 z-20 flex min-h-screen min-w-full items-center justify-center bg-black/90"
            : "hidden"
        }
      >
        {isShow && <DeleteAccountModal setIsShow={setIsShow} />}
      </div>
    </main>
  );
}
