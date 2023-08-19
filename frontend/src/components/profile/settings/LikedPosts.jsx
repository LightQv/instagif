import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useUserContext } from "../../../contexts/UserContext";
import DownSvg from "../../svg/navigation/DownSvg";
import APIService from "../../../services/APIService";
import { notifyError } from "../../toasts/CustomToasts";
import PostInsight from "../PostInsight";

export default function LikedPosts({ isShow, setIsShow }) {
  const { user } = useUserContext();
  const [likedPosts, setLikedPosts] = useState(null);
  const [loading, setLoading] = useState(false);

  const defaultSorting = "desc";
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState(
    searchParams.get("sort") || defaultSorting
  );

  useEffect(() => {
    setSearchParams((params) => {
      searchParams.set("sort", filter);
      if (filter === "desc") {
        return undefined;
      }
      return params;
    });

    APIService.get(`/posts-liked/${user.id}?sort=${filter}`, filter)
      .then((res) => {
        setLikedPosts(res.data);
      })
      .catch((err) => {
        if (err.request?.status === 500) {
          notifyError("Oops, something went wrong.");
        }
      });
  }, [isShow.likedPosts, filter]);

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
        <>
          <div className="flex h-fit w-full justify-between gap-2 px-6">
            <button
              type="button"
              onClick={() => setFilter("desc")}
              className={`flex h-fit w-2/4 items-center justify-center rounded-md p-2 text-sm font-semibold transition-all
                ${
                  filter === "desc"
                    ? "cursor-default bg-red-800 text-dust-0"
                    : "bg-gray-300 text-cobble-0 hover:scale-[1.03] dark:bg-granite-0 dark:text-sand-0"
                }
              `}
            >
              Recent to oldest
            </button>
            <button
              type="button"
              onClick={() => setFilter("asc")}
              className={`flex h-fit w-2/4 items-center justify-center rounded-md p-2 text-sm font-semibold transition-all
                ${
                  filter === "asc"
                    ? " cursor-default bg-red-800 text-dust-0"
                    : " bg-gray-300 p-2 text-sm text-cobble-0 hover:scale-[1.03] dark:bg-granite-0 dark:text-sand-0"
                }
              `}
            >
              Oldest to recent
            </button>
          </div>
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
        </>
      )}
    </>
  );
}

LikedPosts.propTypes = {
  isShow: PropTypes.shape().isRequired,
  setIsShow: PropTypes.func.isRequired,
};
