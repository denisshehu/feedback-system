const express = require("express");

const requireAuthentication = require("../middleware/requireAuthentication");
const requireAdmin = require("../middleware/requireAdmin");

const {
  getUsers,
  deleteUser,
  signUpUser,
  signInUser,
} = require("../controllers/userController");

const router = express.Router();

// SIGN UP a new user
router.post("/signup/", signUpUser);

// SIGN IN a user
router.post("/signin/", signInUser);

// middleware
router.use(requireAuthentication, requireAdmin);

// GET all users
router.get("/", getUsers);

// DELETE a user
router.delete("/:id/", deleteUser);

module.exports = router;
