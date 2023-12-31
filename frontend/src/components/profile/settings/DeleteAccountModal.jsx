import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../contexts/UserContext";
import { notifySuccess, notifyError } from "../../toasts/CustomToasts";
import APIService from "../../../services/APIService";

export default function DeleteAccountModal({ setIsShow }) {
  const { user, logout } = useUserContext();
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      const res = await APIService.delete(`/users/${user.id}`);
      if (res) {
        notifySuccess("Account deleted.");
        setIsShow(false);
        navigate("/");
        logout();
      }
      throw new Error();
    } catch (err) {
      if (err.request?.status === 404 || err.request?.status === 500) {
        notifyError("Oops, something went wrong.");
      }
    }
  };
  return (
    <div className="flex h-fit w-5/6 flex-col justify-center gap-4 rounded-md bg-dust-0 p-8 dark:bg-cobble-0 lg:w-fit">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-cobble-0 dark:text-dust-0 lg:text-xl">
          Are you sure ?
        </h2>
        <h3 className="text-xs font-normal italic dark:text-dust-0 lg:text-sm">
          (there is no possibility to get back your account once you've deleted
          it.)
        </h3>
      </div>
      <div className="flex h-fit items-center justify-center gap-4 lg:-mt-4">
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
          className="h-fit w-24 self-center rounded-md border-2 border-cobble-0 bg-cobble-0 py-2 text-sm font-semibold text-dust-0 shadow-lg transition-all hover:border-slate-300 hover:bg-slate-300 dark:border-granite-0 dark:bg-granite-0 dark:text-sand-0 lg:mt-8"
          onClick={() => setIsShow({ deleteModal: false })}
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
