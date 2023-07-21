import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import SettingsSvg from "../components/svg/navigation/SettingsSvg";
import PostInsight from "../components/profile/PostInsight";
import APIService from "../services/APIService";
import { notifyError } from "../services/toasts";
import LikeCount from "../components/profile/LikeCount";

export default function Profile() {
  const { user } = useUserContext();
  const [postList, setPostList] = useState(null);
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  function getUsername() {
    if (username) {
      return username;
    }
    return user.username;
  }

  // --- Profil logic --- //
  // If Username in Params : Fetch ID to Request Posts
  // If My-Profile : Request Posts with User's ID
  useEffect(() => {
    if (username) {
      APIService.get(`/users/${username}`)
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => notifyError(`${err} : Fetching user's data.`));
    } else {
      setProfile(user);
    }
  }, []);

  useEffect(() => {
    if (profile) {
      APIService.get(`/posts-user/${profile.id}`)
        .then((res) => {
          setPostList(res.data);
          setLoading(true);
        })
        .catch((err) => {
          if (err.request?.status === 500) {
            notifyError(`${err} : Fetching user's posts.`);
          }
        });
    }
  }, [profile]);

  return (
    <main className="flex min-h-screen flex-col justify-start bg-dust-0 pb-12 font-inter dark:bg-cobble-0 lg:mb-0 lg:flex-row-reverse lg:pb-0 lg:pt-16">
      <div className="flex w-full flex-col gap-4 p-4 lg:w-1/3">
        <div className="flex w-full items-center justify-start gap-2">
          <div className="flex h-12 w-12 items-center justify-center self-start rounded-full bg-cobble-0 text-xl text-dust-0 dark:bg-sand-0 dark:text-cobble-0">
            {getUsername().slice(0, 1).toUpperCase()}
          </div>
          <div className="flex w-[calc(100%-2.5rem)] items-center justify-between dark:text-dust-0">
            <div>
              <h3 className="text-lg font-semibold">
                {profile && profile.username}
              </h3>
              <h3 className="text-xs italic">
                Shared mood{" "}
                <span className="font-semibold">{postList?.length}</span> time
                {postList?.length > 1 && "s"}.
              </h3>
            </div>
            {!username && (
              <Link to="/my-profile/settings">
                <button
                  type="button"
                  className="ml-auto transition-all hover:scale-110 hover:text-granite-0"
                >
                  <SettingsSvg />
                </button>
              </Link>
            )}
          </div>
        </div>
        {!username && (
          <Link to="/my-profile/edit">
            <button
              type="button"
              className="h-10 w-full rounded-md bg-cobble-0 py-1 text-sm font-semibold text-dust-0 transition-all hover:scale-[1.03] hover:bg-granite-0 dark:bg-granite-0 dark:text-sand-0"
            >
              Edit profile
            </button>
          </Link>
        )}
        <div className="flex h-fit w-full justify-evenly">
          <LikeCount profile={profile} />
          {/* FeelingCount Here */}
          <div className="flex flex-col items-center justify-center dark:text-dust-0">
            <h3 className="text-xl font-semibold">0</h3>
            <p className="-mt-1 text-sm">Feelings</p>
          </div>
        </div>
      </div>
      <ul
        className={`grid w-full ${
          postList?.length > 0 ? "grid-cols-2" : "grid-cols-1"
        } gap-[0.1rem] lg:w-2/3`}
      >
        {postList && postList.length !== 0 ? (
          postList.map((post, index) => (
            <PostInsight
              data={post}
              index={index}
              key={post.post_id}
              loading={loading}
              setLoading={setLoading}
            />
          ))
        ) : (
          <p className="m-auto text-sm">Haven't posted anything yet.</p>
        )}
      </ul>
    </main>
  );
}
