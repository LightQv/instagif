import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export default function AvatarPreview({ newAvatar, setNewAvatar, setSend }) {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    // Create a preview
    const objectUrl = URL.createObjectURL(newAvatar);
    setPreview(objectUrl);

    // Free memory whenever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, []);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 lg:w-fit">
      <img
        src={preview}
        alt="new-avatar"
        className="h-40 w-40 rounded-full object-cover lg:h-60 lg:w-60"
      />
      <div className="text-center">
        <h3 className="text-lg font-semibold text-dust-0 lg:text-xl">
          Change with this avatar ?
        </h3>
        <div className="my-4 -mt-1 flex h-full items-center justify-center gap-4 lg:-mt-4">
          <button
            type="button"
            className="h-fit w-24 self-center rounded-md border-2 border-red-800 bg-red-800 py-2 text-sm font-semibold text-dust-0 shadow-lg transition-all hover:border-red-300 hover:bg-red-300 lg:mt-8"
            onClick={() => setSend(true)}
          >
            Change
          </button>
          <button
            type="button"
            className="h-fit w-24 self-center rounded-md border-2 border-dust-0 bg-dust-0 py-2 text-sm font-semibold text-cobble-0 shadow-lg transition-all hover:border-slate-300 hover:bg-slate-300 lg:mt-8"
            onClick={() => setNewAvatar(null)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

AvatarPreview.propTypes = {
  newAvatar: PropTypes.shape().isRequired,
  setNewAvatar: PropTypes.func.isRequired,
  setSend: PropTypes.func.isRequired,
};
