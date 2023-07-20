const express = require("express");

const router = express.Router();

const { validateUser, validateEditProfile } = require("./services/validators");
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

// Public Routes (without Auth)
router.post("/login", getUserByEmailMiddleware, verifyPassword);

router.get("/users", userControllers.browse);
router.get("/users/:username", userControllers.readByUsername);
router.post("/users", validateUser, hashPassword, userControllers.add);
router.get("/posts", postControllers.browse);
router.get("/posts/:id", postControllers.readWithUser);
router.get("/posts-user/:id", postControllers.browseByUser);

// Private Routes (Auth requiered)
router.use(verifyToken);
router.get("/logout", logout);
router.put("/users/:id", validateEditProfile, userControllers.editProfile);
router.delete("/users/:id", userControllers.destroy);

router.post("/posts", postControllers.add);
router.put("/posts/:id", postControllers.edit);
router.delete("/posts/:id", postControllers.destroy);

router.get("/likes-user/:id", likeControllers.browseByUser);
router.post("/likes", likeControllers.add);
router.delete("/likes/:id", likeControllers.destroy);

module.exports = router;
