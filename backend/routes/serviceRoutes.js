const express = require("express");

const {
  getServices,
  postService,
  deleteService,
} = require("../controllers/serviceController");

const router = express.Router();

// GET all services
router.get("/", getServices);

// POST a new service
router.post("/", postService);

// DELETE a service
router.delete("/:id", deleteService);

module.exports = router;
