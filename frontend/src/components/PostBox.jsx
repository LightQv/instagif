import PropTypes from "prop-types";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ReactTimeAgo from "react-time-ago";
import LikeSvg from "./svg/LikeSvg";
import CommentSvg from "./svg/CommentSvg";

export default function PostBox({ data }) {
  TimeAgo.addLocale(en);

  return (
    <li className="w-full">
      <img src={data.gif_url} alt="mood_gif" className="w-full" />
      <div className="flex w-full items-center justify-start gap-2 p-4">
        <div className="flex h-8 w-8 items-center justify-center self-start rounded-full bg-cobble-0 text-dust-0">
          {data.username.slice(0, 1)}
        </div>
        <div className="mt-1 w-[calc(100%-2.5rem)]">
          <div className="flex items-center justify-between">
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
