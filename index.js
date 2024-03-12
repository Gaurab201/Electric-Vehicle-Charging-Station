const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
var cors = require("cors");
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/users");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
const app = express();

//middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoutes);

// const db = () => {
//   try {
//     mysql.createConnection({
//       host: "localhost",
//       user: "root",
//       password: "",
//       database: "ev-point",
//     });

//     console.log("Connected to MongoDB!");
//   } catch (error) {
//     console.log(error);
//   }
// };

app.listen(process.env.PORT, () => {
  console.log("Example app listening on port !");
  // db();
});
