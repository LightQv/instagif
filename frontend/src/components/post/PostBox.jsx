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

export default function PostBox({ post }) {
  const { user } = useUserContext();
  TimeAgo.addLocale(fr);
  const [feelings, setFeelings] = useState(null);
  const [feelingsCount, setFeelingsCount] = useState(null);
  const [sendFeelings, setSendFeelings] = useState(true);

  // If Post's User = User's Loged : Link to My Profile
  function getProfilLink() {
    if (user?.id === post.user.id) {
      return "/my-profile";
    }
    return `/${post.user.username}`;
  }

  // --- Feeling logic --- //
  useEffect(() => {
    if (sendFeelings) {
      APIService.get(`/feelings-post/${post.id}`)
        .then((res) => {
          setFeelingsCount(res.data.count);
          setFeelings(res.data.data);
          setSendFeelings(false);
        })
        .catch((err) => {
          if (err.request?.status === 500) {
            notifyError("Error, please try later.");
          }
        });
    }
  }, [feelings, sendFeelings]);

  // Handle Feeling already created (Create new Feelings -> FeelingAction.jsx)
  // Store User's feelings
  const userFeeling = feelings?.filter((el) => el.user_id === user.id);

  // Feeling already exist & is User's : delete Feeling
  // User's didn't post this feeling : add Feeling
  const handleFeeling = (feeling) => {
    // Check If Selected Feeling is a userFeeling
    const selectedFeeling = userFeeling.filter(
      (el) => el.emoji === feeling.emoji
    );
    setSendFeelings(false);
    if (feeling && userFeeling && selectedFeeling.length > 0) {
      APIService.delete(`/feelings/${selectedFeeling[0]?.id}`)
        .then(() => setSendFeelings(true))
        .catch((err) => {
          if (err.request?.status === 500) {
            notifyError("Error, please try later.");
          }
        });
    } else {
      APIService.post(`/feelings`, {
        name: feeling.name,
        emoji: feeling.emoji,
        post_id: post.id,
        user_id: user.id,
      })
        .then(() => setSendFeelings(true))
        .catch((err) => {
          if (err.request?.status === 404 || err.request?.status === 500) {
            notifyError("Error, please try later.");
          }
        });
    }
  };

  // Tooltip text based of number of user's which felt the same way
  const getAuthors = (feeling) => {
    const authors = [];
    feelings.filter((el) => {
      if (el.emoji === feeling.emoji) authors.push(el.user.username);
      return null;
    });
    if (authors.length === 1) {
      return authors.toString();
    }
    if (authors.length === 2) {
      return `${authors[0]} and ${authors[1]}`;
    }
    return `${authors[0]}, ${authors[1]} and ${authors.length - 2} more person${
      authors.length > 3 ? "s" : ""
    }`;
  };

  return (
    <li className="w-full border-b-[1px] border-sand-0 text-cobble-0 last:border-b-0 lg:pt-4">
      <Link to={`/${post.user?.username}/${post.id}`}>
        <img src={post.gif_url} alt="mood_gif" className="w-full" />
      </Link>
      <div className="px-4 pb-8 pt-2 lg:pb-8">
        <div className="flex w-full items-center justify-start gap-2">
          <Link to={getProfilLink()}>
            <div className="flex h-8 w-8 items-center justify-center self-start rounded-full bg-cobble-0 text-dust-0 transition-all hover:scale-105 hover:bg-granite-0 dark:bg-sand-0 dark:text-cobble-0 dark:hover:bg-granite-0">
              {post.user?.username.slice(0, 1)}
            </div>
          </Link>
          <div className="mt-1 w-[calc(100%-2.5rem)]">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold transition-all hover:text-granite-0 dark:text-dust-0 dark:hover:text-granite-0 lg:font-bold">
                <Link to={getProfilLink()}>{post.user?.username}'s </Link>
                <span className="text-xs font-normal italic">
                  mood{" "}
                  <ReactTimeAgo date={new Date(post.created_at)} locale="fr" />.
                </span>
              </h3>
              <div className="flex items-center gap-2">
                <LikeAction post={post} />
              </div>
            </div>
            <p className="-mt-2 text-lg font-bold dark:text-dust-0">
              "{post.title}"
            </p>
          </div>
        </div>
        <ul className="mt-1 flex w-full flex-wrap items-center gap-2">
          {feelingsCount &&
            feelingsCount.map((feeling) => (
              <button
                key={feeling.emoji}
                type="button"
                onClick={() => handleFeeling(feeling)}
                className={`flex w-fit items-center gap-2 rounded-md bg-sand-0 p-2 transition-all hover:scale-105 hover:grayscale-0 dark:bg-granite-0 ${
                  feelings?.some(
                    (el) => el.emoji === feeling.emoji && el.user_id === user.id
                  )
                    ? "text-red-800 outline outline-1 outline-red-800"
                    : "outline outline-1 outline-sand-0"
                }`}
                data-tooltip-id="my-tooltip"
                data-tooltip-content={`${getAuthors(feeling)} felt :${
                  feeling?.name
                }:`}
              >
                <Emoji
                  unified={feeling.emoji}
                  emojiStyle="twitter"
                  size={18}
                  id="my-element"
                />
                {/* <p className="text-xs font-medium">{feeling._count}</p> */}
              </button>
            ))}
          <div>
            <FeelingAction
              post={post}
              feelings={feelings}
              setSendFeelings={setSendFeelings}
            />
          </div>
        </ul>
      </div>
      <Tooltip id="my-tooltip" />
    </li>
  );
}

PostBox.propTypes = {
  post: PropTypes.shape().isRequired,
};
