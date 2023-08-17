import PropTypes from "prop-types";
import { useFormik } from "formik";
import { useState } from "react";
import { useUserContext } from "../../../contexts/UserContext";
import DownSvg from "../../svg/navigation/DownSvg";
import SightSvg from "../../svg/SightSvg";
import UnsightSvg from "../../svg/UnsightSvg";
import APIService from "../../../services/APIService";
import notifySuccess, { notifyError } from "../../../services/toasts";
import { editPwSchema } from "../../../services/validators";
import { useThemeContext } from "../../../contexts/ThemeContext";

export default function ChangeMail({ isShow, setIsShow }) {
  const { user, logout } = useUserContext();
  const { theme } = useThemeContext();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },

    validationSchema: editPwSchema,

    onSubmit: async (values) => {
      try {
        const res = await APIService.put(`/users-pw/${user.id}`, values);
        if (res) {
          notifySuccess("Password successfully changed.");
          logout();
        } else throw new Error();
      } catch (error) {
        if (error.request.status === 401) {
          notifyError("Error, please try again.");
        }
      }
    },
  });

  return (
    <>
      <div className="flex w-full items-center justify-between px-6 py-1">
        <button
          type="button"
          onClick={() => setIsShow({ changePw: !isShow.changePw })}
          className="h-fit w-full"
        >
          <h3 className="text-left text-sm font-semibold text-cobble-0 dark:text-dust-0">
            Change password
          </h3>
        </button>
        <button
          type="button"
          onClick={() => setIsShow({ changePw: !isShow.changePw })}
          className={
            isShow.changePw
              ? "h-6 w-6 rotate-180 transition-all dark:text-dust-0"
              : "h-6 w-6 transition-all dark:text-dust-0"
          }
        >
          <DownSvg isShow={isShow} />
        </button>
      </div>
      {isShow.changePw && (
        <form
          action="editMail"
          onSubmit={formik.handleSubmit}
          className="gap-4 space-y-4 px-6 pb-4 lg:gap-6 lg:space-y-6"
        >
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="mb-2 flex w-full items-center justify-between text-xs lg:text-sm"
            >
              <h3
                className="ml-1"
                style={
                  formik.touched.password && formik.errors.password
                    ? { color: "rgb(239, 3, 3)" }
                    : { color: theme === "dark" ? "#f1efe7" : "black" }
                }
              >
                {formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : "Password"}
              </h3>
              <button
                type="button"
                className="mr-1"
                onClick={() =>
                  setShowPassword({
                    ...showPassword,
                    password: !showPassword.password,
                  })
                }
              >
                {showPassword.password ? <SightSvg /> : <UnsightSvg />}
              </button>
            </label>
            <input
              type={showPassword.password ? "text" : "password"}
              name="password"
              id="password"
              placeholder="••••••••"
              required=""
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mb-4 rounded-md px-4 py-2 placeholder:italic placeholder:opacity-50 dark:bg-cobble-0 dark:text-sand-0"
            />
            <label
              htmlFor="confirmPassword"
              className="mb-2 flex w-full items-center justify-between text-xs lg:text-sm"
            >
              <h3
                className="ml-1"
                style={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? { color: "rgb(239, 3, 3)" }
                    : { color: theme === "dark" ? "#f1efe7" : "black" }
                }
              >
                {formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? formik.errors.confirmPassword
                  : "Confirm Password"}
              </h3>
              <button
                type="button"
                className="mr-1"
                onClick={() =>
                  setShowPassword({
                    ...showPassword,
                    confirmPassword: !showPassword.confirmPassword,
                  })
                }
              >
                {showPassword.confirmPassword ? <SightSvg /> : <UnsightSvg />}
              </button>
            </label>
            <input
              type={showPassword.confirmPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              placeholder="••••••••"
              required=""
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="rounded-md px-4 py-2 placeholder:italic placeholder:opacity-50 dark:bg-cobble-0 dark:text-sand-0"
            />
            <p className="mt-1 text-center text-xs italic dark:text-dust-0">
              Please note that if you change your Password, you'll be
              disconnected and gonna need to Login back again.
            </p>
          </div>
          <button
            type="submit"
            onSubmit={formik.handleSubmit}
            disabled={
              !editPwSchema.isValidSync(formik.values) ||
              formik.values.password === ""
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
