import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import APIService from "../../services/APIService";
import { notifyError } from "../../services/toasts";

export default function FollowedCount({
  profile,
  setFollowerList,
  sendFollow,
  setSendFollow,
}) {
  const [followerCount, setFollowerCount] = useState(null);

  useEffect(() => {
    if (profile) {
      APIService.get(`/followed-stats/${profile.id}`)
        .then((res) => {
          setFollowerCount(res.data);
          setFollowerList(res.data.data);
          setSendFollow(false);
        })
        .catch((err) => {
          if (err.request?.status === 500) {
            notifyError(`Error fetching likes's count.`);
          }
        });
    }
  }, [profile, sendFollow]);

  return (
    <div className="flex flex-col items-center justify-center dark:text-dust-0">
      <h3 className="text-xl font-semibold">
        {followerCount && followerCount.count}
      </h3>
      <p className="-mt-1 text-sm">Follower{followerCount?.count > 1 && "s"}</p>
    </div>
  );
}

FollowedCount.propTypes = {
  profile: PropTypes.shape().isRequired,
  setFollowerList: PropTypes.func.isRequired,
  sendFollow: PropTypes.bool.isRequired,
  setSendFollow: PropTypes.func.isRequired,
};
