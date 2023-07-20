import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import APIService from "../services/APIService";
import BackSvg from "../components/svg/BackSvg";
import NotificationSvg from "../components/svg/NotificationSvg";
import PostBox from "../components/PostBox";
import { notifyError } from "../services/toasts";
import { useUserContext } from "../contexts/UserContext";
import EditPostModal from "../components/post/EditPostModal";
import DeletePostModal from "../components/post/DeletePostModal";

export default function PostDetails() {
  const { id } = useParams();
  const { user } = useUserContext();
  const [post, setPost] = useState(null);
  const [isShow, setIsShow] = useState({
    editModal: false,
    deleteModal: false,
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    APIService.get(`/posts/${id}`)
      .then((res) => {
        setPost(res.data);
        setLoading(true);
      })
      .catch((err) => notifyError(`${err}: fetching posts`));
  }, []);

  return (
    <main className="flex min-h-screen flex-col justify-start bg-dust-0 pb-12 font-inter lg:justify-center lg:pb-0 lg:pt-16">
      <header className="flex h-12 w-full items-center justify-between bg-dust-0 px-6 lg:hidden">
        <button type="button" onClick={() => navigate(-1)}>
          <BackSvg />
        </button>
        <NotificationSvg />
      </header>
      {post?.user_id === user.id && (
        <div className="my-4 flex gap-2 px-4 lg:w-2/6 lg:self-center">
          <button
            type="button"
            className="h-fit w-full rounded-md bg-cobble-0 py-1 text-sm font-semibold text-dust-0"
            onClick={() => setIsShow({ editModal: true })}
          >
            Edit
          </button>
          <button
            type="button"
            className="h-fit w-full rounded-md bg-cobble-0 py-1 text-sm font-semibold text-dust-0"
            onClick={() => setIsShow({ deleteModal: true })}
          >
            Delete
          </button>
        </div>
      )}
      <ul className="flex flex-col gap-4 lg:w-2/6 lg:self-center">
        {post && (
          <PostBox
            data={post}
            key={post.post_id}
            loading={loading}
            setLoading={setLoading}
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
