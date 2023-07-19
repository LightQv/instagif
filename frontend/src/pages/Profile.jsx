import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import SettingsSvg from "../components/svg/SettingsSvg";
import PostInsight from "../components/profile/PostInsight";
import APIService from "../services/APIService";
import { notifyError } from "../services/toasts";

export default function Profile() {
  const { user, logout } = useUserContext();
  const [postList, setPostList] = useState(null);

  useEffect(() => {
    APIService.get(`/posts-user/${user.id}`)
      .then((res) => setPostList(res.data))
      .catch((err) => notifyError(`${err} : Fetching your posts.`));
  }, []);

  return (
    <main className="flex min-h-screen flex-col justify-start bg-dust-0 pb-12 font-inter lg:mb-0 lg:flex-row-reverse lg:pb-0 lg:pt-16">
      <div className="my-4 flex w-full flex-col gap-4 p-4 lg:w-1/3">
        <div className="flex w-full items-center justify-start gap-2">
          <div className="flex h-12 w-12 items-center justify-center self-start rounded-full bg-cobble-0 text-xl text-dust-0">
            {user.username.slice(0, 1)}
          </div>
          <div className="flex w-[calc(100%-2.5rem)] items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{user.username}</h3>
              <h3 className="text-xs italic">
                You've shared your mood{" "}
                <span className="font-semibold">{postList?.length}</span> time
                {postList?.length > 1 ? "s" : null}
              </h3>
            </div>
            <button type="button" className="ml-auto " onClick={logout}>
              <SettingsSvg />
            </button>
          </div>
        </div>
        <button
          type="button"
          className="h-fit w-full rounded-md bg-cobble-0 py-1 text-sm font-semibold text-dust-0"
        >
          Edit profile
        </button>
      </div>
      <ul className="grid w-full grid-cols-2 lg:w-2/3">
        {postList && postList.length !== 0 ? (
          postList.map((post, index) => (
            <PostInsight data={post} index={index} key={post.post_id} />
          ))
        ) : (
          <p>You haven't posted anything yet.</p>
        )}
      </ul>
    </main>
  );
}
