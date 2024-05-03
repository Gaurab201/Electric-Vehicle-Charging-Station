const express = require("express");
const router = express.Router();
const chager = require("../controller/chagerController");

router.post("/", chager.addCharger);

router.get("/:id", chager.getChargerById);

router.get("/station-chager/:id", chager.getChargerByStation);

router.get("/", chager.getAllChargers);

module.exports = router;
