const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AnalyticsSchema = new Schema({
  average_ratings: [
    {
      service_name: { type: String, required: true },
      average_rating: { type: Number, required: true },
    },
  ],
  submission_trend: [
    {
      date: { type: String, required: true },
      submission_count: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model("Analytics", AnalyticsSchema);
