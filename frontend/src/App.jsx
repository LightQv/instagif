import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
      <ToastContainer limit={1} />
    </>
  );
}

export default App;
