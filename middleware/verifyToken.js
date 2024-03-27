const jwt = require("jsonwebtoken");

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

      req.user = user;
      next();
    });
  } else {
    return res
      .status(401)
      .json({ status: false, message: "Your are not athenticated" });
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (
      req.user.userType === "Client" ||
      req.user.userType === "Admin" ||
      req.user.userType === "StationManager"
    ) {
      next();
    } else {
      return res
        .status(403)
        .json({ status: false, message: "You are not allowed to access this" });
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.userType === "Admin") {
      next();
    } else {
      return res
        .status(403)
        .json({ status: false, message: "You are not allowed to access this" });
    }
  });
};

const verifyManager = (req, res, next) => {
  verifyToken(req, res, () => {
    if (
      req.user.userType === "Admin" ||
      req.user.userType === "StationManager"
    ) {
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
  verifyManager,
  verifyTokenAndAuthorization,
};
