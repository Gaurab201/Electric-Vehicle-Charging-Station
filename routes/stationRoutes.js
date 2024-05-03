const express = require("express");
const router = express.Router();
const stationController = require("../controller/stationController");
const upload = require("../middleware/imageUpload");
const verification = require("../middleware/verifyToken");

// Route to create a new station
router.post(
  "/",
  upload,
  verification.verifyStationManager,
  stationController.createStation
);

// Route to update an existing station
router.put(
  "/:id",
  verification.verifyStationManager,
  stationController.updateStation
);

// Route to delete a station by ID
router.delete("/:id", stationController.deleteStation);

// Route to get a station by ID
router.get(
  "/:id",
  verification.verifyTokenAndAuthorization,
  stationController.getStationById
);

// Route to get a random station
router.get(
  "/",
  // verification.verifyTokenAndAuthorization,
  stationController.getRandomStation
);

// Route to get all stations near a given location
router.post(
  "/nearby",
  verification.verifyTokenAndAuthorization,
  stationController.getAllNearByStations
);

module.exports = router;
