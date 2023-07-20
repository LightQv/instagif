import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

export default function PostInsight({ data, index, loading, setLoading }) {
  return (
    <li className="h-full w-full">
      <div
        className="flex h-[50dvw] w-full items-center justify-center lg:h-60"
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
        className="flex h-[50dvw] w-full items-center justify-center lg:h-[25dvw]"
        style={{ display: loading ? "none" : "block" }}
      >
        <Link to={`/post-details/${data.post_id}`} className="h-full w-full">
          <img
            src={data.gif_url}
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
  data: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
};
