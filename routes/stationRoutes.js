const router = require("express").Router();
const station = require("../controller/stationController");
const { verifyTokenAndAuthorization } = require("../middleware/verifyToken");

router.post("/", verifyTokenAndAuthorization, station.addStation);

module.exports = router;
