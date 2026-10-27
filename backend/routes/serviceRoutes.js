const express = require("express");

const requireAuthentication = require("../middleware/requireAuthentication");
const requireAdmin = require("../middleware/requireAdmin");

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
router.post("/", requireAdmin, postService);

// DELETE a service
router.delete("/:id/", requireAdmin, deleteService);

module.exports = router;
