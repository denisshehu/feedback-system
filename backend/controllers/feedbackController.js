const mongoose = require("mongoose");

const Feedback = require("../models/feedbackModel");

// GET all feedbacks
const getFeedbacks = async (req, res) => {
  const feedbacks = await Feedback.find({}).sort({ createdAt: -1 });

  res.status(200).json(feedbacks);
};

// GET a single feedback
const getFeedback = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such feedback exists." });
  }

  const feedback = await Feedback.findById(id);

  if (!feedback) {
    return res.status(404).json({ error: "No such feedback exists." });
  }

  res.status(200).json(feedback);
};

// POST a new feedback
const postFeedback = async (req, res) => {
  const { user_id, service_id, rating, comments } = req.body;

  if (!service_id || !rating || !comments) {
    return res.status(400).json({ error: "Please fill in all the fields." });
  }

  try {
    const feedback = await Feedback.create({
      user_id,
      service_id,
      rating,
      comments,
    });

    res.status(200).json(feedback);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE a feedback
const deleteFeedback = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such feedback exists." });
  }

  const feedback = await Feedback.findByIdAndDelete(id);

  if (!feedback) {
    return res.status(404).json({ error: "No such feedback exists." });
  }

  res.status(200).json(feedback);
};

// PATCH a feedback
const patchFeedback = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such feedback exists." });
  }

  const feedback = await Feedback.findByIdAndUpdate(id, { ...req.body });

  if (!feedback) {
    return res.status(404).json({ error: "No such feedback exists." });
  }

  res.status(200).json(feedback);
};

module.exports = {
  getFeedbacks,
  getFeedback,
  postFeedback,
  deleteFeedback,
  patchFeedback,
};
