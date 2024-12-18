const Analytics = require("../models/analyticsModel");

// GET analytics
const getAnalytics = async (req, res) => {
  try {
    const analytics = await Analytics.find({});
    res.status(200).json(analytics);
  } catch (error) {
    res.status(500).json({ error: "Failed to get analytics." });
  }
};

module.exports = getAnalytics;
