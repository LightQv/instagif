import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import FollowAction from "./profile/FollowAction";
import APIService from "../services/APIService";
import { notifyError } from "./toasts/CustomToasts";

export default function SuggestionBox({ sendFollow, setSendFollow }) {
  const { user } = useUserContext();
  const [unfollowedUser, setUnfollowedUser] = useState(null);

  useEffect(() => {
    APIService.get(`/users-unfollowed/${user.id}`)
      .then((res) => {
        setUnfollowedUser(res.data);
        setSendFollow(false);
      })
      .catch((err) => {
        if (err.request?.status === 500) {
          notifyError("Oops, something went wrong.");
        }
      });
  }, [sendFollow]);

  return (
    <aside
      className={`hidden ${
        user.id && window.innerWidth >= 1024 && unfollowedUser?.length > 0
          ? "h-fit w-[30%] border-[1px] border-sand-0 text-cobble-0 last:border-b-0 dark:border-granite-0 lg:mt-4 lg:block"
          : ""
      }`}
    >
      <h1 className="px-4 pt-4 text-lg font-bold dark:text-dust-0">
        Suggestion{`${unfollowedUser?.length > 1 ? "s" : ""}`}
      </h1>
      {unfollowedUser && (
        <ul>
          {unfollowedUser.map((u) => (
            <li
              key={u.id}
              className="flex h-fit w-full items-center justify-between border-b-[1px] border-sand-0 p-4 dark:border-granite-0 dark:text-dust-0"
            >
              <Link to={`/profile/${u.username}`} className="">
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
                        <h3 className="text-xs">
                          Follower{u._count.posts > 1 && "s"}
                        </h3>
                        <p className="text-sm font-semibold">
                          {u._count.followedBy}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <h3 className="text-xs">Following</h3>
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
      )}
    </aside>
  );
}

SuggestionBox.propTypes = {
  sendFollow: PropTypes.bool.isRequired,
  setSendFollow: PropTypes.func.isRequired,
};
