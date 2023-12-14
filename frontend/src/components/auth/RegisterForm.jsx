import PropTypes from "prop-types";
import { useFormik } from "formik";
import { useState } from "react";
import APIService from "../../services/APIService";
import { registerSchema } from "../../services/validators";
import {
  notifySuccess,
  notifyDuplicate,
  notifyError,
} from "../toasts/CustomToasts";
import SightSvg from "../svg/SightSvg";
import UnsightSvg from "../svg/UnsightSvg";

export default function RegisterForm({ setForm }) {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,

    onSubmit: async (values) => {
      try {
        const res = await APIService.post(`/register`, values);
        if (res) {
          notifySuccess("Account created.");
          setForm({ login: true, register: false });
        } else throw new Error();
      } catch (err) {
        if (err.request.status === 400) {
          notifyDuplicate("Username or Email already taken.");
        }
        if (err.request.status === 500) {
          notifyError("Oops, something went wrong.");
        }
      }
    },
  });
  return (
    <div className="flex flex-col justify-center p-6 dark:text-dust-0 lg:w-2/6 lg:rounded-md lg:bg-sand-0 lg:p-8 dark:lg:bg-granite-0">
      <form
        action="register"
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-4 lg:gap-5"
      >
        <h1 className="font-spartan text-2xl font-semibold">Register</h1>
        <div className="flex flex-col">
          <label htmlFor="username" className="mb-2 ml-1 text-sm">
            Username{" "}
            {formik.touched.username && formik.errors.username && (
              <span className="text-sm text-red-600">*</span>
            )}
          </label>
          <input
            type="username"
            name="username"
            id="username"
            placeholder="Username"
            required=""
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="rounded-md px-4 py-2 placeholder:italic placeholder:opacity-50 dark:bg-granite-0 dark:text-sand-0 lg:dark:bg-cobble-0"
          />
          {formik.touched.username && formik.errors.username && (
            <p className="ml-1 mt-2 text-sm text-red-600 transition-all">
              {formik.errors.username}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 ml-1 text-sm">
            Email{" "}
            {formik.touched.email && formik.errors.email && (
              <span className="text-sm text-red-600">*</span>
            )}
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="example@mail.com"
            required=""
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="rounded-md px-4 py-2 placeholder:italic placeholder:opacity-50 dark:bg-granite-0 dark:text-sand-0 lg:dark:bg-cobble-0"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="ml-1 mt-2 text-sm text-red-600 transition-all">
              {formik.errors.email}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="mb-2 ml-1 flex w-full items-center justify-between text-sm"
          >
            Password{" "}
            {formik.touched.password && formik.errors.password && (
              <span className="text-sm text-red-600">*</span>
            )}
            <button
              type="button"
              aria-label="show password"
              className="mr-2"
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
            className="rounded-md px-4 py-2 placeholder:italic placeholder:opacity-50 dark:bg-granite-0 dark:text-sand-0 lg:dark:bg-cobble-0"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="ml-1 mt-2 text-sm text-red-600 transition-all">
              {formik.errors.password}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="confirmPassword"
            className="mb-2 ml-1 flex w-full items-center justify-between text-sm"
          >
            Confirm Password{" "}
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <span className="text-sm text-red-600">*</span>
              )}
            <button
              type="button"
              aria-label="show password"
              className="mr-2"
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
            className="rounded-md px-4 py-2 placeholder:italic placeholder:opacity-50 dark:bg-granite-0 dark:text-sand-0 lg:dark:bg-cobble-0"
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="ml-1 mt-2 text-sm text-red-600 transition-all">
              {formik.errors.confirmPassword}
            </p>
          )}
        </div>
        <button
          type="submit"
          aria-label="submit"
          className="mt-2 h-fit w-full rounded-md bg-dust-0 bg-red-800 px-4 py-2 text-base font-semibold text-dust-0 disabled:bg-gray-300 disabled:text-gray-800"
          onSubmit={formik.handleSubmit}
          disabled={!registerSchema.isValidSync(formik.values)}
        >
          Register
        </button>
      </form>
      <div className="mt-4 flex w-full items-center justify-between">
        <button
          type="button"
          aria-label="go login"
          className="font-spartan text-sm underline underline-offset-8"
          onClick={() =>
            setForm({ login: true, register: false, forgotten: false })
          }
        >
          Already an account? Login
        </button>
      </div>
    </div>
  );
}

RegisterForm.propTypes = {
  setForm: PropTypes.func.isRequired,
};
