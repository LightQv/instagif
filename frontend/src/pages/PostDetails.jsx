import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import APIService from "../services/APIService";
import BackSvg from "../components/svg/navigation/BackSvg";
import NotificationSvg from "../components/svg/interactions/NotificationSvg";
import PostBox from "../components/post/PostBox";
import { notifyError } from "../components/toasts/CustomToasts";
import { useUserContext } from "../contexts/UserContext";
import EditPostModal from "../components/create/EditPostModal";
import DeletePostModal from "../components/create/DeletePostModal";

export default function PostDetails() {
  const { id } = useParams();
  const { user } = useUserContext();
  const [post, setPost] = useState(null);
  const [isShow, setIsShow] = useState({
    editModal: false,
    deleteModal: false,
  });
  const [showEmojis, setShowEmojis] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    APIService.get(`/posts/${id}`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        if (err.request?.status === 500) {
          notifyError("Oops, something went wrong.");
        }
      });
  }, [isShow]);

  return (
    <main
      className={`flex min-h-screen flex-col justify-start bg-dust-0 pb-12 font-inter dark:bg-cobble-0 lg:justify-center lg:pb-0 lg:pl-60 ${
        showEmojis ? "mb-[60dvh] lg:mb-0" : ""
      }`}
    >
      <header className="flex h-12 w-full items-center justify-between bg-dust-0 px-6 dark:bg-cobble-0 lg:hidden">
        <button type="button" aria-label="back" onClick={() => navigate(-1)}>
          <BackSvg />
        </button>
        <NotificationSvg />
      </header>
      {post?.user_id === user.id && (
        <div className="my-4 flex gap-2 px-4 lg:w-2/6 lg:self-center">
          <button
            type="button"
            aria-label="edit"
            className="h-10 w-full rounded-md bg-cobble-0 py-1 text-sm font-semibold text-dust-0 transition-all hover:scale-[1.03] hover:bg-granite-0 dark:bg-granite-0 dark:text-sand-0"
            onClick={() => setIsShow({ editModal: true })}
          >
            Edit
          </button>
          <button
            type="button"
            aria-label="delete"
            className="h-10 w-full rounded-md bg-cobble-0 py-1 text-sm font-semibold text-dust-0 transition-all hover:scale-[1.03] hover:bg-granite-0 dark:bg-granite-0 dark:text-sand-0"
            onClick={() => setIsShow({ deleteModal: true })}
          >
            Delete
          </button>
        </div>
      )}
      <ul className="flex flex-col gap-4 lg:w-3/5 lg:self-center">
        {post && (
          <PostBox
            post={post}
            key={post.id}
            showEmojis={showEmojis}
            setShowEmojis={setShowEmojis}
          />
        )}
      </ul>
      <div
        className={
          isShow.editModal || isShow.deleteModal
            ? "fixed left-0 top-0 z-20 flex min-h-screen min-w-full items-center justify-center bg-black/90"
            : "hidden"
        }
      >
        {isShow.editModal && (
          <EditPostModal post={post} setIsShow={setIsShow} />
        )}
        {isShow.deleteModal && (
          <DeletePostModal post={post} setIsShow={setIsShow} />
        )}
      </div>
    </main>
  );
}
