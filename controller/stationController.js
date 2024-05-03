const db = require("../utils/db.config");
const upload = require("../middleware/imageUpload");

module.exports = {
  // Function to create a new station
  createStation: async (req, res) => {
    const {
      title,
      openingtime,
      chagerType,
      rating,
      ratingCount,
      latitude,
      longitude,
      address,
      code,
    } = req.body;

    const images = req.file.path;

    const insertStationQuery = `
      INSERT INTO Stations (
        title, 
        openingtime, 
        chagerType, 
        rating, 
        ratingCount, 
        images,
        latitude, 
        longitude, 
        address,
        code
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(
      insertStationQuery,
      [
        title,
        openingtime,
        chagerType,
        rating,
        ratingCount,
        images,
        latitude,
        longitude,
        address,
        code,
      ],
      (error, results) => {
        if (error) {
          console.error("Error creating station:", error);
          return res.status(500).json({ message: "Internal server error" });
        }
        res.status(201).json({ message: "Station created successfully" });
      }
    );
  },

  // Function to update an existing station
  updateStation: async (req, res) => {
    const stationId = req.params.id;
    const {
      title,
      openingtime,
      images,
      chagerType,
      totalPorts,
      availablePorts,
      logoUrl,
      rating,
      ratingCount,
      isAvailable,
      StationMessage,
      latitude,
      longitude,
      address,
    } = req.body;

    const updateStationQuery = `
      UPDATE Stations SET 
        title = ?, 
        openingtime = ?, 
        images = ?, 
        chagerType = ?, 
        totalPorts = ?, 
        availablePorts = ?, 
        logoUrl = ?, 
        rating = ?, 
        ratingCount = ?, 
        isAvailable = ?, 
        StationMessage = ?, 
        latitude = ?, 
        longitude = ?, 
        address = ? 
      WHERE id = ?`;

    db.query(
      updateStationQuery,
      [
        title,
        openingtime,
        images,
        chagerType,
        totalPorts,
        availablePorts,
        logoUrl,
        rating,
        ratingCount,
        isAvailable,
        StationMessage,
        latitude,
        longitude,
        address,
        stationId,
      ],
      (error, results) => {
        if (error) {
          console.error("Error updating station:", error);
          return res.status(500).json({ message: "Internal server error" });
        }
        res.status(200).json({ message: "Station updated successfully" });
      }
    );
  },

  // Function to delete a station by ID
  deleteStation: async (req, res) => {
    const stationId = req.params.id;

    const deleteStationQuery = "DELETE FROM Stations WHERE id = ?";

    db.query(deleteStationQuery, [stationId], (error, results) => {
      if (error) {
        console.error("Error deleting station:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
      res.status(200).json({ message: "Station deleted successfully" });
    });
  },

  // Function to get a station by ID
  getStationById: async (req, res) => {
    const stationId = req.params.id;
    const getStationQuery = "SELECT * FROM stations WHERE id = ?";

    db.query(getStationQuery, [stationId], (error, results) => {
      if (error) {
        console.error("Error fetching station:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "Station not found" });
      }
      res.status(200).json(results[0]);
    });
  },

  // Function to get a random station
  getRandomStation: async (req, res) => {
    const getRandomStationQuery = `
    SELECT * FROM Stations ORDER BY RAND() LIMIT 3
  `;
    let randomStation = [];
    db.query(getRandomStationQuery, (error, results) => {
      if (error) {
        console.error("Error fetching random station:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (results.length === 0) {
        return res.status(404).json({
          message: "No available stations found with the provided code",
        });
      }
      res
        .status(200)
        .json({ message: "fetch station sucessfullu", randomStation: results });
    });
  },

  // Function to get all stations near a given location
  getAllNearByStations: async (req, res) => {
    const { latitude, longitude, radius, code } = req.body;

    const getAllNearByStationsQuery = `
        SELECT *, 
        (6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) AS distance 
        FROM Stations 
        WHERE code = ? AND isAvailable = TRUE
        HAVING distance < ? 
        ORDER BY distance
    `;

    db.query(
      getAllNearByStationsQuery,
      [latitude, longitude, latitude, code, radius],
      (error, results) => {
        if (error) {
          console.error("Error fetching nearby stations:", error);
          return res.status(500).json({ message: "Internal server error" });
        }
        res.status(200).json(results);
      }
    );
  },
};
