const router = require("express").Router();
const ratingController = require("../controller/ratingController");
const { verifyTokenAndAuthorization } = require("../middleware/verifyToken");

router.post("/", verifyTokenAndAuthorization, ratingController.addRating);

router.get("/", verifyTokenAndAuthorization, ratingController.checkUserRating);

module.exports = router;
