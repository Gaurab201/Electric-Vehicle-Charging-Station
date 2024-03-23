const express = require("express");
const dotenv = require("dotenv");
var cors = require("cors");
const cookieParser = require("cookie-parser");
require("./utils/connect");
const bodyParser = require("body-parser");

const userRoute = require("./routes/users");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
const app = express();

//middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log("Example app listening on port !");
  // console.log("database connected sucessfully");
});
