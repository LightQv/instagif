import PropTypes from "prop-types";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ReactTimeAgo from "react-time-ago";
import { Link } from "react-router-dom";
import LikeSvg from "./svg/interactions/LikeSvg";
import ActiveLikeSvg from "./svg/interactions/ActiveLikeSvg";
import CommentSvg from "./svg/interactions/CommentSvg";
import { useUserContext } from "../contexts/UserContext";
import { useLikeContext } from "../contexts/LikeContext";
import APIService from "../services/APIService";
import { notifyError } from "../services/toasts";

export default function PostBox({ data }) {
  const { user } = useUserContext();
  const { likes, setSendLike } = useLikeContext();
  TimeAgo.addLocale(en);

  // If Post's User = User's Loged : Link to My Profile
  function getProfilLink() {
    if (user.id === data.user_id) {
      return "/my-profile";
    }
    return `/profile/${data.username.toLowerCase()}`;
  }

  // --- Like logic --- //
  // Determine if Actual Post is Liked based on LikeContext, Post's ID & User's ID
  const postIsLiked = likes?.some(
    (el) => el.post_id === data.post_id && el.user_id === user.id
  );

  // Get Like Object for Delete Request
  const likeObject = likes?.find(
    (el) => el.post_id === data.post_id && el.user_id === user.id
  );

  // Handle Like : If post is liked,
  const handleLike = () => {
    if (postIsLiked) {
      APIService.delete(`/likes/${likeObject?.id}`)
        .then(() => setSendLike(true))
        .catch((err) => {
          if (err.request.status === 404 || err.request.status === 500) {
            notifyError("Error, please try later.");
          }
        });
    } else {
      APIService.post(`/likes`, {
        post_id: data.post_id,
        user_id: user.id,
      })
        .then(() => setSendLike(true))
        .catch((err) => {
          if (err.request.status === 404 || err.request.status === 500) {
            notifyError("Error, please try later.");
          }
        });
    }
  };

  return (
    <li className="w-full text-cobble-0">
      <Link to={`/post-details/${data.post_id}`}>
        <img src={data.gif_url} alt="mood_gif" className="w-full" />
      </Link>
      <div className="flex w-full items-center justify-start gap-2 p-4">
        <Link to={getProfilLink()}>
          <div className="flex h-8 w-8 items-center justify-center self-start rounded-full bg-cobble-0 text-dust-0 transition-all hover:scale-105 hover:bg-granite-0 dark:bg-sand-0 dark:text-cobble-0 dark:hover:bg-granite-0">
            {data.username.slice(0, 1)}
          </div>
        </Link>
        <div className="mt-1 w-[calc(100%-2.5rem)]">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold transition-all hover:text-granite-0 dark:text-dust-0 dark:hover:text-granite-0 lg:font-bold">
              <Link to={getProfilLink()}>{data.username}'s </Link>
              <span className="text-xs font-normal italic">
                mood{" "}
                <ReactTimeAgo
                  date={new Date(data.created_at).toLocaleDateString("en-US")}
                  locale="en-US"
                />
                .
              </span>
            </h3>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="hover:text-granite-0"
                onClick={() => handleLike()}
              >
                {postIsLiked ? <ActiveLikeSvg /> : <LikeSvg />}
              </button>
              <button type="button">
                <CommentSvg />
              </button>
            </div>
          </div>
          <p className="-mt-1 text-lg font-bold dark:text-dust-0">
            "{data.title}"
          </p>
        </div>
      </div>
    </li>
  );
}

PostBox.propTypes = {
  data: PropTypes.shape().isRequired,
};
