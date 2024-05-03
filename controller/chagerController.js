const db = require("../utils/db.config");

module.exports = {
  // Function to add a charger
  addCharger: async (req, res) => {
    const { id, ChargerType, Price, power } = req.body;

    const addChargerQuery = `
      INSERT INTO Charger (id, ChargerType, Price, power) 
      VALUES (?, ?, ?, ?)`;

    db.query(
      addChargerQuery,
      [id, ChargerType, Price, power],
      (error, results) => {
        if (error) {
          console.error("Error adding charger:", error);
          return res.status(500).json({ message: "Internal server error" });
        }
        res.status(201).json({ message: "Charger added successfully" });
      }
    );
  },

  // Function to get a charger by ID
  getChargerById: async (req, res) => {
    const chargerId = req.params.id;

    const getChargerQuery = "SELECT * FROM Charger WHERE ChargerID = ?";

    db.query(getChargerQuery, [chargerId], (error, results) => {
      if (error) {
        console.error("Error fetching charger:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "Charger not found" });
      }
      res.status(200).json({ chager: results[0] });
    });
  },

  getChargerByStation: async (req, res) => {
    const stationId = req.params.id;

    const getChargersQuery = "SELECT * FROM Charger WHERE id = ?";

    db.query(getChargersQuery, [stationId], (error, results) => {
      if (error) {
        console.error("Error fetching chargers for station:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (results.length === 0) {
        return res
          .status(404)
          .json({ message: "No chargers found for the given station ID" });
      }
      res.status(200).json({ chargers: results });
    });
  },

  getAllChargers: async (req, res) => {
    // SQL query to fetch all chargers from the Charger table
    const query = "SELECT * FROM Charger";

    // Execute the query
    db.query(query, (error, results) => {
      if (error) {
        // Handle error and return a 500 internal server error response
        console.error("Error fetching chargers:", error);
        return res.status(500).json({ message: "Internal server error" });
      }

      // Return all chargers as a JSON response with a 200 OK status
      res.status(200).json({ chargers: results });
    });
  },
};
