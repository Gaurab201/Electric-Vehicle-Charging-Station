const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const AuthRoute = require("./routes/authRoutes");
const UserRoute = require("./routes/userRoutes");
const StationRoutes = require("./routes/stationRoutes");
const ChagerRoutes = require("./routes/chagerRoutes");

dotenv.config();

const app = express();
//middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/", AuthRoute);
app.use("/api/users", UserRoute);
app.use("/api/stations", StationRoutes);
app.use("/api/chagers", ChagerRoutes);

app.get("/", (req, res) => {
  res.send("This is ev back server working fine");
});

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      // useCreateIndex: true,
    });
    console.log("Electric Vehicle charging is Connected to database");
  } catch (error) {
    console.log(error);
  }
};

app.listen(process.env.PORT || 6013, () => {
  connect();
  console.log("khanikura backend is running on port", process.env.PORT);
});
