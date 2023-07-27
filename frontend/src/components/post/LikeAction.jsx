import PropTypes from "prop-types";
import { useUserContext } from "../../contexts/UserContext";
import { useLikeContext } from "../../contexts/LikeContext";
import LikeSvg from "../svg/interactions/LikeSvg";
import ActiveLikeSvg from "../svg/interactions/ActiveLikeSvg";
import APIService from "../../services/APIService";
import { notifyError } from "../../services/toasts";

export default function LikeAction({ post }) {
  const { user } = useUserContext();
  const { likes, setSendLike } = useLikeContext();

  // --- Like logic --- //
  // Determine if Actual Post is Liked based on LikeContext, Post's ID & User's ID
  const postIsLiked = likes?.some(
    (el) => el.post_id === post.id && el.user_id === user.id
  );

  // Get Like Object for Delete Request
  const likeObject = likes?.find(
    (el) => el.post_id === post.id && el.user_id === user.id
  );

  // Handle Like
  // Post is already liked : delete like
  // Post isn't liked : add like
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
        post_id: post.id,
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
    <button
      type="button"
      className="hover:text-granite-0"
      onClick={() => handleLike()}
    >
      {postIsLiked ? <ActiveLikeSvg /> : <LikeSvg />}
    </button>
  );
}

LikeAction.propTypes = {
  post: PropTypes.shape().isRequired,
};
