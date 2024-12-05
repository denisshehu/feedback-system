const mongoose = require("mongoose");

const Service = require("../models/serviceModel");

// GET all services
const getServices = async (req, res) => {
  const services = await Service.find({}).sort({ createdAt: -1 });

  res.status(200).json(services);
};

// POST a new service
const postService = async (req, res) => {
  const { name, category } = req.body;

  try {
    const service = await Service.create({
      name,
      category,
    });

    res.status(200).json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE a service
const deleteService = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such service exists." });
  }

  const service = await Service.findByIdAndDelete(id);

  if (!service) {
    return res.status(404).json({ error: "No such service exists." });
  }

  res.status(200).json(service);
};

module.exports = {
  getServices,
  postService,
  deleteService,
};
