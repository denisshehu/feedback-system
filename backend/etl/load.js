const Analytics = require("../models/analyticsModel");

const load = async (averageRatings, submissionTrend) => {
  await Analytics.deleteMany({});

  await Analytics.create({
    average_ratings: averageRatings,
    submission_trend: submissionTrend,
  });
};

module.exports = load;
