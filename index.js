const express = require("express");
const dotenv = require("dotenv");
var cors = require("cors");
const db = require("./utils/db.config");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/userRoutes");
const stationRoutes = require("./routes/stationRoutes");
const chagerRoutes = require("./routes/chagerRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const locationRoutes = require("./routes/locationRoutes");

dotenv.config();

const app = express();

db.connect((err) => {
  if (err) throw err;
});

//middlewares
// app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static("./images"));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/stations", stationRoutes);
app.use("/api/chagers", chagerRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/location", locationRoutes);

app.get("/", (req, res) => {
  res.send("This is ev back server working fine");
});

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(process.env.PORT, () => {
  console.log("Example app listening on port !");
});
