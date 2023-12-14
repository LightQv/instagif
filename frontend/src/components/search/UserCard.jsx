import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import FollowAction from "../profile/FollowAction";

export default function UserCard({ u, setSendFollow }) {
  const { user } = useUserContext();

  // If Post's User = User's Loged : Link to My Profile
  function getProfilLink() {
    if (user?.id === u.id) {
      return "/my-profile";
    }
    return `/profile/${u.username}`;
  }

  return (
    <li className="flex h-fit w-full items-center justify-between border-b-[1px] border-sand-0 py-4 dark:border-granite-0 dark:text-dust-0">
      <Link to={getProfilLink(u)} className="">
        <section className="flex items-center gap-2">
          <img
            src={u?.avatar}
            alt={u?.username.slice(0, 1).toUpperCase()}
            className={`flex h-12 w-12 items-center justify-center self-start rounded-full object-cover ${
              !u?.avatar &&
              "bg-cobble-0 text-xl text-dust-0 dark:bg-sand-0 dark:text-cobble-0"
            }`}
          />
          <div className="flex h-full flex-col justify-center">
            <h2 className="text-base font-semibold">{u.username}</h2>
            <section className="flex gap-3">
              <div className="flex items-center gap-1">
                <h3 className="text-xs">Follower{u._count.posts > 1 && "s"}</h3>
                <p className="text-sm font-semibold">{u._count.followedBy}</p>
              </div>
              <div className="flex items-center gap-1">
                <h3 className="text-xs">Following</h3>
                <p className="text-sm font-semibold">{u._count.following}</p>
              </div>
            </section>
          </div>
        </section>
      </Link>
      {u.id !== user.id && (
        <FollowAction
          profile={u}
          followerList={u.followedBy}
          setSendFollow={setSendFollow}
          width="w-[28%]"
          textSize="text-xs"
        />
      )}
    </li>
  );
}

UserCard.propTypes = {
  u: PropTypes.shape().isRequired,
  setSendFollow: PropTypes.func.isRequired,
};
