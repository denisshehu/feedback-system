const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const requireAuthentication = async (req, res, next) => {
  const { authentication } = req.headers;

  if (!authentication) {
    return res.status(401).json({ error: "No authorization token found." });
  }

  const token = authentication.split(" ")[1];

  try {
    const { id } = jwt.verify(token, process.env.SECRET);

    req.user = await User.findById(id).select("_id");

    next();
  } catch (error) {
    res.status(401).json({ error: "Request is not authorized." });
  }
};

module.exports = requireAuthentication;
