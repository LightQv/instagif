import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import FollowAction from "./profile/FollowAction";
import APIService from "../services/APIService";
import { notifyError } from "../services/toasts";

export default function SuggestionBox({ sendFollow, setSendFollow }) {
  const { user } = useUserContext();
  const [unfollowedUser, setUnfollowedUser] = useState(null);

  useEffect(() => {
    APIService.get(`/users-unfollowed/${user.id}`)
      .then((res) => {
        setUnfollowedUser(res.data);
        setSendFollow(false);
      })
      .catch(() => notifyError("Oops, something went wrong."));
  }, [sendFollow]);

  return (
    <ul
      className={`hidden ${
        user.id && window.innerWidth >= 1024 && unfollowedUser?.length > 0
          ? "h-fit w-[30%] border-[1px] border-sand-0 text-cobble-0 last:border-b-0 dark:border-granite-0 lg:mt-4 lg:block"
          : ""
      }`}
    >
      <h3 className="px-4 pt-4 text-lg font-bold dark:text-dust-0">
        Suggestion{`${unfollowedUser?.length > 1 ? "s" : ""}`}
      </h3>
      {unfollowedUser &&
        unfollowedUser.map((u) => (
          <li className="flex h-fit w-full items-center justify-between border-b-[1px] border-sand-0 p-4 dark:border-granite-0 dark:text-dust-0">
            <Link to={`/${u.username}`} className="">
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
                  <h3 className="text-base font-semibold">{u.username}</h3>
                  <section className="flex gap-3">
                    <div className="flex items-center gap-1">
                      <h6 className="text-xs">
                        Follower{u._count.posts > 1 && "s"}
                      </h6>
                      <p className="text-sm font-semibold">
                        {u._count.followedBy}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <h6 className="text-xs">Following</h6>
                      <p className="text-sm font-semibold">
                        {u._count.following}
                      </p>
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
        ))}
    </ul>
  );
}

SuggestionBox.propTypes = {
  sendFollow: PropTypes.bool.isRequired,
  setSendFollow: PropTypes.func.isRequired,
};
