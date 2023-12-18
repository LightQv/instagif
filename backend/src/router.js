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
router.post("/api/v1/login", getUserByEmailMiddleware, verifyPassword);
router.post(
  "/api/v1/register",
  validateUser,
  hashPassword,
  userControllers.add
);
router.post(
  "/api/v1/forgotten-password",
  getUserByEmailMiddleware,
  generatePasswordToken,
  sendForgottenPassword
);
router.post(
  "/api/v1/reset-password",
  verifyPasswordToken,
  validateEditUserPw,
  hashPassword,
  userControllers.editPw
);

// Posts with Likes & Feelings
router.get("/api/v1/posts", postControllers.browse);
router.get("/api/v1/posts/:id", postControllers.readWithUser);
router.get("/api/v1/likes-post/:id", likeControllers.browseByPost);
router.get("/api/v1/feelings-post/:id", feelingControllers.browseByPost);

// -> For User's Search-List
router.get("/api/v1/users", userControllers.browse);

// Users's profiles
router.get("/api/v1/users/:username", userControllers.readByUsername);

// Stats for each User
router.get(
  "/api/v1/followers-stats/:id",
  followControllers.countFollowerByUser
);
router.get("/api/v1/follows-stats/:id", followControllers.countFollowsByUser);
router.get("/api/v1/likes-stats/:id", likeControllers.countByUser);
router.get("/api/v1/feelings-stats/:id", feelingControllers.countByUser);
router.get("/api/v1/followers-list/:id", userControllers.browseFollowersByUser);
router.get("/api/v1/follows-list/:id", userControllers.browseFollowsByUser);

// --- Private Routes (Auth requiered) --- //
router.use(verifyToken);
// Logout
router.get("/api/v1/logout", logout);

// Edit User's Profile
router.put("/api/v1/users-avatar/:id", userControllers.editAvatar);
router.put(
  "/api/v1/users-ml/:id",
  validateEditUserMail,
  userControllers.editMail
);
router.put(
  "/api/v1/users-pw/:id",
  validateEditUserPw,
  hashPassword,
  userControllers.editPw
);
router.put(
  "/api/v1/users-profile/:id",
  validateEditProfile,
  userControllers.editUsername
);
router.delete("/api/v1/users/:id", userControllers.destroy);

// Auth's User's Followed Posts
router.get("/api/v1/posts-followed/:id", postControllers.browseByFollow);
router.get(
  "/api/v1/users-unfollowed/:id",
  userControllers.browseUnfollowedUser
);

// Handle Liked Posts
router.get("/api/v1/posts-liked/:id", postControllers.browseByUserLikes);

// Posts's CRUD
router.post("/api/v1/posts", postControllers.add);
router.put("/api/v1/posts/:id", postControllers.edit);
router.delete("/api/v1/posts/:id", postControllers.destroy);

// Likes's CD
router.post("/api/v1/likes", likeControllers.add);
router.delete("/api/v1/likes/:id", likeControllers.destroy);

// Feelings's CD
router.post("/api/v1/feelings", feelingControllers.add);
router.delete("/api/v1/feelings/:id", feelingControllers.destroy);

// Follow's CD
router.post("/api/v1/follows", followControllers.add);
router.delete(
  "/api/v1/follows/:followerId&:followingId",
  followControllers.destroy
);

module.exports = router;
