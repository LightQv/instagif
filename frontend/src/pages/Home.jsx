import { useEffect, useState } from "react";
import APIService from "../services/APIService";
import NotificationSvg from "../components/svg/interactions/NotificationSvg";
import PostBox from "../components/post/PostBox";
import { notifyError } from "../services/toasts";
import { useUserContext } from "../contexts/UserContext";
import { useThemeContext } from "../contexts/ThemeContext";
import logoDark from "../assets/images/logo-dark.png";
import logo from "../assets/images/logo.png";
import SuggestionBox from "../components/SuggestionBox";

export default function Home() {
  const { user } = useUserContext();
  const { theme } = useThemeContext();
  const [posts, setPosts] = useState(null);
  const [feedValue, setFeedValue] = useState(user.id ? "follow" : "all");
  const [sendFollow, setSendFollow] = useState(false);

  // Fetch every posts if nobody's logged in
  // Fetch automatically users's followed posts when logged in
  const fetchPosts = async () => {
    try {
      if (feedValue === "all") {
        const allPosts = await APIService.get("/posts");
        if (allPosts) {
          setPosts(allPosts.data);
        } else throw new Error();
      }
      if (feedValue === "follow") {
        const followPosts = await APIService.get(`/posts-followed/${user.id}`);
        if (followPosts) {
          setPosts(followPosts.data);
        } else throw new Error();
      }
    } catch (err) {
      if (err.request?.status === 500) {
        notifyError("Oops, something went wrong.");
      }
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [feedValue, sendFollow]);

  return (
    <main className="flex min-h-screen flex-col justify-start scroll-smooth bg-dust-0 pb-12 font-inter dark:bg-cobble-0 lg:pb-0 lg:pl-60">
      <header
        className={`flex h-12 w-full items-center justify-between bg-dust-0 px-6 dark:bg-cobble-0 lg:mx-auto lg:w-fit lg:self-center lg:px-0 lg:pt-4 ${
          !user.id && "lg:hidden"
        }`}
      >
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
              className="flex h-full w-fit items-center bg-dust-0 font-semibold dark:bg-cobble-0 dark:text-dust-0"
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
      <div className="w-full gap-8 lg:flex lg:justify-center">
        <ul className="flex flex-col lg:w-2/5 lg:gap-4 lg:self-center">
          {posts && posts.length > 0 ? (
            posts.map((post) => <PostBox post={post} key={post.id} />)
          ) : (
            <p className="my-auto px-6 text-center text-sm italic">{`${
              feedValue === "all"
                ? "Nobody posted anything yet."
                : "Users you're following haven't posted anything yet. Switch to World section to discover other user's feelings."
            }`}</p>
          )}
        </ul>
        {user.id && (
          <SuggestionBox
            sendFollow={sendFollow}
            setSendFollow={setSendFollow}
          />
        )}
      </div>
    </main>
  );
}
