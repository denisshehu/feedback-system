const mongoose = require("mongoose");

const Feedback = require("../models/feedbackModel");

const isIdValid = (id) => mongoose.Types.ObjectId.isValid(id);

const ERROR_MESSAGES = {
  INVALID_ID: "Invalid feedback ID.",
  NOT_FOUND: "No feedback found with this ID.",
  GET_ALL: "Failed to get feedbacks.",
  GET_ONE: "Failed to get feedback.",
  POST: "Failed to post feedback.",
  DELETE: "Failed to delete feedback.",
  PATCH: "Failed to patch feedback.",
};

// GET all feedbacks
const getFeedbacks = async (req, res) => {
  try {
    const user_id = req.user._id;
    const feedbacks = await Feedback.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: ERROR_MESSAGES.GET_ALL });
  }
};

// GET a single feedback
const getFeedback = async (req, res) => {
  const { id } = req.params;

  if (!isIdValid(id)) {
    return res.status(400).json({ error: ERROR_MESSAGES.INVALID_ID });
  }

  try {
    const feedback = await Feedback.findById(id);

    if (!feedback) {
      return res.status(404).json({ error: ERROR_MESSAGES.NOT_FOUND });
    }

    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ error: ERROR_MESSAGES.GET_ONE });
  }
};

// POST a new feedback
const postFeedback = async (req, res) => {
  const { user_id, service_id, rating, comments } = req.body;

  try {
    const feedback = await Feedback.create({
      user_id,
      service_id,
      rating,
      comments,
    });

    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ error: ERROR_MESSAGES.POST });
  }
};

// DELETE a feedback
const deleteFeedback = async (req, res) => {
  const { id } = req.params;

  if (!isIdValid(id)) {
    return res.status(400).json({ error: ERROR_MESSAGES.INVALID_ID });
  }

  try {
    const feedback = await Feedback.findByIdAndDelete(id);

    if (!feedback) {
      return res.status(404).json({ error: ERROR_MESSAGES.NOT_FOUND });
    }

    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ error: ERROR_MESSAGES.DELETE });
  }
};

// PATCH a feedback
const patchFeedback = async (req, res) => {
  const { id } = req.params;

  if (!isIdValid(id)) {
    return res.status(400).json({ error: ERROR_MESSAGES.INVALID_ID });
  }

  try {
    const feedback = await Feedback.findByIdAndUpdate(id, { ...req.body });

    if (!feedback) {
      return res.status(404).json({ error: ERROR_MESSAGES.NOT_FOUND });
    }

    res.status(200).json({ feedback, ...req.body });
  } catch (error) {
    res.status(500).json({ error: ERROR_MESSAGES.PATCH });
  }
};

module.exports = {
  getFeedbacks,
  getFeedback,
  postFeedback,
  deleteFeedback,
  patchFeedback,
};
