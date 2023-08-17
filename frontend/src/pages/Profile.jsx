import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import SettingsSvg from "../components/svg/navigation/SettingsSvg";
import PostInsight from "../components/profile/PostInsight";
import APIService from "../services/APIService";
import { notifyError } from "../services/toasts";
import FollowedCount from "../components/profile/FollowedCount";
import StatCount from "../components/profile/StatCount";
import FollowAction from "../components/profile/FollowAction";

export default function Profile() {
  const { user } = useUserContext();
  const [postList, setPostList] = useState(null);
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [followerList, setFollowerList] = useState(null);
  const [sendFollow, setSendFollow] = useState(false);

  // --- Profil logic --- //
  // If Username in Params : Fetch ID to Request Posts
  // If My-Profile : Request Posts with User's ID
  const fetchProfileData = async () => {
    try {
      const getProfile = await APIService.get(
        `/users/${username || user.username}`
      );
      if (getProfile) {
        setProfile(getProfile.data);
        setPostList(getProfile.data.posts);
      }
    } catch (err) {
      if (err.request?.status === 500) {
        notifyError("Oops, something went wrong.");
      }
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col justify-start bg-dust-0 pb-12 font-inter dark:bg-cobble-0 lg:mb-0 lg:flex-row-reverse lg:pb-0 lg:pl-64 lg:pt-4">
      <div className="flex w-full flex-col gap-4 p-4 lg:w-1/3">
        <div className="flex w-full items-center justify-start gap-2">
          <img
            src={profile?.avatar}
            alt={profile?.username.slice(0, 1).toUpperCase()}
            className={`flex h-12 w-12 items-center justify-center self-start rounded-full object-cover ${
              !profile?.avatar &&
              "bg-cobble-0 text-xl text-dust-0 dark:bg-sand-0 dark:text-cobble-0"
            }`}
          />
          <div className="flex w-[calc(100%-2.5rem)] items-center justify-between dark:text-dust-0">
            <div>
              <h3 className="text-lg font-semibold">{profile?.username}</h3>
              <h3 className="text-xs italic">
                Shared mood{" "}
                <span className="font-semibold">{postList?.length}</span> time
                {postList?.length > 1 && "s"}.
              </h3>
            </div>
            {username ? (
              <FollowAction
                profile={profile}
                followerList={followerList}
                setSendFollow={setSendFollow}
                width="w-2/5"
                textSize="text-sm"
              />
            ) : (
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
          <FollowedCount
            profile={profile}
            setFollowerList={setFollowerList}
            sendFollow={sendFollow}
            setSendFollow={setSendFollow}
          />
          <StatCount profile={profile?.id} data="follows" label="Follow" />
          <StatCount profile={profile?.id} data="likes" label="Like" />
          <StatCount profile={profile?.id} data="feelings" label="Feeling" />
        </div>
      </div>
      <ul
        className={`grid w-full ${
          postList?.length > 0 ? "grid-cols-2" : "grid-cols-1"
        } auto-rows-max gap-[0.1rem] lg:w-2/3`}
      >
        {postList && postList.length !== 0 ? (
          postList.map((post, index) => (
            <PostInsight
              username={profile?.username}
              post={post}
              index={index}
              key={post.id}
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
