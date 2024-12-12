const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const isIdValid = (id) => mongoose.Types.ObjectId.isValid(id);

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "3d" });
};

const ERROR_MESSAGES = {
  INVALID_ID: "Invalid user ID.",
  NOT_FOUND: "No user found with this ID.",
  GET: "Failed to get users.",
  DELETE: "Failed to delete user.",
};

// GET all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: ERROR_MESSAGES.GET });
  }
};

// DELETE a user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!isIdValid(id)) {
    return res.status(400).json({ error: ERROR_MESSAGES.INVALID_ID });
  }

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ error: ERROR_MESSAGES.NOT_FOUND });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: ERROR_MESSAGES.DELETE });
  }
};

// SIGN UP a new user
const signUpUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const user = await User.signUp(name, email, password, role);

    const token = createToken(user._id);

    res.status(201).json({ id: user._id, email, role: user.role, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// SIGN IN a user
const signInUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signIn(email, password);

    const token = createToken(user._id);

    res.status(200).json({ id: user._id, email, role: user.role, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUsers,
  deleteUser,
  signUpUser,
  signInUser,
};
