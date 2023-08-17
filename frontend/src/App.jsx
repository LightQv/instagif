import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PostDetails from "./pages/PostDetails";
import RequireAuth from "./components/routes/RequireAuth";
import Search from "./pages/Search";
import CreatePost from "./pages/CreatePost";
import Profile from "./pages/Profile";
import ProfileEdition from "./pages/ProfileEdition";
import ProfileSettings from "./pages/ProfileSettings";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/:username" element={<Profile />} />
        <Route path="/:username/:id" element={<PostDetails />} />
        {/* Private Routes, Redirect to Login if no user Auth */}
        <Route element={<RequireAuth />}>
          <Route path="/create" element={<CreatePost />} />
          <Route path="/my-profile" element={<Profile />} />
          <Route path="/my-profile/edit" element={<ProfileEdition />} />
          <Route path="/my-profile/settings" element={<ProfileSettings />} />
        </Route>
      </Routes>
      <ToastContainer limit={1} />
    </>
  );
}

export default App;
