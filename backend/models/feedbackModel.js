const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const feedbackSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    service_id: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comments: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
