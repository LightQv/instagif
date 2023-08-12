import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import DownSvg from "../svg/navigation/DownSvg";
import APIService from "../../services/APIService";
import { notifyError } from "../../services/toasts";
import PostInsight from "./PostInsight";

export default function LikedPosts({ isShow, setIsShow }) {
  const { user } = useUserContext();
  const [likedPosts, setLikedPosts] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    APIService.get(`/posts-liked/${user.id}`)
      .then((res) => {
        setLikedPosts(res.data);
      })
      .catch(() => notifyError("Error fetching Liked posts."));
  }, [isShow.likedPosts]);

  return (
    <>
      <div className="flex w-full items-center justify-between px-6 py-1 ">
        <button
          type="button"
          onClick={() => setIsShow({ likedPosts: !isShow.likedPosts })}
          className="h-fit w-full"
        >
          <h3 className="text-left text-sm font-semibold text-cobble-0 dark:text-dust-0">
            All Liked Posts
          </h3>
        </button>
        <button
          type="button"
          onClick={() => setIsShow({ likedPosts: !isShow.likedPosts })}
          className={
            isShow.likedPosts
              ? "h-6 w-6 rotate-180 transition-all dark:text-dust-0"
              : "h-6 w-6 transition-all dark:text-dust-0"
          }
        >
          <DownSvg isShow={isShow} />
        </button>
      </div>
      {isShow.likedPosts && (
        <ul
          className={`mt-2 grid w-full ${
            likedPosts?.length > 0
              ? "grid-cols-2 lg:grid-cols-4"
              : "grid-cols-1"
          } gap-[0.1rem]`}
        >
          {likedPosts && likedPosts.length !== 0 ? (
            likedPosts.map((post, index) => (
              <PostInsight
                post={post}
                index={index}
                key={post.id}
                loading={loading}
                setLoading={setLoading}
                likePage
              />
            ))
          ) : (
            <p className="m-auto text-sm">Haven't liked anything yet.</p>
          )}
        </ul>
      )}
    </>
  );
}

LikedPosts.propTypes = {
  isShow: PropTypes.shape().isRequired,
  setIsShow: PropTypes.func.isRequired,
};
