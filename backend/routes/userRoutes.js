const express = require("express");

const {
  getUsers,
  deleteUser,
  signUpUser,
  signInUser,
} = require("../controllers/userController");

const router = express.Router();

// GET all users
router.get("/", getUsers);

// DELETE a user
router.delete("/:id/", deleteUser);

// SIGN UP a new user
router.post("/signup/", signUpUser);

// SIGN IN a user
router.post("/signin/", signInUser);

module.exports = router;
