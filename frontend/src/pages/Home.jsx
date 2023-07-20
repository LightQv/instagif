import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import APIService from "../services/APIService";
import logo from "../assets/images/logo.jpg";
import NotificationSvg from "../components/svg/NotificationSvg";
import PostBox from "../components/PostBox";
import { notifyError } from "../services/toasts";

export default function Home() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    APIService.get("/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => notifyError(`${err}: fetching posts`));
  }, []);

  return (
    <main className="flex min-h-screen flex-col justify-between bg-dust-0 pb-12 font-inter lg:pb-0 lg:pt-16">
      <header className="flex h-12 w-full items-center justify-between bg-dust-0 px-6 lg:hidden">
        <Link to="/" className="flex h-full w-full items-center">
          <img src={logo} alt="logo" className="h-[90%]" />
        </Link>
        <NotificationSvg />
      </header>
      <ul className="flex flex-col gap-4 lg:w-2/6 lg:self-center">
        {posts &&
          posts.map((post) => <PostBox data={post} key={post.post_id} />)}
      </ul>
    </main>
  );
}
