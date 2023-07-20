const express = require("express");

const router = express.Router();

const { validateUser } = require("./services/validators");
const { getUserByEmailMiddleware } = require("./controllers/authControllers");
const {
  hashPassword,
  verifyPassword,
  verifyToken,
  logout,
} = require("./services/auth");

const userControllers = require("./controllers/userControllers");
const postControllers = require("./controllers/postControllers");

// Public Routes (without Auth)
router.post("/login", getUserByEmailMiddleware, verifyPassword);

router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.post("/users", validateUser, hashPassword, userControllers.add);
router.get("/posts", postControllers.browse);
router.get("/posts/:id", postControllers.readWithUser);
router.get("/posts-user/:username", postControllers.browseByUser);

// Private Routes (Auth requiered)
router.use(verifyToken);
router.get("/logout", logout);
router.put("/users/:id", validateUser, userControllers.edit);
router.delete("/users/:id", userControllers.destroy);

router.put("/posts/:id", postControllers.edit);
router.post("/posts", postControllers.add);
router.delete("/posts/:id", postControllers.destroy);

module.exports = router;
