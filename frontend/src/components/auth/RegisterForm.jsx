import PropTypes from "prop-types";
import { useFormik } from "formik";
import { useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import { useThemeContext } from "../../contexts/ThemeContext";
import APIService from "../../services/APIService";
import { registerSchema } from "../../services/validators";
import notifySuccess, { notifyError } from "../../services/toasts";
import SightSvg from "../svg/SightSvg";
import UnsightSvg from "../svg/UnsightSvg";

export default function RegisterForm({ setForm }) {
  const { login } = useUserContext();
  const { theme } = useThemeContext();
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
        const res = await APIService.post(`/users`, values);
        if (res) {
          login(res.data);
          notifySuccess("Account created, please Login");
          setForm({ login: true, register: false });
        } else throw new Error();
      } catch (error) {
        if (
          error.request.status === 422 &&
          error.response.data.validationErrors[0].context.key === "email"
        ) {
          notifyError("This email is already taken.");
        }
        if (error.request.status === 500) {
          notifyError("This username is already taken.");
        }
      }
    },
  });
  return (
    <div className="flex flex-col justify-center p-6 lg:w-2/6 lg:rounded-md lg:bg-sand-0 lg:p-8 dark:lg:bg-granite-0">
      <form
        action="register"
        onSubmit={formik.handleSubmit}
        className="gap-4 space-y-4 lg:gap-6 lg:space-y-6"
      >
        <h3 className="font-spartan text-2xl font-semibold dark:text-dust-0">
          Register
        </h3>
        <div className="flex flex-col">
          <label
            htmlFor="username"
            className="mb-2 ml-1 text-sm"
            style={
              formik.touched.username && formik.errors.username
                ? { color: "rgb(239, 3, 3)" }
                : { color: theme === "dark" ? "#f1efe7" : "black" }
            }
          >
            {formik.touched.username && formik.errors.username
              ? formik.errors.username
              : "Username"}
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            required=""
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="rounded-md px-4 py-2 placeholder:italic placeholder:opacity-50 dark:bg-cobble-0 dark:text-sand-0"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="mb-2 ml-1 text-sm"
            style={
              formik.touched.email && formik.errors.email
                ? { color: "rgb(239, 3, 3)" }
                : { color: theme === "dark" ? "#f1efe7" : "black" }
            }
          >
            {formik.touched.email && formik.errors.email
              ? formik.errors.email
              : "Email"}
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
            className="rounded-md px-4 py-2 placeholder:italic placeholder:opacity-50 dark:bg-cobble-0 dark:text-sand-0"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="mb-2 ml-1 flex w-full items-center justify-between text-sm"
          >
            <h3
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
            className="rounded-md px-4 py-2 placeholder:italic placeholder:opacity-50 dark:bg-cobble-0 dark:text-sand-0"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="confirmPassword"
            className="mb-2 ml-1 flex w-full items-center justify-between text-sm"
          >
            <h3
              style={
                formik.touched.confirmPassword && formik.errors.confirmPassword
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
            className="mb-2 rounded-md px-4 py-2 placeholder:italic placeholder:opacity-50 dark:bg-cobble-0 dark:text-sand-0"
          />
        </div>
        <button
          type="submit"
          className="h-fit w-full rounded-md bg-dust-0 bg-red-800 px-4 py-2 text-base font-semibold text-white disabled:bg-gray-300 disabled:text-gray-800"
          onSubmit={formik.handleSubmit}
          disabled={!registerSchema.isValidSync(formik.values)}
        >
          Register
        </button>
      </form>
      <h4 className="mt-6 self-center font-spartan text-sm italic dark:text-dust-0">
        You already have an account,{" "}
        <button
          type="button"
          className="font-semibold text-red-800"
          onClick={() => setForm({ login: true, register: false })}
        >
          Login here
        </button>
        .
      </h4>
    </div>
  );
}

RegisterForm.propTypes = {
  setForm: PropTypes.func.isRequired,
};
