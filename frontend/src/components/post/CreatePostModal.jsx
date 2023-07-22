import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import LoadingBar from "react-top-loading-bar";
import ExitSvg from "../svg/navigation/ExitSvg";
import BeforeSvg from "../svg/navigation/BeforeSvg";
import { notifyError } from "../../services/toasts";
import { addPostSchema } from "../../services/validators";
import APIService from "../../services/APIService";
import { useUserContext } from "../../contexts/UserContext";

export default function CreatePostModal({ selectedGif, setIsShow }) {
  const { user } = useUserContext();
  const [steps, setSteps] = useState({
    gifView: true,
    addTitle: false,
  });
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  // console.log(progress);

  const formik = useFormik({
    initialValues: {
      title: "",
      gif_url: selectedGif.images?.original.webp,
      user_id: user.id,
    },

    validationSchema: addPostSchema,

    onSubmit: async (values) => {
      try {
        const res = await APIService.post(`/posts`, values);
        if (res) {
          setShowProgress(true);
        } else throw new Error();
      } catch (error) {
        if (error.request?.status === 401) {
          notifyError("rror.");
        }
      }
    },
  });

  // --- Loader logic --- //
  // Parameter : 3sec
  // Progess + 1 every 30ms = 100% in 3sec
  // LoadingBar speed param at 10ms
  // Once 100% is reached -> redirect to "/"
  useEffect(() => {
    if (showProgress) {
      const interval = setInterval(() => {
        setProgress(progress + 1);
      }, 30);
      if (progress === 100) {
        clearInterval(interval);
        navigate("/");
      }
    }
    return undefined;
  }, [showProgress, progress]);

  const handleEndLoadBar = () => {
    setShowProgress(false);
    setProgress(0);
  };

  return (
    <div className="relative flex h-screen w-screen flex-col justify-between rounded-lg lg:w-fit">
      {showProgress && (
        <div className="absolute bottom-0 left-0 h-1.5 w-full">
          <LoadingBar
            height={6}
            color="rgb(153 27 27)"
            progress={progress}
            onLoaderFinished={() => handleEndLoadBar()}
            loaderSpeed={10}
            shadow
          />
        </div>
      )}
      <button
        type="button"
        className="mr-2 mt-2 self-end text-dust-0 transition-all hover:scale-110 hover:text-sand-0"
        onClick={() => setIsShow(false)}
      >
        <ExitSvg />
      </button>
      {steps.gifView && (
        <>
          <img
            src={selectedGif.images?.original.webp}
            alt={selectedGif.title}
          />
          <div className="h-fit w-full p-4">
            <button
              type="button"
              onClick={() => setSteps({ gifView: false, addTitle: true })}
              className="flex h-10 w-full items-center justify-center rounded-md bg-dust-0 py-2 text-sm font-semibold text-cobble-0 transition-all hover:scale-[1.03] hover:bg-sand-0 dark:bg-granite-0 dark:text-sand-0"
            >
              Choose this one
            </button>
          </div>
        </>
      )}
      {steps.addTitle && (
        <form
          action="addPost"
          onSubmit={formik.handleSubmit}
          className="flex h-full flex-col items-center justify-between"
        >
          <div className="m-auto transition-all">
            <img
              src={selectedGif.images?.original.webp}
              alt={selectedGif.title}
            />
            <div className="h-12 w-full p-4">
              <input
                type="title"
                name="title"
                id="title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="How do you feel ?"
                className="w-full rounded-md bg-dust-0 px-4 py-2 font-semibold placeholder:text-sm placeholder:font-normal placeholder:italic placeholder:text-black/50 dark:bg-granite-0 dark:text-sand-0"
              />
              {formik.touched.title && (
                <p className="mt-2 text-xs italic text-red-500">
                  {formik.errors.title}
                </p>
              )}
            </div>
          </div>
          <div className="flex h-fit w-full gap-2 p-4 transition-all">
            <button
              type="button"
              className="flex h-10 w-1/5 items-center justify-center rounded-md bg-dust-0 py-2 text-sm font-semibold text-cobble-0 transition-all hover:scale-[1.03] hover:bg-sand-0 dark:bg-granite-0 dark:text-sand-0"
              onClick={() => setSteps({ gifView: true, addTitle: false })}
            >
              <BeforeSvg />
            </button>
            <button
              type="submit"
              onSubmit={formik.handleSubmit}
              disabled={!addPostSchema.isValidSync(formik.values)}
              className="flex h-10 w-4/5 items-center justify-center rounded-md bg-red-800 py-2 text-sm font-semibold text-dust-0 transition-all hover:scale-[1.03] hover:bg-red-600 disabled:bg-gray-300 disabled:text-gray-800 disabled:hover:scale-100 dark:bg-granite-0 dark:text-sand-0"
            >
              Share
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

CreatePostModal.propTypes = {
  selectedGif: PropTypes.shape().isRequired,
  setIsShow: PropTypes.func.isRequired,
};
