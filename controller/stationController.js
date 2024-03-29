const Station = require("../models/stationModel");

module.exports = {
  addStation: async (req, res) => {
    const { title, time, code, chagers, ratingCount, coords } = req.body;

    if (
      !title ||
      !time ||
      !code ||
      !chagers ||
      !ratingCount ||
      !coords.latitude ||
      !coords.longitude ||
      !coords.address ||
      !coords.title
    ) {
      return res
        .status(400)
        .json({ status: false, message: "You have a missing field" });
    }
    try {
      const newStation = new Station(req.body);

      await newStation.save();
      res
        .status(200)
        .json({ status: true, message: "Station saved successfully" });
    } catch (error) {
      res.status(400).json({ status: false, message: error.message });
    }
  },

  getStationById: async (req, res) => {
    const id = req.params.id;
    try {
      const station = await Station.findById(id);

      res.status(200).json(station);
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  getRandomStations: async (req, res) => {
    const code = req.params.code;
    try {
      let randomStation = [];

      if (code) {
        randomStation = await Station.aggregate([
          { $match: { code: code, isAvailable: true } },
          { $sample: { size: 5 } },
          { $project: { __v: 0 } },
        ]);
      }
      if (randomStation.length === 0) {
        randomStation = Station.aggregate([
          { $match: { isAvailable: true } },
          { $sample: { size: 5 } },
          { $project: { __v: 0 } },
        ]);
      }

      res.status(200).json(randomStation);
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },

  getAllNearByStations: async (req, res) => {
    const code = req.params.code;
    try {
      let allNearByStations = [];

      if (code) {
        allNearByStations = await Station.aggregate([
          { $match: { code: code, isAvailable: true } },
          { $project: { __v: 0 } },
        ]);
      }

      if (allNearByStations.length === 0) {
        allNearByStations = await Station.aggregate([
          { $match: { isAvailable: true } },
          { $project: { __v: 0 } },
        ]);
      }

      res.status(200).json(allNearByStations);
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },
};
