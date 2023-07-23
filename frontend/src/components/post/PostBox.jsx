import PropTypes from "prop-types";
import TimeAgo from "javascript-time-ago";
import fr from "javascript-time-ago/locale/en.json";
import ReactTimeAgo from "react-time-ago";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Emoji } from "emoji-picker-react";
import { useUserContext } from "../../contexts/UserContext";
import LikeAction from "./LikeAction";
import FeelingAction from "./FeelingAction";
import APIService from "../../services/APIService";
import { notifyError } from "../../services/toasts";

export default function PostBox({ data }) {
  const { user } = useUserContext();
  TimeAgo.addLocale(fr);
  const [sendFeelings, setSendFeelings] = useState(null);
  const [feelings, setFeelings] = useState(null);

  // If Post's User = User's Loged : Link to My Profile
  function getProfilLink() {
    if (user?.id === data.user_id) {
      return "/my-profile";
    }
    return `/${data.username}`;
  }

  useEffect(() => {
    if (data) {
      APIService.get(`/feelings-post/${data.post_id}`)
        .then((res) => setFeelings(res.data))
        .catch((err) => {
          if (err.request.status === 500) {
            notifyError("Error, please try later.");
          }
        });
    }
  }, [sendFeelings]);

  // const handleFeelingDelete = (feeling) => {
  //   if (feeling) {
  //     APIService.delete(`/feelings-post/${feeling_id}`)
  //       .then((res) => setFeelings(res.data))
  //       .catch((err) => {
  //         if (err.request.status === 500) {
  //           notifyError("Error, please try later.");
  //         }
  //       });
  //   }
  // };

  return (
    <li className="w-full text-cobble-0">
      <Link to={`/${data.username}/${data.post_id}`}>
        <img src={data.gif_url} alt="mood_gif" className="w-full" />
      </Link>
      <div className=" p-4">
        <div className="flex w-full items-center justify-start gap-2">
          <Link to={getProfilLink()}>
            <div className="flex h-8 w-8 items-center justify-center self-start rounded-full bg-cobble-0 text-dust-0 transition-all hover:scale-105 hover:bg-granite-0 dark:bg-sand-0 dark:text-cobble-0 dark:hover:bg-granite-0">
              {data.username.slice(0, 1)}
            </div>
          </Link>
          <div className="mt-1 w-[calc(100%-2.5rem)]">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold transition-all hover:text-granite-0 dark:text-dust-0 dark:hover:text-granite-0 lg:font-bold">
                <Link to={getProfilLink()}>{data.username}'s </Link>
                <span className="text-xs font-normal italic">
                  mood{" "}
                  <ReactTimeAgo date={new Date(data.created_at)} locale="fr" />.
                </span>
              </h3>
              <LikeAction data={data} />
            </div>
            <p className="-mt-1 text-lg font-bold dark:text-dust-0">
              "{data.title}"
            </p>
          </div>
        </div>
        <ul className="mt-1 flex w-full items-center gap-2">
          {feelings &&
            feelings.length > 0 &&
            feelings.map((feeling) => (
              <button
                type="button"
                // onClick={() => handleFeelingDelete(feeling)}
                className={`hover: w-fit rounded-md bg-sand-0 p-2 transition-all hover:scale-105 hover:grayscale-0 dark:bg-granite-0 ${
                  feeling.user_id === user.id ? "grayscale-0" : "grayscale"
                }`}
              >
                <Emoji
                  unified={feeling.emoji}
                  emojiStyle="twitter"
                  key={feeling.feeling_id}
                  size={22}
                />
              </button>
            ))}
          <FeelingAction data={data} setSendFeelings={setSendFeelings} />
        </ul>
      </div>
    </li>
  );
}

PostBox.propTypes = {
  data: PropTypes.shape().isRequired,
};
