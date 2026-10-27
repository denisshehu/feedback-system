const cron = require("node-cron");

const extract = require("./extract");
const transform = require("./transform");
const load = require("./load");

const scheduleEtl = () => {
  etl();

  cron.schedule(process.env.UPDATE_TIME, async () => {
    await etl();
  });
};

const etl = async () => {
  try {
    const { services, feedbacks } = await extract();

    const { averageRatings, submissionTrend } = transform(services, feedbacks);

    await load(averageRatings, submissionTrend);

    console.log("Analytics updated.");
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
};

module.exports = { scheduleEtl, etl };
