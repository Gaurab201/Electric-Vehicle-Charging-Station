const sql = require("mysql");

// MySQL database connection setup
const db = sql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "ev_point",
  },
  console.log("Connection established on mysql database")
);

module.exports = db;
