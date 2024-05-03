const express = require("express");
const router = express.Router();
const locationController = require("../controller/locationController");

// Route to create a new station
router.post("/", locationController.addLocation);

router.get("/:locationId", locationController.getAddressById);

router.delete("/:locationId", locationController.deleteLocation);

module.exports = router;
