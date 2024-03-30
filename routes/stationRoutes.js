const router = require("express").Router();
const station = require("../controller/stationController");
const { verifyTokenAndAuthorization } = require("../middleware/verifyToken");

router.post("/", verifyTokenAndAuthorization, station.addStation);

router.get("/:code", station.getRandomStations);

router.get("/all/:code", station.getAllNearByStations);

router.get("/byId/:id", station.getStationById);

module.exports = router;
