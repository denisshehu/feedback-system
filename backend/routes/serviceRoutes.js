const express = require("express");

const requireAuthentication = require("../middleware/requireAuthentication");

const {
  getServices,
  postService,
  deleteService,
} = require("../controllers/serviceController");

const router = express.Router();

// middleware
router.use(requireAuthentication);

// GET all services
router.get("/", getServices);

// POST a new service
router.post("/", postService);

// DELETE a service
router.delete("/:id/", deleteService);

module.exports = router;
