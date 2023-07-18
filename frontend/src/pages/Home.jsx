import { useEffect, useState } from "react";
import APIService from "../services/APIService";
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
    <main className="bg-dust-0 min-h-screen w-screen flex flex-col justify-between font-inter mb-12">
      <ul className="w-full">
        {posts &&
          posts.map((post) => <PostBox data={post} key={post.post_id} />)}
      </ul>
    </main>
  );
}
