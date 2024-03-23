const db = require("../utils/connect");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/email_function");

module.exports = {
  register: async (req, res) => {
    const { username, email, password } = req.body;

    // Check if user already exists
    const checkUserQuery = "SELECT * FROM users WHERE email = ?";
    db.query(checkUserQuery, [email], async (error, results) => {
      if (error) {
        console.error("Error checking user:", error);
        res.status(500).json({ message: "Internal server error" });
      } else {
        if (results.length > 0) {
          res.status(400).json({ message: "User already exists" });
        } else {
          // Generate OTP
          const otp = Math.floor(100000 + Math.random() * 900000);

          // Hash password
          const hashedPassword = await bcrypt.hash(password, 10);

          // Save user to database
          const insertUserQuery =
            "INSERT INTO users (username, email, password, otp) VALUES (?, ?, ?, ?)";
          db.query(
            insertUserQuery,
            [username, email, hashedPassword, otp],
            async (error, results) => {
              if (error) {
                console.error("Error registering user:", error);
                res.status(500).json({ message: "Internal server error" });
              } else {
                sendMail(email, otp);

                res
                  .status(200)
                  .json({ status: true, message: "User register sucessfully" });
              }
            }
          );
        }
      }
    });
  },

  login: async (req, res) => {
    const q = "SELECT * FROM users WHERE email = ?";

    db.query(q, [req.body.email], async (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("User not found!");

      const checkPassword = await bcrypt.compare(
        req.body.password,
        data[0].password
      );

      if (!checkPassword === req.body.password) {
        return res.status(400).json("Wrong password or username!");
      }

      const token = jwt.sign(
        { id: data[0].id, user_type: data[0].user_type, email: data[0].email },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      const { password, ...others } = data[0];

      res
        .cookie("accessToken", token, {
          httpOnly: true,
        })
        .status(200)
        .json({
          message: "login sucessfull",
          others,
        });
    });
  },
  logout: async (req, res) => {
    res.send("Welcome");
  },
};
