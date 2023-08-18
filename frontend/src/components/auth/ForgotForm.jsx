import PropTypes from "prop-types";
import { useFormik } from "formik";
import APIService from "../../services/APIService";
import { forgottenSchema } from "../../services/validators";
import notifySuccess, { notifyError } from "../../services/toasts";

export default function ForgotForm({ setForm }) {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgottenSchema,

    onSubmit: async (values) => {
      try {
        const res = await APIService.post(`/forgotten-password`, values);
        if (res) {
          notifySuccess("Email sent.");
        } else throw new Error();
      } catch (err) {
        if (err.request?.status === 500) {
          notifyError("Oops, something went wrong.");
        }
      }
    },
  });

  return (
    <div className="flex flex-col justify-center p-6 lg:w-2/6 lg:rounded-md lg:bg-sand-0 lg:p-8 dark:lg:bg-granite-0">
      <form
        action="register"
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-4 lg:gap-5"
      >
        <h3 className="font-spartan text-2xl font-semibold dark:text-dust-0">
          Forgot Password ?
        </h3>
        <h6 className="-mt-4 w-5/6 text-xs italic lg:-mt-6">
          Type your email and you'll receive an email with a link to reset your
          password.
        </h6>
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 ml-1 text-sm dark:text-dust-0">
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
            className="rounded-md px-4 py-2 placeholder:italic placeholder:opacity-50 dark:bg-cobble-0 dark:text-sand-0"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="ml-1 mt-2 text-sm text-red-600 transition-all">
              {formik.errors.email}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="mt-2 h-fit w-full rounded-md bg-dust-0 bg-red-800 px-4 py-2 text-base font-semibold text-dust-0 disabled:bg-gray-300 disabled:text-gray-800"
          onSubmit={formik.handleSubmit}
          disabled={!forgottenSchema.isValidSync(formik.values)}
        >
          Send
        </button>
      </form>
      <div className="mt-4 flex w-full items-center justify-between">
        <button
          type="button"
          className="font-spartan text-sm underline underline-offset-8 dark:text-dust-0"
          onClick={() => setForm({ login: true, register: false })}
        >
          Remember it? Login
        </button>
      </div>
    </div>
  );
}

ForgotForm.propTypes = {
  setForm: PropTypes.func.isRequired,
};
