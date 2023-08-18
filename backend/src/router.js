const express = require("express");

const router = express.Router();

const {
  validateUser,
  validateEditProfile,
  validateEditUserMail,
  validateEditUserPw,
} = require("./services/validators");
const {
  getUserByEmailMiddleware,
  generatePasswordToken,
  verifyPasswordToken,
} = require("./controllers/authControllers");
const {
  hashPassword,
  verifyPassword,
  verifyToken,
  logout,
} = require("./services/auth");
const { sendForgottenPassword } = require("./services/nodemailer");

const userControllers = require("./controllers/userControllers");
const postControllers = require("./controllers/postControllers");
const likeControllers = require("./controllers/likeControllers");
const feelingControllers = require("./controllers/feelingControllers");
const followControllers = require("./controllers/followControllers");

// --- Public Routes (without Auth) --- //
// Login & Register
router.post("/login", getUserByEmailMiddleware, verifyPassword);
router.post("/register", validateUser, hashPassword, userControllers.add);
router.post(
  "/forgotten-password",
  getUserByEmailMiddleware,
  generatePasswordToken,
  sendForgottenPassword
);
router.post(
  "/reset-password",
  verifyPasswordToken,
  validateEditUserPw,
  hashPassword,
  userControllers.editPw
);

// Posts with Likes & Feelings
router.get("/posts", postControllers.browse);
router.get("/posts/:id", postControllers.readWithUser);
router.get("/likes-post/:id", likeControllers.browseByPost);
router.get("/feelings-post/:id", feelingControllers.browseByPost);

// -> For User's Search-List
router.get("/users", userControllers.browse);

// Users's profiles
router.get("/users/:username", userControllers.readByUsername);

// Stats for each User
router.get("/followers-stats/:id", followControllers.countFollowerByUser);
router.get("/follows-stats/:id", followControllers.countFollowsByUser);
router.get("/likes-stats/:id", likeControllers.countByUser);
router.get("/feelings-stats/:id", feelingControllers.countByUser);
router.get("/followers-list/:id", userControllers.browseFollowersByUser);
router.get("/follows-list/:id", userControllers.browseFollowsByUser);

// --- Private Routes (Auth requiered) --- //
router.use(verifyToken);
// Logout
router.get("/logout", logout);

// Edit User's Profile
router.put("/users-avatar/:id", userControllers.editAvatar);
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
router.get("/users-unfollowed/:id", userControllers.browseUnfollowedUser);

// Handle Liked Posts
router.get("/posts-liked/:id", postControllers.browseByUserLikes);

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
