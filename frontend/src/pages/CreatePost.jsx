import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useUserContext } from "../contexts/UserContext";
import BackSvg from "../components/svg/navigation/BackSvg";
import { notifyError } from "../services/toasts";
import GifInsight from "../components/create/GifInsight";
import ActiveFireSvg from "../components/svg/ActiveFireSvg";
import FireSvg from "../components/svg/FireSvg";
import CreatePostModal from "../components/create/CreatePostModal";

const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

export default function CreatePost() {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const [trending, setTrending] = useState(null);
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams({ search: "" });
  const [result, setResult] = useState(null);
  const searchBar = useRef();
  const [loading, setLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [selectedGif, setSelectedGif] = useState(null);

  // Fetch Trend List
  useEffect(() => {
    axios
      .get(
        `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=20&offset=0&rating=pg&bundle=messaging_non_clips`
      )
      .then((res) => setTrending(res.data.data))
      .catch(() => notifyError(`Error with Giphy API.`));
  }, []);

  // Fetch Search Query
  useEffect(() => {
    setSearchParams((params) => {
      if (!query) {
        return undefined;
      }
      searchParams.set("search", query);
      return params;
    });
    axios
      .get(
        `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=20&offset=0&rating=pg&lang=en&bundle=messaging_non_clips`
      )
      .then((res) => {
        setResult(res.data.data);
        setLoading(true);
      })
      .catch(() => notifyError(`Error with Giphy API.`));
  }, [query]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const changeDisplay = () => {
    setQuery("");
    searchBar.current.value = "";
  };

  return (
    <main className="relative flex min-h-screen flex-col justify-start bg-dust-0 pb-12 font-inter dark:bg-cobble-0 lg:mb-0 lg:flex-row-reverse lg:pb-0 lg:pl-60">
      <header className="flex h-12 w-full items-center justify-between bg-dust-0 px-6 dark:bg-cobble-0 lg:hidden">
        <div className="h-fit w-full">
          <button
            type="button"
            className="float-left w-6 transition-all hover:scale-110 hover:text-granite-0"
            onClick={() => navigate(-1)}
          >
            <BackSvg />
          </button>
          <h3 className="mr-6 text-center font-spartan text-xl dark:text-dust-0">
            Hey, <span className="font-semibold">{user.username}</span>
          </h3>
        </div>
      </header>
      <div className="py-4 lg:m-auto lg:w-2/5">
        <h3 className="mr-6 hidden text-center font-spartan text-xl dark:text-dust-0 lg:block">
          Hey, <span className="font-semibold">{user.username}</span>
        </h3>
        <div className="mb-4 mt-2 flex w-full gap-2 px-6">
          <input
            type="search"
            name="search"
            id="search"
            ref={searchBar}
            value={query}
            placeholder="What's your mood today ?"
            onChange={(e) => handleSearch(e)}
            className="w-full rounded-md px-4 py-2 placeholder:text-sm placeholder:italic placeholder:text-black/50 dark:bg-granite-0 dark:text-sand-0 dark:placeholder:text-cobble-0"
          />
          <button
            type="button"
            onClick={() => changeDisplay()}
            className="rounded-md bg-white px-4 py-2 transition-all hover:scale-110 hover:text-granite-0 dark:bg-granite-0 dark:text-sand-0"
          >
            {result?.length === 0 ? <ActiveFireSvg /> : <FireSvg />}
          </button>
        </div>
        <ul className="grid grid-cols-2 gap-[0.1rem]">
          {result && result.length !== 0
            ? result &&
              result.map((gif) => (
                <GifInsight
                  data={gif}
                  key={gif.id}
                  loading={loading}
                  setLoading={setLoading}
                  setIsShow={setIsShow}
                  setSelectedGif={setSelectedGif}
                />
              ))
            : trending &&
              trending.map((gif) => (
                <GifInsight
                  data={gif}
                  key={gif.id}
                  loading={loading}
                  setLoading={setLoading}
                  setIsShow={setIsShow}
                  setSelectedGif={setSelectedGif}
                />
              ))}
        </ul>
      </div>
      <div
        className={
          isShow
            ? "fixed left-0 top-0 z-20 flex min-h-screen min-w-full items-center justify-center bg-black/90"
            : "hidden"
        }
      >
        {isShow && (
          <CreatePostModal selectedGif={selectedGif} setIsShow={setIsShow} />
        )}
      </div>
    </main>
  );
}
