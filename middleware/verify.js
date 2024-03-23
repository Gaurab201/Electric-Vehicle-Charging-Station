const jwt = require("jsonwebtoken");
const db = require("../utils/connect");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) {
        return res
          .status(403)
          .json({ status: false, message: "Invalid token" });
      }

      req.userId = user.id;
      next();
    });
  } else {
    return res
      .status(401)
      .json({ status: false, message: "Your are not athenticated" });
  }
};

// Verify Token and Authorization
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    const userId = req.userId;
    const getUserTypeQuery = "SELECT user_type FROM users WHERE id = ?";
    db.query(getUserTypeQuery, [userId], (error, results) => {
      if (error) {
        console.error("Error retrieving user type:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      const userType = results[0].user_type;
      req.userType = userType;
      next();
    });
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    const userType = req.userType;
    if (userType === "Admin") {
      next();
    } else {
      return res
        .status(403)
        .json({ status: false, message: "You are not allowed to access this" });
    }
  });
};

const verifyStationManager = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.userType === "Admin" || req.userType === "Station_Manager") {
      next();
    } else {
      return res
        .status(403)
        .json({ status: false, message: "You are not allowed to access this" });
    }
  });
};

module.exports = {
  verifyToken,
  verifyAdmin,
  verifyStationManager,
  verifyTokenAndAuthorization,
};
