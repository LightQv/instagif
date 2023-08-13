import { useEffect, useState } from "react";
import APIService from "../services/APIService";
import NotificationSvg from "../components/svg/interactions/NotificationSvg";
import PostBox from "../components/post/PostBox";
import { notifyError } from "../services/toasts";
import { useUserContext } from "../contexts/UserContext";
import { useThemeContext } from "../contexts/ThemeContext";
import logoDark from "../assets/images/logo-dark.png";
import logo from "../assets/images/logo.png";

export default function Home() {
  const { user } = useUserContext();
  const { theme } = useThemeContext();
  const [posts, setPosts] = useState(null);
  const [feedValue, setFeedValue] = useState(user.id ? "follow" : "all");

  // Fetch every posts if nobody's logged in
  // Fetch automatically followed users's posts when logged in
  useEffect(() => {
    if (feedValue === "all") {
      APIService.get("/posts")
        .then((res) => setPosts(res.data))
        .catch((err) => notifyError(`${err}: fetching posts`));
    }
    if (feedValue === "follow") {
      APIService.get(`/posts-followed/${user.id}`)
        .then((res) => setPosts(res.data))
        .catch((err) => notifyError(`${err}: fetching posts`));
    }
  }, [feedValue]);

  return (
    <main className="flex min-h-screen flex-col justify-between scroll-smooth bg-dust-0 pb-12 font-inter dark:bg-cobble-0 lg:pb-0 lg:pl-60">
      <header className="flex h-12 w-full items-center justify-between bg-dust-0 px-6 dark:bg-cobble-0 lg:mx-auto lg:w-2/5 lg:px-0 lg:pt-4">
        {!user.id && (
          <img
            src={theme === "dark" ? logoDark : logo}
            alt="logo"
            className="m-auto h-full"
          />
        )}
        {user.id && (
          <>
            <select
              className="flex h-full w-fit items-center bg-dust-0 font-semibold dark:bg-cobble-0"
              defaultValue={user.id ? "follow" : "all"}
              onChange={(e) => setFeedValue(e.target.value)}
            >
              <option value="all">World</option>
              <option value="follow">For you</option>
            </select>
            <div className="lg:hidden">
              <NotificationSvg />
            </div>
          </>
        )}
      </header>
      <ul className="flex flex-col lg:w-2/5 lg:gap-4 lg:self-center">
        {posts && posts.map((post) => <PostBox post={post} key={post.id} />)}
      </ul>
    </main>
  );
}
