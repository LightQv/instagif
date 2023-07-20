import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import notifySuccess, { notifyError } from "../../services/toasts";
import APIService from "../../services/APIService";

export default function DeleteAccountModal({ setIsShow }) {
  const { user, logout } = useUserContext();
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      const res = await APIService.delete(`/users/${user.id}`);
      if (res) {
        notifySuccess("Your account have been successfully deleted.");
        setIsShow(false);
        navigate("/");
        logout();
      }
      throw new Error();
    } catch (err) {
      if (err.request?.status === 500) {
        notifyError("Error deleting your post.");
      }
    }
  };
  return (
    <div className="flex h-fit w-5/6 flex-col justify-center gap-4 rounded-md bg-dust-0 p-8 lg:w-fit">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-cobble-0 lg:text-xl">
          Are you sure ?
        </h3>
        <h5 className="text-xs font-normal italic lg:text-sm">
          (there is no possibility to get back your account once you've deleted
          it.)
        </h5>
      </div>
      <div className="flex h-fit items-center justify-center gap-4 lg:-mt-4">
        <button
          type="button"
          className="h-fit w-24 self-center rounded-md border-2 border-red-800 bg-red-800 py-2 text-sm font-semibold text-dust-0 shadow-lg transition-all hover:border-red-300 hover:bg-red-300 lg:mt-8"
          onClick={handleDelete}
        >
          Yes
        </button>
        <button
          type="button"
          className="h-fit w-24 self-center rounded-md border-2 border-cobble-0 bg-cobble-0 py-2 text-sm font-semibold text-dust-0 shadow-lg transition-all hover:border-slate-300 hover:bg-slate-300 lg:mt-8"
          onClick={() => setIsShow(false)}
        >
          No
        </button>
      </div>
    </div>
  );
}

DeleteAccountModal.propTypes = {
  setIsShow: PropTypes.func.isRequired,
};
