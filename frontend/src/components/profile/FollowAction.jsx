import PropTypes from "prop-types";
import { useUserContext } from "../../contexts/UserContext";
import APIService from "../../services/APIService";
import { notifyError } from "../toasts/CustomToasts";
import FollowSvg from "../svg/interactions/FollowSvg";
import UnfollowSvg from "../svg/interactions/UnfollowSvg";

export default function FollowAction({
  profile,
  followerList,
  setSendFollow,
  width,
  textSize,
}) {
  const { user } = useUserContext();

  // --- Follow logic --- //
  // Determine if Selected User is Followed by User's Logged In
  const userIsFollowed = followerList?.some((el) => el.followerId === user.id);

  // Handle Follow
  // User is followed : unfollow
  // User isn't followed : follow
  const handleFollow = () => {
    if (userIsFollowed) {
      APIService.delete(`/follows/${user.id}&${profile.id}`)
        .then(() => setSendFollow(true))
        .catch((err) => {
          if (err.request?.status === 404 || err.request?.status === 500) {
            notifyError("Oops, something went wrong.");
          }
        });
    } else {
      APIService.post(`/follows`, {
        followerId: user.id,
        followingId: profile.id,
      })
        .then(() => setSendFollow(true))
        .catch((err) => {
          if (err.request?.status === 404 || err.request?.status === 500) {
            notifyError("Oops, something went wrong.");
          }
        });
    }
  };

  return (
    <button
      type="button"
      aria-label="follow unfollow"
      className={`flex h-fit ${width} items-center justify-center space-x-1 rounded-md p-2 ${textSize} transition-all
      ${
        !userIsFollowed
          ? "bg-red-800 text-dust-0"
          : "bg-gray-300 text-cobble-0 hover:scale-[1.03] dark:bg-granite-0 dark:text-sand-0"
      }
    `}
      onClick={() => handleFollow()}
    >
      {userIsFollowed ? (
        <>
          <p>Unfollow</p>
          <UnfollowSvg />
        </>
      ) : (
        <>
          <p className="font-semibold">Follow</p>
          <FollowSvg />
        </>
      )}
    </button>
  );
}

FollowAction.propTypes = {
  profile: PropTypes.shape().isRequired,
  followerList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  setSendFollow: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
  textSize: PropTypes.string.isRequired,
};
