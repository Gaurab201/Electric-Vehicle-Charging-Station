const express = require("express");
const router = express.Router();
const generateOtp = require("../utils/otp_generator");
const sendMail = require("../utils/emai_function");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const db = require("../utils/db.config");

module.exports = {
  register: async (req, res) => {
    const { username, email, password } = req.body;

    // Check if user already exists
    const checkUserQuery = "SELECT * FROM user WHERE email = ?";
    db.query(checkUserQuery, [email], async (error, results) => {
      if (error) {
        console.error("Error checking user:", error);
        res.status(500).json({ message: "Internal server error" });
      } else {
        if (results.length > 0) {
          res.status(400).json({ message: "User already exists" });
        } else {
          // Generate OTP
          const otp = generateOtp(); // Call generateOtp function to get OTP
          // Hash password
          const hashedPassword = await bcrypt.hash(password, 10);

          // Save user to database
          const insertUserQuery =
            "INSERT INTO user (username, email, password, otp) VALUES (?, ?, ?, ?)";
          db.query(
            insertUserQuery,
            [username, email, hashedPassword, otp],

            async (error, results) => {
              if (error) {
                console.error("Error registering user:", error);
                res.status(500).json({ message: "Internal server error" });
              } else {
                // Send OTP email
                sendMail(email, otp);
                res.status(200).json({
                  status: true,
                  message: "User registered successfully",
                });
              }
            }
          );
        }
      }
    });
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    // Fetch user from database using email
    db.query("SELECT * FROM user WHERE email = ?", email, (error, results) => {
      if (error) {
        console.error("Error fetching user: " + error.stack);
        return res.status(500).json({ message: "Error logging in" });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const user = results[0];

      // Compare password with hashed password from the database
      bcrypt.compare(password, user.password, (err, passwordMatch) => {
        if (err || !passwordMatch) {
          return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign(
          { userId: user.UserID, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        const { ...others } = results[0];

        res.status(200).json({
          message: "login Succesfull",
          userdetails: { ...others },
          token,
        });
      });
    });
  },
};
