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
    return `/${u.username}`;
  }

  return (
    <li className="flex h-fit w-full items-center justify-between border-b-[1px] border-sand-0 p-4 dark:border-granite-0 dark:text-dust-0">
      <Link to={getProfilLink(u)} className="">
        <section className="flex items-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center self-start rounded-full bg-cobble-0 text-xl text-dust-0 dark:bg-sand-0 dark:text-cobble-0">
            {u.username.slice(0, 1).toUpperCase()}
          </div>
          <div className="flex h-full flex-col justify-center">
            <h3 className="text-base font-semibold">{u.username}</h3>
            <section className="flex gap-3">
              <div className="flex items-center gap-1">
                <h6 className="text-xs">Follower{u._count.posts > 1 && "s"}</h6>
                <p className="text-sm font-semibold">{u._count.followedBy}</p>
              </div>
              <div className="flex items-center gap-1">
                <h6 className="text-xs">Following</h6>
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
