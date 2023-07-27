import PropTypes from "prop-types";
import { useFormik } from "formik";
import { useState } from "react";
import ExitSvg from "../svg/navigation/ExitSvg";
import LightSvg from "../svg/LightSvg";
import notifySuccess, { notifyError } from "../../services/toasts";
import { addPostSchema } from "../../services/validators";
import APIService from "../../services/APIService";
import { useUserContext } from "../../contexts/UserContext";

export default function EditPostModal({ post, setIsShow }) {
  const { user } = useUserContext();
  const [showHelp, setShowHelp] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: post?.title,
      gif_url: post?.gif_url,
      user_id: user.id,
    },

    validationSchema: addPostSchema,

    onSubmit: async (values) => {
      try {
        const res = await APIService.put(`/posts/${post.id}`, values);
        if (res) {
          notifySuccess("Your post have been successfully modified.");
          setIsShow(false);
        } else throw new Error();
      } catch (error) {
        if (error.request?.status === 401) {
          notifyError("Error modifying your post.");
        }
      }
    },
  });

  return (
    <div className="flex h-screen w-screen flex-col justify-between rounded-lg lg:w-fit">
      <button
        type="button"
        className="mr-2 mt-2 self-end text-dust-0"
        onClick={() => setIsShow(false)}
      >
        <ExitSvg />
      </button>
      {showHelp && (
        <div className="h-fit w-full px-4 pt-4">
          <div className="flex items-center gap-2 rounded-md bg-dust-0 px-4 py-2 text-cobble-0">
            <div className="flex w-1/12 items-center justify-center">
              <LightSvg />
            </div>
            <div className="w-11/12">
              <h3 className="text-xs font-semibold italic">
                You can change the Title here.
              </h3>
              <p className="text-xs font-semibold italic">
                To change the GIF, you need to delete this post and create a new
                one.
              </p>
            </div>
          </div>
        </div>
      )}
      <form
        action="addPost"
        onSubmit={formik.handleSubmit}
        className="flex h-full flex-col items-center justify-between"
      >
        <div className="m-auto transition-all">
          <img src={post?.gif_url} alt={post?.title} />
          <div className="h-12 w-full p-4">
            <input
              type="title"
              name="title"
              id="title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              placeholder="How do you feel ?"
              className="w-full rounded-md bg-dust-0 px-4 py-2 font-semibold placeholder:text-sm placeholder:font-normal placeholder:italic placeholder:text-black/50"
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
            onClick={() => setShowHelp(!showHelp)}
            className="flex h-10 w-2/12 items-center justify-center rounded-md bg-dust-0 py-2 text-sm font-semibold text-cobble-0"
          >
            <LightSvg />
          </button>
          <button
            type="submit"
            onSubmit={formik.handleSubmit}
            disabled={
              !addPostSchema.isValidSync(formik.values) ||
              formik.values.title.localeCompare(post.title) === 0
            }
            className="flex h-10 w-10/12 items-center justify-center rounded-md bg-red-800 py-2 text-sm font-semibold text-dust-0 disabled:bg-dust-0 disabled:text-cobble-0"
          >
            Edit
          </button>
        </div>
      </form>
    </div>
  );
}

EditPostModal.propTypes = {
  post: PropTypes.shape().isRequired,
  setIsShow: PropTypes.func.isRequired,
};
