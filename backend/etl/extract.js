const Service = require("../models/serviceModel");
const Feedback = require("../models/feedbackModel");

const extract = async () => {
  const services = await Service.find({});
  const feedbacks = await Feedback.find({});

  return { services, feedbacks };
};

module.exports = extract;
