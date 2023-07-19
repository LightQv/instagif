import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function PostInsight({ data, index }) {
  return (
    <li className="h-full w-full">
      <div className="flex h-[50dvw] w-full items-center justify-center lg:h-60">
        <Link to={`/post-details/${data.post_id}`} className="h-full w-full">
          <img
            src={data.gif_url}
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
};
