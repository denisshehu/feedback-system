require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const feedbackRoutes = require("./routes/feedbackRoutes");

// express app
const app = express();

// middleware
app.use(express.json());

// routes
app.use("/api/feedbacks", feedbackRoutes);

// connect to the database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log(
        `Connected to the database, and listening on port ${process.env.PORT}.`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
