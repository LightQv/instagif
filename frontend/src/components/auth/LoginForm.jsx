import PropTypes from "prop-types";
import { useFormik } from "formik";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import APIService from "../../services/APIService";
import { loginSchema } from "../../services/validators";
import { notifyError } from "../toasts/CustomToasts";
import SightSvg from "../svg/SightSvg";
import UnsightSvg from "../svg/UnsightSvg";

export default function LoginForm({ setForm }) {
  const { login } = useUserContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: loginSchema,

    onSubmit: async (values) => {
      try {
        const res = await APIService.post(`/login`, values);
        if (res) {
          login(res.data);
          navigate("/");
        } else throw new Error();
      } catch (err) {
        if (err.request.status === 401) {
          notifyError("Email or Password invalid.");
        }
      }
    },
  });

  useEffect(() => {
    if (searchParams.has("expired")) {
      notifyError("Session expired.");
      setSearchParams(() => {
        return undefined;
      });
    }
  }, []);

  return (
    <div className="flex flex-col justify-center p-6 dark:text-dust-0 lg:w-2/6 lg:rounded-md lg:bg-sand-0 lg:p-8 dark:lg:bg-granite-0">
      <form
        action="login"
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-4 lg:gap-5"
      >
        <h3 className="font-spartan text-2xl font-semibold">Login</h3>
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
            <h3>
              Password{" "}
              {formik.touched.password && formik.errors.password && (
                <span className="text-sm text-red-600">*</span>
              )}
            </h3>
            <button
              type="button"
              className="mr-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <SightSvg /> : <UnsightSvg />}
            </button>
          </label>
          <input
            type={showPassword ? "text" : "password"}
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
        <button
          type="submit"
          className="mt-2 h-fit w-full rounded-md bg-dust-0 bg-red-800 px-4 py-2 text-base font-semibold text-dust-0 disabled:bg-gray-300 disabled:text-gray-800"
          onSubmit={formik.handleSubmit}
          disabled={!loginSchema.isValidSync(formik.values)}
        >
          Login
        </button>
      </form>
      <div className="mt-4 flex w-full items-center justify-between">
        <button
          type="button"
          className="font-spartan text-sm underline underline-offset-8"
          onClick={() =>
            setForm({ login: false, register: true, forgotten: false })
          }
        >
          New user? Register
        </button>
        <button
          type="button"
          className="font-spartan text-sm"
          onClick={() =>
            setForm({ login: false, register: false, forgotten: true })
          }
        >
          Forgot password ?
        </button>
      </div>
    </div>
  );
}

LoginForm.propTypes = {
  setForm: PropTypes.func.isRequired,
};
