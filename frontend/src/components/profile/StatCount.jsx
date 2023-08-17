import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import APIService from "../../services/APIService";
import { notifyError } from "../../services/toasts";

export default function StatCount({
  profile,
  data,
  label,
  sendFollow,
  // setIsShow,
}) {
  const [count, setCount] = useState(null);

  useEffect(() => {
    if (profile) {
      APIService.get(`/${data}-stats/${profile}`)
        .then((res) => {
          setCount(res.data);
        })
        .catch((err) => {
          if (err.request?.status === 500) {
            notifyError(`Error fetching ${data}'s count.`);
          }
        });
    }
  }, [profile, sendFollow]);

  return (
    <div className="flex flex-col items-center justify-center dark:text-dust-0">
      <h3 className="text-xl font-semibold">{count?.count}</h3>
      <p className="-mt-1 text-sm">{`${label}${
        count?.count > 1 ? "s" : ""
      }`}</p>
    </div>
  );
}

StatCount.propTypes = {
  profile: PropTypes.number.isRequired,
  data: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  sendFollow: PropTypes.bool.isRequired,
  // setIsShow: PropTypes.func.isRequired,
};
