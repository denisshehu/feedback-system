const requireAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res
      .status(403)
      .json({ error: "Only admins are authorized to make this request." });
  }

  next();
};

module.exports = requireAdmin;
