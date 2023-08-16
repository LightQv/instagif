import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import APIService from "../../services/APIService";
import { notifyError } from "../../services/toasts";

export default function FeelingCount({ profile }) {
  const [feelingCount, setFeelingCount] = useState(null);

  useEffect(() => {
    if (profile) {
      APIService.get(`/feelings-stats/${profile.id}`)
        .then((res) => {
          setFeelingCount(res.data);
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
        {feelingCount && feelingCount.count}
      </h3>
      <p className="-mt-1 text-sm">Feeling{feelingCount?.count > 1 && "s"}</p>
    </div>
  );
}

FeelingCount.propTypes = {
  profile: PropTypes.shape().isRequired,
};
