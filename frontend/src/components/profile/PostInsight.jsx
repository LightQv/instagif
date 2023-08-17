import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

export default function PostInsight({
  username,
  post,
  index,
  loading,
  setLoading,
  likePage,
}) {
  return (
    <li className="h-full w-full">
      <div
        className="flex h-[50dvw] w-full items-center justify-center rounded-md border-[1px] border-sand-0 lg:h-[25dvw]"
        style={{ display: loading ? "flex" : "none" }}
      >
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="25%"
          visible
        />
      </div>
      <div
        className={`flex h-[50dvw] w-full items-center justify-center ${
          likePage ? "lg:h-[12.5dvw]" : "lg:h-[25dvw]"
        }`}
        style={{ display: loading ? "none" : "block" }}
      >
        <Link to={`/${username}/${post.id}`} className="h-full w-full">
          <img
            src={post.gif_url}
            onLoad={() => setLoading(false)}
            alt={`Post ${index + 1}`}
            className="h-full w-full rounded-md object-cover"
          />
        </Link>
      </div>
    </li>
  );
}

PostInsight.propTypes = {
  username: PropTypes.string.isRequired,
  post: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  likePage: PropTypes.bool.isRequired,
};
