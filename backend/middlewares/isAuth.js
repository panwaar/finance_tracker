const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const token = authHeader.split(" ")[1];

     const decoded = jwt.verify(token, process.env.JWT_SECRET);

     req.user = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token expired, login again" });
  }
};

module.exports = isAuthenticated;
