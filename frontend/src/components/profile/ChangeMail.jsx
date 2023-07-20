import PropTypes from "prop-types";
import { useFormik } from "formik";
import { useUserContext } from "../../contexts/UserContext";
import DownSvg from "../svg/navigation/DownSvg";
import APIService from "../../services/APIService";
import { notifyError } from "../../services/toasts";
import { editMailSchema } from "../../services/validators";

export default function ChangeMail({ isShow, setIsShow }) {
  const { user, logout } = useUserContext();

  const formik = useFormik({
    initialValues: {
      email: user.email,
    },

    validationSchema: editMailSchema,

    onSubmit: async (values) => {
      try {
        const res = await APIService.put(`/users/${user.id}`, values);
        if (res) {
          logout();
        } else throw new Error();
      } catch (error) {
        if (error.request.status === 401) {
          notifyError("Email already taken.");
        }
      }
    },
  });

  return (
    <>
      <div className="flex w-full items-center justify-between px-6 py-1">
        <button
          type="button"
          onClick={() => setIsShow({ changeMail: !isShow.changeMail })}
          className="h-fit w-full"
        >
          <h3 className="text-left text-sm font-semibold text-cobble-0 dark:text-dust-0">
            Change my email
          </h3>
        </button>
        <button
          type="button"
          onClick={() => setIsShow({ changeMail: !isShow.changeMail })}
          className={
            isShow.changeMail
              ? "h-6 w-6 rotate-180 transition-all dark:text-dust-0"
              : "h-6 w-6 transition-all dark:text-dust-0"
          }
        >
          <DownSvg isShow={isShow} />
        </button>
      </div>
      {isShow.changeMail && (
        <form
          action="editMail"
          onSubmit={formik.handleSubmit}
          className="gap-4 space-y-4 px-6 pb-4 lg:gap-6 lg:space-y-6"
        >
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="mb-2 text-xs"
              style={
                formik.touched.email && formik.errors.email
                  ? { color: "rgb(239, 3, 3)" }
                  : { color: "black" }
              }
            >
              {formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""}
            </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              required=""
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full rounded-md px-4 py-2 font-semibold placeholder:text-sm placeholder:font-normal placeholder:italic placeholder:text-black/50 dark:bg-granite-0 dark:text-sand-0"
            />
            <p className="mt-1 text-center text-xs italic dark:text-dust-0">
              Please note that if you change your Email, you'll be disconnected
              and gonna need to Login back again.
            </p>
          </div>
          <button
            type="submit"
            onSubmit={formik.handleSubmit}
            disabled={
              !editMailSchema.isValidSync(formik.values) ||
              formik.values.email.localeCompare(user.email) === 0 ||
              formik.values.email === ""
            }
            className="h-fit w-full rounded-md bg-dust-0 bg-red-800 px-4 py-2 text-sm font-semibold text-white disabled:bg-gray-300 disabled:text-gray-800"
          >
            Modify
          </button>
        </form>
      )}
    </>
  );
}

ChangeMail.propTypes = {
  isShow: PropTypes.shape().isRequired,
  setIsShow: PropTypes.func.isRequired,
};
