import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import APIService from "../../services/APIService";
import { notifyError } from "../../services/toasts";

export default function LikeCount({ profile }) {
  const [likeCount, setLikeCount] = useState(null);

  useEffect(() => {
    if (profile) {
      APIService.get(`/likes-stats/${profile.id}`)
        .then((res) => {
          setLikeCount(res.data);
        })
        .catch((err) => {
          if (err.request.status === 500) {
            notifyError(`Error fetching likes's count.`);
          }
        });
    }
  }, [profile]);

  return (
    <div className="flex flex-col items-center justify-center dark:text-dust-0">
      <h3 className="text-xl font-semibold">
        {likeCount && likeCount[0].like_count}
      </h3>
      <p className="-mt-1 text-sm">Likes</p>
    </div>
  );
}

LikeCount.propTypes = {
  profile: PropTypes.shape().isRequired,
};
