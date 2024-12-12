const mongoose = require("mongoose");

const Service = require("../models/serviceModel");

const isIdValid = (id) => mongoose.Types.ObjectId.isValid(id);

const ERROR_MESSAGES = {
  INVALID_ID: "Invalid service ID.",
  NOT_FOUND: "No service found with this ID.",
  GET: "Failed to get services.",
  POST: "Failed to post service.",
  DELETE: "Failed to delete service.",
};

// GET all services
const getServices = async (req, res) => {
  try {
    const services = await Service.find({}).sort({ createdAt: -1 });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: ERROR_MESSAGES.GET });
  }
};

// POST a new service
const postService = async (req, res) => {
  const { name, category } = req.body;

  try {
    const service = await Service.create({
      name,
      category,
    });

    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ error: ERROR_MESSAGES.POST });
  }
};

// DELETE a service
const deleteService = async (req, res) => {
  const { id } = req.params;

  if (!isIdValid(id)) {
    return res.status(400).json({ error: ERROR_MESSAGES.INVALID_ID });
  }

  try {
    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return res.status(404).json({ error: ERROR_MESSAGES.NOT_FOUND });
    }

    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ error: ERROR_MESSAGES.DELETE });
  }
};

module.exports = {
  getServices,
  postService,
  deleteService,
};
