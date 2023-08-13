import PropTypes from "prop-types";
import { useUserContext } from "../../contexts/UserContext";
import APIService from "../../services/APIService";
import { notifyError } from "../../services/toasts";
import FollowSvg from "../svg/interactions/FollowSvg";
import UnfollowSvg from "../svg/interactions/UnfollowSvg";

export default function FollowAction({ profile, setSendFollow }) {
  const { user } = useUserContext();

  // --- Follow logic --- //
  // Determine if Selected User is Followed by User's Logged In
  const userIsFollowed = profile?.followedBy.some(
    (el) => el.followerId === user.id
  );

  // Handle Follow
  // User is followed : unfollow
  // User isn't followed : follow
  const handleFollow = () => {
    if (userIsFollowed) {
      APIService.delete(`/follows/${user.id}&${profile.id}`)
        .then(() => setSendFollow(true))
        .catch((err) => {
          if (err.request.status === 404 || err.request.status === 500) {
            notifyError("Error, please try later.");
          }
        });
    } else {
      APIService.post(`/follows`, {
        followerId: user.id,
        followingId: profile.id,
      })
        .then(() => setSendFollow(true))
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
      className={`flex h-fit w-2/5 items-center justify-center space-x-1 rounded-md p-2 text-sm transition-all
      ${
        !userIsFollowed
          ? "cursor-default bg-red-800 text-dust-0"
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
  setSendFollow: PropTypes.func.isRequired,
};
