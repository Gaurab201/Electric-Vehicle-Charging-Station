const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is passed as "Bearer <token>"

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication failed: No token provided" });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Authentication failed: Invalid token" });
    }

    // Attach the decoded token (user ID and email) to the request object
    req.user = decoded;
    next();
  });
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    // Access granted to all user types
    next();
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.userType === "Admin") {
      // Access granted for Admin
      next();
    } else {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }
  });
};

const verifyStationManager = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.userType === "StationManager") {
      // Access granted for Station Managers
      next();
    } else {
      return res
        .status(403)
        .json({ message: "Access denied: Station Managers only" });
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyAdmin,
  verifyStationManager,
};
