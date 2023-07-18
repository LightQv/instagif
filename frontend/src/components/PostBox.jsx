import PropTypes from "prop-types";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ReactTimeAgo from "react-time-ago";
import LikeSvg from "./svg/LikeSvg";
import CommentSvg from "./svg/CommentSvg";

export default function PostBox({ data }) {
  TimeAgo.addLocale(en);

  return (
    <li className="w-full h-fit pb-4 border-b-2 border-gray-200">
      <img src={data.gif_url} alt="mood_gif" className="w-full" />
      <div className="w-full flex justify-start items-center gap-2 p-4">
        <div className="self-start h-8 w-8 bg-cobble-0 rounded-full text-dust-0 flex items-center justify-center">
          {data.username.slice(0, 1)}
        </div>
        <div className="mt-1 w-[calc(100%-2.5rem)]">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">
              {data.username}'s{" "}
              <span className="italic font-normal text-xs">
                mood{" "}
                <ReactTimeAgo
                  date={new Date(data.created_at).toLocaleDateString("en-US")}
                  locale="en-US"
                />
                .
              </span>
            </h3>
            <div className="ml-auto flex gap-2 items-center">
              <button type="button">
                <LikeSvg />
              </button>
              <button type="button">
                <CommentSvg />
              </button>
            </div>
          </div>
          <p className="-mt-1 font-bold text-lg">"{data.title}"</p>
        </div>
      </div>
    </li>
  );
}

PostBox.propTypes = {
  data: PropTypes.shape().isRequired,
};
