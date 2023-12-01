import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import APIService from "../../services/APIService";
import { notifyError } from "../toasts/CustomToasts";
import FollowAction from "./FollowAction";
import ExitSvg from "../svg/navigation/ExitSvg";
import { useUserContext } from "../../contexts/UserContext";

export default function StatsModal({
  profile,
  data,
  setIsShow,
  sendFollow,
  setSendFollow,
}) {
  const { user } = useUserContext();
  const [users, setUsers] = useState(null);

  useEffect(() => {
    if (profile) {
      APIService.get(`/${data}-list/${profile}`)
        .then((res) => {
          setUsers(res.data);
        })
        .catch((err) => {
          if (err.request?.status === 500) {
            notifyError("Oops, something went wrong.");
          }
        });
    }
  }, [profile, sendFollow]);

  return (
    <ul className="m-4 w-full rounded-lg bg-dust-0 lg:w-2/5">
      <div className="flex w-full justify-between px-4 pt-4">
        <h1 className="font-bold">
          {data.charAt(0).toUpperCase() + data.slice(1)}
        </h1>
        <button type="button" onClick={() => setIsShow(false)}>
          <ExitSvg />
        </button>
      </div>
      {users &&
        users.map((u) => (
          <li className="flex h-fit w-full items-center justify-between border-b-[1px] border-sand-0 p-4 last:border-none dark:border-granite-0 dark:text-dust-0">
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
                </div>
              </section>
            </Link>
            {u.id !== user.id && (
              <FollowAction
                profile={u}
                followerList={u.followedBy}
                setSendFollow={setSendFollow}
                width="w-[30%]"
                textSize="text-xs"
              />
            )}
          </li>
        ))}
    </ul>
  );
}

StatsModal.propTypes = {
  profile: PropTypes.number.isRequired,
  data: PropTypes.string.isRequired,
  sendFollow: PropTypes.bool.isRequired,
  setSendFollow: PropTypes.func.isRequired,
  setIsShow: PropTypes.func.isRequired,
};
