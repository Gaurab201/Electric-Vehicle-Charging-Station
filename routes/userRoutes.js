const express = require("express");
const router = express.Router();
const authcontroller = require("../controller/userController");
const verification = require("../middleware/verifyToken");

router.post(
  "/:id ",
  verification.verifyTokenAndAuthorization,
  authcontroller.updateUser
);

router.delete("/:id", authcontroller.deleteUser);
//get
router.get(
  "/:UserID",

  verification.verifyTokenAndAuthorization,
  authcontroller.getUser
);
//get alls
router.get(
  "/",
  verification.verifyTokenAndAuthorization,
  authcontroller.getUsers
);

router.get(
  "/verify/:otp",

  verification.verifyTokenAndAuthorization,
  authcontroller.verifyAccount
);

module.exports = router;
