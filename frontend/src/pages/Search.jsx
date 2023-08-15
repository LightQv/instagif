import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import APIService from "../services/APIService";
import { notifyError } from "../services/toasts";
import { useUserContext } from "../contexts/UserContext";
import BackSvg from "../components/svg/navigation/BackSvg";
import UserCard from "../components/search/UserCard";

export default function Search() {
  const { user } = useUserContext();
  const [users, setUsers] = useState(null);
  const [sendFollow, setSendFollow] = useState(false);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams({ username: "" });

  useEffect(() => {
    setSearchParams((params) => {
      if (!query) {
        return undefined;
      }
      searchParams.set("username", query);
      return params;
    });

    APIService.get(`/users?username=${query}`)
      .then((res) => {
        setUsers(res.data);
        setSendFollow(false);
      })
      .catch((err) => {
        if (err.request?.status === 500) {
          notifyError(`${err} : Fetching user's posts.`);
        }
      });
  }, [sendFollow, query]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  return (
    <main className="flex min-h-screen flex-col justify-start scroll-smooth bg-dust-0 pb-12 font-inter dark:bg-cobble-0 lg:pb-0 lg:pl-60">
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
      <div className="pb-4 lg:mx-auto lg:w-2/5 lg:py-4">
        <h3 className="mr-6 hidden text-center font-spartan text-xl dark:text-dust-0 lg:block">
          Hey, <span className="font-semibold">{user.username}</span>
        </h3>
        <div className="mb-4 mt-2 flex w-full gap-2 px-6">
          <input
            type="search"
            name="search"
            id="search"
            value={query}
            placeholder="Looking for someone ?"
            onChange={(e) => handleSearch(e)}
            className="w-full rounded-md px-4 py-2 placeholder:text-sm placeholder:italic placeholder:text-black/50 dark:bg-granite-0 dark:text-sand-0 dark:placeholder:text-cobble-0"
          />
        </div>
        <ul className="w-full">
          {users && users.length > 0 ? (
            users
              .filter((u) =>
                u.username.toUpperCase().includes(query.toUpperCase())
              )
              .map((u) => <UserCard u={u} setSendFollow={setSendFollow} />)
          ) : (
            <p className="mt-2 text-center text-sm italic">No user founded.</p>
          )}
        </ul>
      </div>
    </main>
  );
}
