const { min, eachDayOfInterval, format } = require("date-fns");

const dateFormat = "dd MMM yyyy";

const transform = (services, feedbacks) => {
  const averageRatings = calculateAverageRatings(services, feedbacks);
  const submissionTrend = calculateSubmissionTrend(services, feedbacks);
  return { averageRatings, submissionTrend };
};

const calculateAverageRatings = (services, feedbacks) => {
  const groupedRatings = groupRatingsByService(feedbacks);

  const averageRatings = services.map((service) => {
    const ratings = groupedRatings.get(String(service._id))?.ratings;

    return {
      service_name: service.name,
      average_rating: calculateAverage(ratings),
    };
  });

  return averageRatings.sort((a, b) =>
    a.service_name.localeCompare(b.service_name)
  );
};

const groupRatingsByService = (feedbacks) => {
  const groupedRatings = new Map();

  feedbacks.forEach((feedback) => {
    const { service_id, rating } = feedback;

    if (!groupedRatings.has(service_id)) {
      groupedRatings.set(service_id, { ratings: [] });
    }

    groupedRatings.get(service_id).ratings.push(rating);
  });

  return groupedRatings;
};

const calculateAverage = (array) => {
  if (!array) {
    return 0;
  }

  const sum = array.reduce((total, element) => total + element, 0);
  const average = sum / array.length;

  return Math.round(average * 10) / 10;
};

const calculateSubmissionTrend = (services, feedbacks) => {
  const dates = getDates(services);

  const submission_trend = new Map();

  dates.forEach((date) => {
    submission_trend.set(date, 0);
  });

  feedbacks.forEach((feedback) => {
    const date = formatDate(feedback.createdAt);
    const currentCount = submission_trend.get(date);
    submission_trend.set(date, currentCount + 1);
  });

  return Array.from(submission_trend, ([key, value]) => ({
    date: key,
    submission_count: value,
  }));
};

const getDates = (services) => {
  const startTime = min(services.map((service) => service.createdAt));
  const endTime = new Date();

  return eachDayOfInterval({ start: startTime, end: endTime }).map((date) =>
    formatDate(date)
  );
};

const formatDate = (date) => {
  return format(date, dateFormat);
};

module.exports = transform;
