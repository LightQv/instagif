import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import APIService from "../services/APIService";
import BackSvg from "../components/svg/BackSvg";
import NotificationSvg from "../components/svg/NotificationSvg";
import PostBox from "../components/PostBox";
import { notifyError } from "../services/toasts";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    APIService.get(`/posts/${id}`)
      .then((res) => setPost(res.data))
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
      <ul className="flex flex-col gap-4 lg:w-2/6 lg:self-center">
        {post && <PostBox data={post} key={post.post_id} />}
      </ul>
    </main>
  );
}
