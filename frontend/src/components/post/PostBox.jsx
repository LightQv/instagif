import PropTypes from "prop-types";
import TimeAgo from "javascript-time-ago";
import fr from "javascript-time-ago/locale/en.json";
import ReactTimeAgo from "react-time-ago";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Emoji } from "emoji-picker-react";
import { Tooltip } from "react-tooltip";
import { useUserContext } from "../../contexts/UserContext";
import LikeAction from "./LikeAction";
import FeelingAction from "./FeelingAction";
import APIService from "../../services/APIService";
import { notifyError } from "../../services/toasts";

export default function PostBox({ data }) {
  const { user } = useUserContext();
  TimeAgo.addLocale(fr);
  const [sendFeelings, setSendFeelings] = useState(false);
  const [feelings, setFeelings] = useState(null);

  // If Post's User = User's Loged : Link to My Profile
  function getProfilLink() {
    if (user?.id === data.user_id) {
      return "/my-profile";
    }
    return `/${data.username}`;
  }

  // --- Feeling logic --- //
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

  // Handle Feeling
  // Feeling already exist & is User's : delete Feeling
  // User's didn't post this feeling : add Feeling
  const handleFeeling = (feeling) => {
    setSendFeelings(false);
    if (feeling && feeling.user_id === user.id) {
      APIService.delete(`/feelings/${feeling.feeling_id}`)
        .then(() => setSendFeelings(true))
        .catch((err) => {
          if (err.request.status === 500) {
            notifyError("Error, please try later.");
          }
        });
    } else {
      APIService.post(`/feelings`, {
        name: feeling.feeling_name,
        emoji: feeling.emoji,
        post_id: data.post_id,
        user_id: user.id,
      })
        .then(() => setSendFeelings(true))
        .catch((err) => {
          if (err.request.status === 404 || err.request.status === 500) {
            notifyError("Error, please try later.");
          }
        });
    }
  };

  return (
    <li className="w-full border-b-[1px] border-sand-0 text-cobble-0 last:border-b-0 lg:pt-4">
      <Link to={`/${data.username}/${data.post_id}`}>
        <img src={data.gif_url} alt="mood_gif" className="w-full" />
      </Link>
      <div className="px-4 pb-8 pt-2 lg:pb-8">
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
              <div className="flex items-center gap-2">
                <LikeAction data={data} />
                <FeelingAction data={data} setSendFeelings={setSendFeelings} />
              </div>
            </div>
            <p className="-mt-2 text-lg font-bold dark:text-dust-0">
              "{data.title}"
            </p>
          </div>
        </div>
        <ul className="mt-1 flex w-full items-center gap-2">
          {feelings &&
            feelings.length > 0 &&
            feelings.map((feeling) => (
              <button
                key={feeling.feeling_id}
                type="button"
                onClick={() => handleFeeling(feeling)}
                className={`hover: w-fit rounded-md bg-sand-0 p-2 transition-all hover:scale-105 hover:grayscale-0 dark:bg-granite-0 ${
                  feeling.user_id === user.id ? "grayscale-0" : "grayscale"
                }`}
                data-tooltip-id="my-tooltip"
                data-tooltip-content={`${feeling.username} felt :${feeling.feeling_name}:`}
              >
                <Emoji
                  unified={feeling.emoji}
                  emojiStyle="twitter"
                  size={22}
                  id="my-element"
                />
              </button>
            ))}
        </ul>
      </div>
      <Tooltip id="my-tooltip" />
    </li>
  );
}

PostBox.propTypes = {
  data: PropTypes.shape().isRequired,
};
