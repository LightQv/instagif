import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import BackSvg from "../components/svg/BackSvg";
import DownSvg from "../components/svg/DownSvg";
import APIService from "../services/APIService";
import { notifyError } from "../services/toasts";
import DeleteAccountModal from "../components/profile/DeleteAccountModal";
import PostInsight from "../components/profile/PostInsight";

export default function ProfileSettings() {
  const { user, logout } = useUserContext();
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState({
    likedPost: false,
    appTheme: false,
    deleteModal: false,
  });
  const [likedPost, setLikedPost] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    APIService.get(`/posts-liked/${user.id}`)
      .then((res) => {
        setLikedPost(res.data);
        setLoading(true);
      })
      .catch(() => notifyError("Error fetching Liked posts."));
  }, [isShow.likedPost]);

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
      <div className="flex w-full flex-col gap-4 py-4 lg:w-1/3 lg:self-center">
        <div>
          <div className="flex w-full items-center justify-between px-6 py-1 ">
            <button
              type="button"
              onClick={() => setIsShow({ likedModal: !isShow.likedModal })}
              className="h-fit w-full"
            >
              <h3 className="text-left text-sm font-semibold text-cobble-0">
                All Liked Posts
              </h3>
            </button>
            <button
              type="button"
              onClick={() => setIsShow({ likedModal: !isShow.likedModal })}
              className={
                isShow.likedModal
                  ? "h-6 w-6 rotate-180 transition-all"
                  : "h-6 w-6 transition-all"
              }
            >
              <DownSvg isShow={isShow} />
            </button>
          </div>
          {isShow.likedModal && (
            <ul
              className={`mt-2 grid w-full ${
                likedPost?.length > 0 ? "grid-cols-2" : "grid-cols-1"
              } gap-[0.1rem]`}
            >
              {likedPost && likedPost.length !== 0 ? (
                likedPost.map((post, index) => (
                  <PostInsight
                    data={post}
                    index={index}
                    key={post.id}
                    loading={loading}
                    setLoading={setLoading}
                  />
                ))
              ) : (
                <p className="m-auto text-sm">Haven't liked anything yet.</p>
              )}
            </ul>
          )}
        </div>
        <div>
          <button
            type="button"
            onClick={() => setIsShow({ appTheme: !isShow.appTheme })}
            className="flex h-fit w-full items-center justify-between px-6 py-1 text-sm font-semibold text-cobble-0"
          >
            <h3>Switch Theme App</h3>
            <DownSvg isShow={isShow} />
          </button>
        </div>
        <h3>Change mail</h3>
        <h3>Change password</h3>
        <div className="px-6">
          <button
            type="button"
            onClick={logout}
            className="h-fit w-full rounded-md bg-cobble-0 py-1 text-sm font-semibold text-dust-0 transition-all hover:scale-[1.03] hover:bg-granite-0"
          >
            Log out
          </button>
        </div>
        <div className="px-6">
          <button
            type="button"
            onClick={() => setIsShow({ deleteModal: true })}
            className="h-fit w-full rounded-md bg-red-800 py-1 text-sm font-semibold text-dust-0 transition-all hover:scale-[1.03] hover:bg-red-600"
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
