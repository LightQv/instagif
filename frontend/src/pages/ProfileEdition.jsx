import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import BackSvg from "../components/svg/navigation/BackSvg";
import APIService from "../services/APIService";
import { editProfileSchema } from "../services/validators";
import {
  notifyDuplicate,
  notifyError,
} from "../components/toasts/CustomToasts";
import ChangeAvatar from "../components/profile/edit/ChangeAvatar";
import AvatarPreview from "../components/profile/edit/AvatarPreview";

export default function ProfileEdition() {
  const { user, logout } = useUserContext();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [newAvatar, setNewAvatar] = useState(null);
  const [send, setSend] = useState(false);

  useEffect(() => {
    APIService.get(`/users/${user.username}`)
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        if (err.request?.status === 500) {
          notifyError("Oops, something went wrong.");
        }
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      username: user.username,
    },

    validationSchema: editProfileSchema,

    onSubmit: async (values) => {
      try {
        const res = await APIService.put(`/users-profile/${user.id}`, values);
        if (res) {
          logout();
        } else throw new Error();
      } catch (error) {
        if (error.request.status === 401) {
          notifyDuplicate("Username already taken.");
        }
      }
    },
  });

  return (
    <main className="flex min-h-screen flex-col justify-start bg-dust-0 pb-12 font-inter dark:bg-cobble-0 lg:mb-0 lg:pb-0 lg:pl-60">
      <header className="flex h-12 w-full items-center justify-between px-6 dark:text-dust-0 lg:hidden">
        <div className="h-fit w-full">
          <button
            type="button"
            className="float-left transition-all hover:scale-110 hover:text-granite-0"
            onClick={() => navigate(-1)}
          >
            <BackSvg />
          </button>
          <h1 className="mr-6 text-center font-spartan text-xl font-semibold">
            Edit Profile
          </h1>
        </div>
      </header>
      <div className="flex flex-col lg:w-2/5 lg:self-center">
        <div className="flex w-full flex-col gap-4 py-4 dark:text-dust-0">
          <ChangeAvatar
            profile={profile}
            newAvatar={newAvatar}
            setNewAvatar={setNewAvatar}
            send={send}
            setSend={setSend}
          />
        </div>
        <form
          action="editUsername"
          onSubmit={formik.handleSubmit}
          className="gap-4 space-y-4 p-4 lg:gap-6 lg:space-y-6"
        >
          <div className="flex flex-col">
            <label
              htmlFor="username"
              className="mb-2 ml-1 text-sm dark:text-dust-0"
            >
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
              className="rounded-md px-4 py-2 placeholder:italic placeholder:opacity-50 dark:bg-granite-0 dark:text-sand-0"
            />
            {formik.touched.username && formik.errors.username && (
              <p className="ml-1 mt-2 text-sm text-red-600 transition-all">
                {formik.errors.username}
              </p>
            )}
            <p className="mt-2 text-center text-xs italic dark:text-dust-0">
              Please note that if you change your Username, you'll be
              disconnected.
            </p>
          </div>
          <button
            type="submit"
            onSubmit={formik.handleSubmit}
            disabled={
              !editProfileSchema.isValidSync(formik.values) ||
              formik.values.username.localeCompare(user.username) === 0
            }
            className="h-fit w-full rounded-md bg-dust-0 bg-red-800 px-4 py-2 text-sm font-semibold text-white disabled:bg-gray-300 disabled:text-gray-800"
          >
            Change Username
          </button>
        </form>
      </div>
      <div
        className={
          newAvatar
            ? "fixed left-0 top-0 z-20 flex min-h-screen min-w-full items-center justify-center bg-black/90"
            : "hidden"
        }
      >
        {newAvatar && (
          <AvatarPreview
            newAvatar={newAvatar}
            setNewAvatar={setNewAvatar}
            setSend={setSend}
          />
        )}
      </div>
    </main>
  );
}
