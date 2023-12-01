import PropTypes from "prop-types";
import TimeAgo from "javascript-time-ago";
import fr from "javascript-time-ago/locale/en.json";
import ReactTimeAgo from "react-time-ago";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Emoji } from "emoji-picker-react";
import { Tooltip } from "react-tooltip";
import { useUserContext } from "../../contexts/UserContext";
import LikeAction from "./LikeAction";
import FeelingAction from "./FeelingAction";
import APIService from "../../services/APIService";
import { notifyError } from "../toasts/CustomToasts";

export default function PostBox({ post, showEmojis, setShowEmojis }) {
  const { user } = useUserContext();

  TimeAgo.addLocale(fr);
  const [likes, setLikes] = useState(null);
  const [likesCount, setLikesCount] = useState(null);
  const [sendLike, setSendLike] = useState(true);
  const [feelings, setFeelings] = useState(null);
  const [feelingsCount, setFeelingsCount] = useState(null);
  const [sendFeeling, setSendFeeling] = useState(true);

  const gifRef = useRef();
  const headerRef = useRef();

  // If Post's User = User's Loged : Link to My Profile
  function getProfilLink() {
    if (user?.id === post.user.id) {
      return "/my-profile";
    }
    return `/profile/${post.user.username}`;
  }

  // --- Likes logic --- //
  useEffect(() => {
    if (sendLike) {
      APIService.get(`/likes-post/${post.id}`)
        .then((res) => {
          setLikesCount(res.data.count);
          setLikes(res.data.data);
          setSendLike(false);
        })
        .catch((err) => {
          if (err.request?.status === 500) {
            notifyError("Oops, something went wrong.");
          }
        });
    }
  }, [likes, sendLike]);

  // --- Feeling logic --- //
  useEffect(() => {
    if (sendFeeling) {
      APIService.get(`/feelings-post/${post.id}`)
        .then((res) => {
          setFeelingsCount(res.data.count);
          setFeelings(res.data.data);
          setSendFeeling(false);
        })
        .catch((err) => {
          if (err.request?.status === 500) {
            notifyError("Oops, something went wrong.");
          }
        });
    }
  }, [feelings, sendFeeling]);

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
    setSendFeeling(false);
    if (feeling && userFeeling && selectedFeeling.length > 0) {
      APIService.delete(`/feelings/${selectedFeeling[0]?.id}`)
        .then(() => setSendFeeling(true))
        .catch((err) => {
          if (err.request?.status === 404 || err.request?.status === 500) {
            notifyError("Oops, something went wrong.");
          }
        });
    } else {
      APIService.post(`/feelings`, {
        name: feeling.name,
        emoji: feeling.emoji,
        post_id: post.id,
        user_id: user.id,
      })
        .then(() => setSendFeeling(true))
        .catch((err) => {
          if (err.request?.status === 404 || err.request?.status === 500) {
            notifyError("Oops, something went wrong.");
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
    <li className="w-full border-b-[1px] border-sand-0 text-cobble-0 last:border-b-0 dark:border-granite-0 lg:pt-4">
      <Link to={`/profile/${post.user?.username}/${post.id}`}>
        <img
          src={post.gif_url}
          alt="mood_gif"
          className="w-full"
          ref={gifRef}
        />
      </Link>
      <div className="px-4 pb-8 pt-2 lg:pb-8" ref={headerRef}>
        <div className="flex w-full items-center justify-start gap-2">
          <Link to={getProfilLink()}>
            <img
              src={post?.user.avatar}
              alt={post?.user.username.slice(0, 1).toUpperCase()}
              className={`flex h-10 w-10 items-center justify-center self-start rounded-full object-cover ${
                !post?.user.avatar &&
                "bg-cobble-0 text-lg text-dust-0 dark:bg-sand-0 dark:text-cobble-0"
              }`}
            />
          </Link>
          <div className="mt-1 w-[calc(100%-2.5rem)]">
            <div className="flex items-center justify-between">
              <h1 className="font-semibold transition-all hover:text-granite-0 dark:text-dust-0 dark:hover:text-granite-0 lg:font-bold">
                <Link to={getProfilLink()}>{post.user?.username}'s </Link>
                <span className="text-xs font-normal italic">
                  mood{" "}
                  <ReactTimeAgo date={new Date(post.created_at)} locale="fr" />.
                </span>
              </h1>
              <div className="flex items-center gap-1">
                {likesCount && likesCount.length > 0 && (
                  <p
                    className={`text-sm font-medium ${
                      likes?.some((el) => el.user_id === user.id)
                        ? "text-red-800"
                        : "dark:text-dust-0"
                    }`}
                  >
                    {likesCount[0]._count}
                  </p>
                )}
                <LikeAction
                  post={post}
                  likes={likes}
                  setSendLike={setSendLike}
                />
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
                <p className="text-xs font-medium">{feeling._count}</p>
              </button>
            ))}
          <div>
            <FeelingAction
              post={post}
              feelings={feelings}
              setSendFeeling={setSendFeeling}
              showEmojis={showEmojis}
              setShowEmojis={setShowEmojis}
              gifRef={gifRef}
              headerRef={headerRef}
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
  showEmojis: PropTypes.bool.isRequired,
  setShowEmojis: PropTypes.func.isRequired,
};
