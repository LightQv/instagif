import PropTypes from "prop-types";
import { useFormik } from "formik";
import { useState } from "react";
import { useUserContext } from "../../../contexts/UserContext";
import DownSvg from "../../svg/navigation/DownSvg";
import SightSvg from "../../svg/SightSvg";
import UnsightSvg from "../../svg/UnsightSvg";
import APIService from "../../../services/APIService";
import { notifySuccess, notifyError } from "../../toasts/CustomToasts";
import { editPwSchema } from "../../../services/validators";

export default function ChangeMail({ isShow, setIsShow }) {
  const { user, logout } = useUserContext();
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
          notifySuccess("Password modified.");
          logout();
        } else throw new Error();
      } catch (err) {
        if (err.request?.status === 404 || err.request?.status === 500) {
          notifyError("Oops, something went wrong.");
        }
      }
    },
  });

  return (
    <>
      <div className="flex w-full items-center justify-between px-6 py-1 dark:text-dust-0">
        <button
          type="button"
          aria-label="change password"
          onClick={() => setIsShow({ changePw: !isShow.changePw })}
          className="h-fit w-full"
        >
          <h2 className="text-left text-sm font-semibold text-cobble-0 dark:text-dust-0">
            Change Password
          </h2>
        </button>
        <button
          type="button"
          aria-label="show more"
          onClick={() => setIsShow({ changePw: !isShow.changePw })}
          className={
            isShow.changePw
              ? "h-6 w-6 rotate-180 transition-all"
              : "h-6 w-6 transition-all"
          }
        >
          <DownSvg isShow={isShow} />
        </button>
      </div>
      {isShow.changePw && (
        <form
          action="editMail"
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 px-6 pb-4 dark:text-dust-0 lg:gap-5"
        >
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="mb-2 flex w-full items-center justify-between text-xs lg:text-sm"
            >
              Password{" "}
              {formik.touched.password && formik.errors.password && (
                <span className="text-sm text-red-600">*</span>
              )}
              <button
                type="button"
                aria-label="show password"
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
              className="rounded-md px-4 py-2 placeholder:italic placeholder:opacity-50 dark:bg-granite-0 dark:text-sand-0"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="ml-1 mt-2 text-sm text-red-600 transition-all">
                {formik.errors.password}
              </p>
            )}
            <label
              htmlFor="confirmPassword"
              className="mb-2 mt-4 flex w-full items-center justify-between text-xs lg:text-sm"
            >
              Confirm Password{" "}
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <span className="text-sm text-red-600">*</span>
                )}
              <button
                type="button"
                aria-label="show password"
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
              className="rounded-md px-4 py-2 placeholder:italic placeholder:opacity-50 dark:bg-granite-0 dark:text-sand-0"
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="ml-1 mt-2 text-sm text-red-600 transition-all">
                  {formik.errors.confirmPassword}
                </p>
              )}
            <p className="mt-2 text-center text-xs italic">
              Please note that if you change your Password, you'll be
              disconnected.
            </p>
          </div>
          <button
            type="submit"
            aria-label="submit"
            onSubmit={formik.handleSubmit}
            disabled={!editPwSchema.isValidSync(formik.values)}
            className="h-fit w-full rounded-md bg-dust-0 bg-red-800 px-4 py-2 text-sm font-semibold text-white disabled:bg-gray-300 disabled:text-gray-800"
          >
            Change Password
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
