import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import storage from "../../../services/firebase";
import { notifyPromise, notifyError } from "../../toasts/CustomToasts";
import APIService from "../../../services/APIService";

export default function ChangeAvatar({
  profile,
  newAvatar,
  setNewAvatar,
  send,
  setSend,
}) {
  const [firebaseList, setFirebaseList] = useState(null);
  const [avatarLink, setAvatarLink] = useState(null);
  const [firebaseUpdated, setFirebaseUpdated] = useState(false);
  const navigate = useNavigate();

  // --- Dropzone logic --- //
  const handleDrop = useCallback((acceptedFiles) => {
    setNewAvatar(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maxFiles: 1,
    onDrop: handleDrop,
  });

  // --- Upload Logic --- //
  const firebaseImgListRef = ref(storage, "avatars/");

  // Get Firebase Storage avatar List
  useEffect(() => {
    listAll(firebaseImgListRef)
      .then((res) => {
        setFirebaseList(res.items);
      })
      .catch(() => notifyError("Oops, something went wrong with Firebase."));
  }, []);

  const handleUpload = async () => {
    // Won't accept Size over 1Mb
    if (newAvatar.size > 1000000) {
      notifyError("File too heavy, must be lighter than 1Mb.");
      setNewAvatar(null);
      return;
    }
    if (newAvatar === null) return;

    // If User's already have an Avatar, delete it from Firebase then Upload new one
    if (profile?.avatar && newAvatar) {
      const [firebaseAvatar] = firebaseList.filter((img) =>
        img._location.path_.includes(profile.username)
      );
      if (firebaseAvatar) {
        deleteObject(firebaseAvatar);
      }
    }

    const imageRef = ref(storage, `avatars/${uuidv4()}${profile.username}`);

    try {
      // Upload Img to Firebase Storage and get Link
      const uploadImg = await uploadBytes(imageRef, newAvatar);
      if (uploadImg) {
        const link = await getDownloadURL(uploadImg.ref);
        if (link) {
          setAvatarLink(link);
          setFirebaseUpdated(true);
        }
      } else throw new Error();
    } catch (error) {
      notifyError("Oops, something went wrong.");
    }
  };

  useEffect(() => {
    if (newAvatar && send) {
      notifyPromise(handleUpload());
    }
  }, [newAvatar, send]);

  // Now that our Avatar is uploaded on Firebase, let's store the link in our DB
  useEffect(() => {
    if (firebaseUpdated && newAvatar) {
      APIService.put(`/users-avatar/${profile.id}`, { avatarLink })
        .then(() => {
          setSend(false);
          navigate("/my-profile");
        })
        .catch((err) => {
          if (err.request?.status === 404 || err.request?.status === 500) {
            notifyError("Oops, something went wrong.");
          }
        });
    }
  }, [firebaseUpdated]);

  // Delete Avatar
  const deleteAvatar = async () => {
    try {
      const [firebaseAvatar] = firebaseList.filter((img) =>
        img._location.path_.includes(profile.username)
      );
      const deleteOnFirebase = await deleteObject(firebaseAvatar);
      if (deleteOnFirebase === undefined) {
        setAvatarLink(null);
        const deleteOnDatabase = await APIService.put(
          `/users-avatar/${profile.id}`,
          { avatarLink }
        );
        if (deleteOnDatabase) {
          navigate("/my-profile");
        } else throw new Error();
      } else throw new Error();
    } catch (err) {
      notifyError("Oops, something went wrong.");
    }
  };

  return (
    <>
      <div
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...getRootProps({
          className: `mx-auto flex h-28 w-28 lg:h-40 lg:w-40 items-center justify-center self-start rounded-full cursor-pointer ${
            profile?.avatar
              ? `bg-[url(${profile?.avatar})]`
              : "bg-cobble-0 text-5xl text-dust-0"
          }`,
        })}
        style={{
          backgroundImage: `url(${profile?.avatar})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <input
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...getInputProps()}
        />
        {!profile?.avatar && (
          <p>{profile?.username.slice(0, 1).toUpperCase()}</p>
        )}
      </div>
      <p className="mx-auto -mt-2 w-1/2 text-center text-xs italic">
        Click on your avatar to change it or{" "}
        <button
          type="button"
          aria-label="delete avatar"
          className="font-semibold text-red-800"
          onClick={() => deleteAvatar()}
        >
          on here
        </button>{" "}
        if you wanna delete it.
      </p>
    </>
  );
}

ChangeAvatar.propTypes = {
  profile: PropTypes.shape().isRequired,
  newAvatar: PropTypes.shape().isRequired,
  setNewAvatar: PropTypes.func.isRequired,
  send: PropTypes.bool.isRequired,
  setSend: PropTypes.func.isRequired,
};
