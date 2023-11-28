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
router.post("/api/login", getUserByEmailMiddleware, verifyPassword);
router.post("/api/register", validateUser, hashPassword, userControllers.add);
router.post(
  "/api/forgotten-password",
  getUserByEmailMiddleware,
  generatePasswordToken,
  sendForgottenPassword
);
router.post(
  "/api/reset-password",
  verifyPasswordToken,
  validateEditUserPw,
  hashPassword,
  userControllers.editPw
);

// Posts with Likes & Feelings
router.get("/api/posts", postControllers.browse);
router.get("/api/posts/:id", postControllers.readWithUser);
router.get("/api/likes-post/:id", likeControllers.browseByPost);
router.get("/api/feelings-post/:id", feelingControllers.browseByPost);

// -> For User's Search-List
router.get("/api/users", userControllers.browse);

// Users's profiles
router.get("/api/users/:username", userControllers.readByUsername);

// Stats for each User
router.get("/api/followers-stats/:id", followControllers.countFollowerByUser);
router.get("/api/follows-stats/:id", followControllers.countFollowsByUser);
router.get("/api/likes-stats/:id", likeControllers.countByUser);
router.get("/api/feelings-stats/:id", feelingControllers.countByUser);
router.get("/api/followers-list/:id", userControllers.browseFollowersByUser);
router.get("/api/follows-list/:id", userControllers.browseFollowsByUser);

// --- Private Routes (Auth requiered) --- //
router.use(verifyToken);
// Logout
router.get("/api/logout", logout);

// Edit User's Profile
router.put("/api/users-avatar/:id", userControllers.editAvatar);
router.put("/api/users-ml/:id", validateEditUserMail, userControllers.editMail);
router.put(
  "/api/users-pw/:id",
  validateEditUserPw,
  hashPassword,
  userControllers.editPw
);
router.put(
  "/api/users-profile/:id",
  validateEditProfile,
  userControllers.editUsername
);
router.delete("/api/users/:id", userControllers.destroy);

// Auth's User's Followed Posts
router.get("/api/posts-followed/:id", postControllers.browseByFollow);
router.get("/api/users-unfollowed/:id", userControllers.browseUnfollowedUser);

// Handle Liked Posts
router.get("/api/posts-liked/:id", postControllers.browseByUserLikes);

// Posts's CRUD
router.post("/api/posts", postControllers.add);
router.put("/api/posts/:id", postControllers.edit);
router.delete("/api/posts/:id", postControllers.destroy);

// Likes's CD
router.post("/api/likes", likeControllers.add);
router.delete("/api/likes/:id", likeControllers.destroy);

// Feelings's CD
router.post("/api/feelings", feelingControllers.add);
router.delete("/api/feelings/:id", feelingControllers.destroy);

// Follow's CD
router.post("/api/follows", followControllers.add);
router.delete(
  "/api/follows/:followerId&:followingId",
  followControllers.destroy
);

module.exports = router;
