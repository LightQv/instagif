const express = require("express");

const router = express.Router();

const {
  validateUser,
  validateEditProfile,
  validateEditUserMail,
  validateEditUserPw,
} = require("./services/validators");
const { getUserByEmailMiddleware } = require("./controllers/authControllers");
const {
  hashPassword,
  verifyPassword,
  verifyToken,
  logout,
} = require("./services/auth");

const userControllers = require("./controllers/userControllers");
const postControllers = require("./controllers/postControllers");
const likeControllers = require("./controllers/likeControllers");
const feelingControllers = require("./controllers/feelingControllers");
const followControllers = require("./controllers/followControllers");

// --- Public Routes (without Auth) --- //
// Login & Register
router.post("/login", getUserByEmailMiddleware, verifyPassword);
router.post("/users", validateUser, hashPassword, userControllers.add);

// Posts with Likes & Feelings
router.get("/posts", postControllers.browse);
router.get("/posts/:id", postControllers.readWithUser);
router.get("/likes-post/:id", likeControllers.browseByPost);
router.get("/feelings-post/:id", feelingControllers.browseByPost);

// -> For User's Search-List
router.get("/users", userControllers.browse);

// Users's profiles
router.get("/users/:username", userControllers.readByUsername);
router.get("/posts-user/:id", postControllers.browseByUser);

// Stats for each User
router.get("/likes-stats/:id", likeControllers.countByUser);
router.get("/feelings-stats/:id", feelingControllers.countByUser);

// --- Private Routes (Auth requiered) --- //
router.use(verifyToken);
// Logout
router.get("/logout", logout);

// Edit User's Profile
router.put("/users-ml/:id", validateEditUserMail, userControllers.editMail);
router.put(
  "/users-pw/:id",
  validateEditUserPw,
  hashPassword,
  userControllers.editPw
);
router.put(
  "/users-profile/:id",
  validateEditProfile,
  userControllers.editUsername
);
router.delete("/users/:id", userControllers.destroy);

// Auth's User's Followed Posts
router.get("/posts-followed/:id", postControllers.browseByFollow);

// Handle Liked Posts
router.get("/posts-liked/:id", postControllers.browseLikedByUser);

// Posts's CRUD
router.post("/posts", postControllers.add);
router.put("/posts/:id", postControllers.edit);
router.delete("/posts/:id", postControllers.destroy);

// Likes's CD
router.post("/likes", likeControllers.add);
router.delete("/likes/:id", likeControllers.destroy);

// Feelings's CD
router.post("/feelings", feelingControllers.add);
router.delete("/feelings/:id", feelingControllers.destroy);

// Follow's CD
router.post("/follows", followControllers.add);
router.delete("/follows/:followerId&:followingId", followControllers.destroy);

module.exports = router;
