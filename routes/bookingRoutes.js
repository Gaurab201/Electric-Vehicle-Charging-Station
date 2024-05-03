const router = require("express").Router();
const orderController = require("../controller/bookingController");
const verification = require("../middleware/verifyToken");

router.post(
  "/",

  orderController.placeBooking
);

router.get("/:UserID", orderController.getUserBooking);

module.exports = router;
