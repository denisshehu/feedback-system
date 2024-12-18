const express = require("express");

const requireAuthentication = require("../middleware/requireAuthentication");

const getAnalytics = require("../controllers/analyticsController");

const router = express.Router();

// middleware
router.use(requireAuthentication);

// GET analytics
router.get("/", getAnalytics);

module.exports = router;
