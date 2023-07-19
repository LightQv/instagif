import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";

export default function GifInsight({
  data,
  loading,
  setLoading,
  setIsShow,
  setSelectedGif,
}) {
  const [mobileView, setMobileView] = useState(false);

  // Determine if Window is Desktop or Mobile
  const handleResize = () => {
    setMobileView(window.innerWidth <= 768);
  };

  // Listen to Window Resize each time it being resized
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize(); // Determine actual window size
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function chooseFormat(images) {
    if (mobileView) {
      return images?.fixed_width?.webp;
    }
    return images?.original.webp;
  }

  const handleClick = () => {
    setIsShow(true);
    setSelectedGif(data);
  };

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
        className="flex h-[50dvw] w-full items-center justify-center lg:h-60"
        style={{ display: loading ? "none" : "block" }}
      >
        <button
          className="h-full w-full"
          type="button"
          onClick={() => handleClick()}
        >
          <img
            src={chooseFormat(data.images)}
            onLoad={() => setLoading(false)}
            alt={data.title}
            className="h-full w-full rounded-md object-cover"
          />
        </button>
      </div>
    </li>
  );
}

GifInsight.propTypes = {
  data: PropTypes.shape().isRequired,
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  setIsShow: PropTypes.func.isRequired,
  setSelectedGif: PropTypes.func.isRequired,
};
