const express = require("express");

const {
  getFeedbacks,
  getFeedback,
  createFeedback,
  deleteFeedback,
  updateFeedback,
} = require("../controllers/feedbackController");

const router = express.Router();

// GET all feedbacks
router.get("/", getFeedbacks);

// GET a single feedback
router.get("/:id", getFeedback);

// POST a new feedback
router.post("/", createFeedback);

// DELETE a feedback
router.delete("/:id", deleteFeedback);

// PATCH a feedback
router.patch("/:id", updateFeedback);

module.exports = router;
