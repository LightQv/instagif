import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { notifySuccess, notifyError } from "../toasts/CustomToasts";
import APIService from "../../services/APIService";

export default function DeletePostModal({ post, setIsShow }) {
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      const res = await APIService.delete(`/posts/${post.id}`);
      if (res) {
        notifySuccess("Post deleted.");
        setIsShow({ modalDelete: false });
        navigate("/");
      }
      throw new Error();
    } catch (err) {
      if (err.request?.status === 404 || err.request?.status === 500) {
        notifyError("Oops, something went wrong.");
      }
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col justify-between rounded-lg lg:w-fit">
      <div className="m-auto text-center">
        <h1 className="text-lg font-semibold text-dust-0 lg:text-xl">
          Are you sure ?
        </h1>
        <div className="my-4 -mt-1 flex h-full items-center justify-center gap-4 lg:-mt-4">
          <button
            type="button"
            aria-label="delete"
            className="h-fit w-24 self-center rounded-md border-2 border-red-800 bg-red-800 py-2 text-sm font-semibold text-dust-0 shadow-lg transition-all hover:border-red-300 hover:bg-red-300 lg:mt-8"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            type="button"
            aria-label="cancel"
            className="h-fit w-24 self-center rounded-md border-2 border-dust-0 bg-dust-0 py-2 text-sm font-semibold text-cobble-0 shadow-lg transition-all hover:border-slate-300 hover:bg-slate-300 lg:mt-8"
            onClick={() => setIsShow({ deleteModal: false })}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

DeletePostModal.propTypes = {
  post: PropTypes.shape().isRequired,
  setIsShow: PropTypes.func.isRequired,
};
