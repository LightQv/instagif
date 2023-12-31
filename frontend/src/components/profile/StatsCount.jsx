import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import APIService from "../../services/APIService";
import { notifyError } from "../toasts/CustomToasts";

export default function StatsCount({
  profile,
  data,
  label,
  sendFollow,
  setIsShow,
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
            notifyError("Oops, something went wrong.");
          }
        });
    }
  }, [profile, sendFollow]);

  const handleModal = () => {
    if (data === "follows") {
      setIsShow({ follows: true });
    }
  };
  return (
    <button
      type="button"
      aria-label="show stats count"
      className={`flex flex-col items-center justify-center dark:text-dust-0 ${
        data === "followers" || data === "follows"
          ? "cursor-pointer hover:text-granite-0"
          : "cursor-default"
      }`}
      onClick={() => handleModal()}
    >
      <h3 className="text-xl font-semibold">{count?.count}</h3>
      <p className="-mt-1 text-sm">{`${label}${
        count?.count > 1 ? "s" : ""
      }`}</p>
    </button>
  );
}

StatsCount.propTypes = {
  profile: PropTypes.number.isRequired,
  data: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  sendFollow: PropTypes.bool.isRequired,
  setIsShow: PropTypes.func.isRequired,
};
