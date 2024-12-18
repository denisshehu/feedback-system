const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const requireAuthentication = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "No authorization token found." });
  }

  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, process.env.SECRET);

    req.user = await User.findById(id).select("_id role");

    next();
  } catch (error) {
    res.status(401).json({ error: "Request is not authorized." });
  }
};

module.exports = requireAuthentication;
