const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
var cors = require("cors");

const cookieParser = require("cookie-parser");
// const path = require("path");

dotenv.config();

const app = express();
//middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


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
    console.log("khanikura is Connected to database");
  } catch (error) {
    console.log(error);
  }
};

app.listen(process.env.PORT || 3000, () => {
  connect();
  console.log("khanikura backend is running on port", process.env.PORT);
});

