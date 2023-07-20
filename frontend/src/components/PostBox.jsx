import PropTypes from "prop-types";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ReactTimeAgo from "react-time-ago";
import { Link } from "react-router-dom";
import LikeSvg from "./svg/LikeSvg";
import CommentSvg from "./svg/CommentSvg";
import { useUserContext } from "../context/UserContext";

export default function PostBox({ data }) {
  const { user } = useUserContext();
  TimeAgo.addLocale(en);

  function getProfilLink() {
    if (user.id === data.user_id) {
      return "/my-profile";
    }
    return `/profile/${data.username.toLowerCase()}`;
  }

  return (
    <li className="w-full">
      <Link to={`/post-details/${data.post_id}`}>
        <img src={data.gif_url} alt="mood_gif" className="w-full" />
      </Link>
      <div className="flex w-full items-center justify-start gap-2 p-4">
        <Link to={getProfilLink()}>
          <div className="flex h-8 w-8 items-center justify-center self-start rounded-full bg-cobble-0 text-dust-0">
            {data.username.slice(0, 1)}
          </div>
        </Link>
        <div className="mt-1 w-[calc(100%-2.5rem)]">
          <div className="flex items-center justify-between">
            <Link to={getProfilLink()}>
              <h3 className="font-semibold">
                {data.username}'s{" "}
                <span className="text-xs font-normal italic">
                  mood{" "}
                  <ReactTimeAgo
                    date={new Date(data.created_at).toLocaleDateString("en-US")}
                    locale="en-US"
                  />
                  .
                </span>
              </h3>
            </Link>
            <div className="flex items-center gap-2">
              <button type="button">
                <LikeSvg />
              </button>
              <button type="button">
                <CommentSvg />
              </button>
            </div>
          </div>
          <p className="-mt-1 text-lg font-bold">"{data.title}"</p>
        </div>
      </div>
    </li>
  );
}

PostBox.propTypes = {
  data: PropTypes.shape().isRequired,
};
