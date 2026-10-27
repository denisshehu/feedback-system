require("dotenv").config();

const mongoose = require("mongoose");
const { addDays, subDays, subMinutes } = require("date-fns");

const User = require("../models/userModel");
const Service = require("../models/serviceModel");
const Feedback = require("../models/feedbackModel");
const Analytics = require("../models/analyticsModel");

const { etl } = require("../etl/index");

const numberOfDays = 21;

const services = [
  { name: "Web Development", category: "Development", averageRating: 4.6 },
  {
    name: "Mobile App Development",
    category: "Development",
    averageRating: 4.2,
  },
  { name: "UI/UX Design", category: "Design", averageRating: 4.4 },
  { name: "Cloud Hosting", category: "Infrastructure", averageRating: 3.4 },
  { name: "Cybersecurity Audit", category: "Security", averageRating: 3.9 },
  { name: "IT Consulting", category: "Consulting", averageRating: 3.1 },
  { name: "Data Analytics", category: "Data", averageRating: 3.7 },
  { name: "Customer Support", category: "Support", averageRating: 2.6 },
];

const otherCustomers = ["Ana", "Ben", "Clara", "David", "Elena"];

const comments = {
  1: ["Very disappointing, nothing worked as promised."],
  2: [
    "Slow responses and the result needed a lot of rework.",
    "Below expectations, communication was poor.",
  ],
  3: [
    "Decent overall, but the timeline slipped.",
    "Okay service, some room for improvement.",
  ],
  4: [
    "Good work and clear communication throughout.",
    "Solid result, only minor issues along the way.",
  ],
  5: [
    "Excellent, exceeded our expectations!",
    "Fast, professional and great attention to detail.",
  ],
};

const customerFeedbacks = [
  {
    service: "Web Development",
    rating: 5,
    comments:
      "The team delivered our new website ahead of schedule and handled every change request quickly.",
    daysAgo: 2,
  },
  {
    service: "Cloud Hosting",
    rating: 3,
    comments:
      "Reliable most of the time, but we had two short outages this month.",
    daysAgo: 6,
    daysUntilUpdate: 2,
  },
  {
    service: "UI/UX Design",
    rating: 4,
    comments:
      "Clean and modern designs. A couple of iterations were needed before we were happy.",
    daysAgo: 11,
  },
  {
    service: "Customer Support",
    rating: 2,
    comments: "It took three days to get a reply to a simple question.",
    daysAgo: 17,
  },
];

const getRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomRating = (averageRating) => {
  const rating = Math.round(averageRating + Math.random() * 2 - 1);
  return Math.min(Math.max(rating, 1), 5);
};

const seed = async () => {
  // connect to the database
  await mongoose.connect(process.env.MONGO_URI);

  // delete the existing data
  await User.deleteMany({});
  await Service.deleteMany({});
  await Feedback.deleteMany({});
  await Analytics.deleteMany({});

  // users
  await User.signUp("Admin", "admin@demo.com", "Admin123!", "admin");

  const customer = await User.signUp(
    "Customer",
    "customer@demo.com",
    "Customer123!",
    "customer"
  );

  const others = [];

  for (const name of otherCustomers) {
    const email = `${name.toLowerCase()}@demo.com`;
    others.push(await User.signUp(name, email, "Customer123!", "customer"));
  }

  // services
  const startDate = subDays(new Date(), numberOfDays);

  const { insertedIds } = await Service.collection.insertMany(
    services.map(({ name, category }) => ({
      name,
      category,
      createdAt: startDate,
      updatedAt: startDate,
    }))
  );

  services.forEach((service, index) => {
    service.id = String(insertedIds[index]);
  });

  // feedbacks
  const feedbacks = [];

  for (let daysAgo = numberOfDays; daysAgo >= 0; daysAgo--) {
    const numberOfFeedbacks =
      Math.floor(Math.random() * 4) +
      1 +
      Math.floor((numberOfDays - daysAgo) / 6);

    for (let i = 0; i < numberOfFeedbacks; i++) {
      const service = getRandomElement(services);
      const rating = getRandomRating(service.averageRating);
      const createdAt = subMinutes(
        subDays(new Date(), daysAgo),
        Math.floor(Math.random() * 600)
      );

      feedbacks.push({
        user_id: String(getRandomElement(others)._id),
        service_id: service.id,
        rating,
        comments: getRandomElement(comments[rating]),
        createdAt,
        updatedAt: createdAt,
      });
    }
  }

  customerFeedbacks.forEach((feedback) => {
    const service = services.find(
      (service) => service.name === feedback.service
    );
    const createdAt = subDays(new Date(), feedback.daysAgo);

    feedbacks.push({
      user_id: String(customer._id),
      service_id: service.id,
      rating: feedback.rating,
      comments: feedback.comments,
      createdAt,
      updatedAt: addDays(createdAt, feedback.daysUntilUpdate || 0),
    });
  });

  await Feedback.collection.insertMany(feedbacks);

  // analytics
  await etl();

  console.log("The database is seeded.");
};

seed()
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    mongoose.disconnect();
  });
