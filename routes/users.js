const express = require("express");
const router = express.Router();
const { verifyTokenAndAuthorization } = require("../middleware/verify");

const userController = require("../controllers/userController");

router.get("/:id", verifyTokenAndAuthorization, userController.getUserById);

router.get(
  "/verify/:otp",
  verifyTokenAndAuthorization,
  userController.verifyAccount
);

router.delete(
  "/:id",
  verifyTokenAndAuthorization,
  userController.deleteUserById
);

module.exports = router;
