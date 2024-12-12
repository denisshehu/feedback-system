const express = require("express");

const requireAuthentication = require("../middleware/requireAuthentication");

const {
  getFeedbacks,
  getFeedback,
  postFeedback,
  deleteFeedback,
  patchFeedback,
} = require("../controllers/feedbackController");

const router = express.Router();

// middleware
router.use(requireAuthentication);

// GET all feedbacks
router.get("/", getFeedbacks);

// GET a single feedback
router.get("/:id/", getFeedback);

// POST a new feedback
router.post("/", postFeedback);

// DELETE a feedback
router.delete("/:id/", deleteFeedback);

// PATCH a feedback
router.patch("/:id/", patchFeedback);

module.exports = router;
