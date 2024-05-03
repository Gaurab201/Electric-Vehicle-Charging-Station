const db = require("../utils/db.config");

module.exports = {
  addLocation: async (req, res) => {
    const { UserID, LocationName, Latitude, Longitude } = req.body;

    const insertLocationQuery = `
          INSERT INTO Location (
            UserID,
            LocationName,
            Latitude,
            Longitude
          ) VALUES (?, ?, ?, ?)`;

    db.query(
      insertLocationQuery,
      [UserID, LocationName, Latitude, Longitude],
      (error, results) => {
        if (error) {
          console.error("Error adding location:", error);
          return res.status(500).json({ message: "Internal server error" });
        }

        res.status(200).json({ message: "Location added successfully" });
      }
    );
  },

  getAddressById: async (req, res) => {
    const locationId = req.params.locationId;

    const getLocationQuery = `
      SELECT * FROM Location WHERE LocationID = ?`;

    db.query(getLocationQuery, [locationId], (error, results) => {
      if (error) {
        console.error("Error getting location:", error);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Location not found" });
      }

      const location = results[0];
      res.status(200).json({ location });
    });
  },

  deleteLocation: async (req, res) => {
    const locationId = req.params.locationId;

    const deleteLocationQuery = `
      DELETE FROM Location WHERE LocationID = ?`;

    db.query(deleteLocationQuery, [locationId], (error, results) => {
      if (error) {
        console.error("Error deleting location:", error);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Location not found" });
      }

      res.status(200).json({ message: "Location deleted successfully" });
    });
  },
};
