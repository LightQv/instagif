import toast, { Toaster } from "react-hot-toast";

export default function CustomToasts() {
  return (
    <Toaster
      toastOptions={{
        success: {
          className:
            "bg-dust-0 text-cobble-0 text-sm font-semibold dark:bg-granite-0 dark:text-dust-0",
        },
        error: {
          className: "bg-red-800 text-dust-0 text-sm font-semibold",
          iconTheme: {
            primary: "#f7f5f5",
            secondary: "#991B1B",
          },
        },
        position: "top-right",
        duration: 2000,
      }}
    />
  );
}

// Toast Success
export const notifySuccess = (message) => {
  toast.success(message, { id: "success" });
};

// Toast Promise
export const notifyPromise = (promise) => {
  toast.promise(
    promise,
    {
      loading: "Uploading...",
      success: <p className="">Done!</p>,
      error: <p>Oops, something went wrong.</p>,
    },
    {
      className:
        "bg-dust-0 text-cobble-0 text-sm font-semibold dark:bg-granite-0 dark:text-dust-0",
    }
  );
};

// Toast Warning
export const notifyDuplicate = (message) =>
  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } pointer-events-auto flex h-12 w-fit max-w-[350px] items-center justify-center gap-2 rounded-lg bg-amber-500 px-[10px] py-2 text-sm font-semibold leading-snug text-dust-0 shadow-toast`}
      >
        <span className="h-6 w-6 rounded-full bg-dust-0 text-center text-base text-amber-500">
          !
        </span>
        <p>{message}</p>
      </div>
    ),
    { id: "duplicate", icon: "!" }
  );

// Toast Error
export const notifyError = (message) => toast.error(message, { id: "error" });
