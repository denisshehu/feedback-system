require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const scheduleEtl = require("./etl/index");

const userRoutes = require("./routes/userRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

// express app
const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/analytics", analyticsRoutes);

// connect to the database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log(
        `The server is connected to the database, and listening on port ${process.env.PORT}.`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  })
  .then(() => {
    scheduleEtl();
  });
