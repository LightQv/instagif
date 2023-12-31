import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import APIService from "../../services/APIService";
import { notifyError } from "../toasts/CustomToasts";

export default function FollowersCount({
  profile,
  setFollowerList,
  sendFollow,
  setSendFollow,
  setIsShow,
}) {
  const [followerCount, setFollowerCount] = useState(null);

  useEffect(() => {
    if (profile) {
      APIService.get(`/followers-stats/${profile.id}`)
        .then((res) => {
          setFollowerCount(res.data);
          setFollowerList(res.data.data);
          setSendFollow(false);
        })
        .catch((err) => {
          if (err.request?.status === 500) {
            notifyError("Oops, something went wrong.");
          }
        });
    }
  }, [profile, sendFollow]);

  return (
    <button
      type="button"
      aria-label="show follow count"
      className="flex flex-col items-center justify-center hover:text-granite-0 dark:text-dust-0"
      onClick={() => setIsShow({ followers: true })}
    >
      <h3 className="text-xl font-semibold">
        {followerCount && followerCount.count}
      </h3>
      <p className="-mt-1 text-sm">Follower{followerCount?.count > 1 && "s"}</p>
    </button>
  );
}

FollowersCount.propTypes = {
  profile: PropTypes.shape().isRequired,
  setFollowerList: PropTypes.func.isRequired,
  sendFollow: PropTypes.bool.isRequired,
  setSendFollow: PropTypes.func.isRequired,
  setIsShow: PropTypes.func.isRequired,
};
