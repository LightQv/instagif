import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PostDetails from "./pages/PostDetails";
import RequireAuth from "./components/routes/RequireAuth";
import CreatePost from "./pages/CreatePost";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post-details/:id" element={<PostDetails />} />
        {/* Private Routes, Redirect to Login if no user Auth */}
        <Route element={<RequireAuth />}>
          <Route path="/create" element={<CreatePost />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
      <ToastContainer limit={1} />
    </>
  );
}

export default App;
