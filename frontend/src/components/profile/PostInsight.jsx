import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function PostInsight({ data, index }) {
  return (
    <li className="h-full w-full">
      <Link to={`/post-details/${data.post_id}`}>
        <img
          src={data.gif_url}
          alt={`Post ${index + 1}`}
          className="h-full w-full object-cover"
        />
      </Link>
    </li>
  );
}

PostInsight.propTypes = {
  data: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
};
