const db = require("../utils/db.config");
// const generateOtp = require("../utils/otp_generator");
// const sendMail = require("../utils/email_function");
const bcrypt = require("bcryptjs");

module.exports = {
  // Update user details
  updateUser: async (req, res) => {
    const userId = req.params.userId;
    const { username, email, password } = req.body;

    try {
      // Hash password if provided
      let hashedPassword;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      // Update user details in database
      const updateUserQuery =
        "UPDATE user SET username = ?, email = ?, password = ? WHERE userId = ?";
      db.query(
        updateUserQuery,
        [username, email, hashedPassword, userId],
        (error, results) => {
          if (error) {
            console.error("Error updating user:", error);
            res.status(500).json({ message: "Internal server error" });
          } else {
            res.status(200).json({ message: "User updated successfully" });
          }
        }
      );
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Get user by userId
  getUser: (req, res) => {
    const userId = req.params.UserID;
    const getUserQuery = "SELECT * FROM user WHERE UserID = ?";
    db.query(getUserQuery, [userId], (error, results) => {
      if (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Internal server error" });
      } else {
        if (results.length === 0) {
          res.status(404).json({ message: "User not found" });
        } else {
          res.status(200).json(results[0]);
        }
      }
    });
  },

  // Get all users
  getUsers: (req, res) => {
    const getUsersQuery = "SELECT * FROM user";
    db.query(getUsersQuery, (error, results) => {
      if (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Internal server error" });
      } else {
        res.status(200).json(results);
      }
    });
  },

  // Delete user by userId
  deleteUser: (req, res) => {
    const userId = req.params.userId;
    const deleteUserQuery = "DELETE FROM user WHERE userId = ?";
    db.query(deleteUserQuery, [userId], (error, results) => {
      if (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal server error" });
      } else {
        res.status(200).json({ message: "User deleted successfully" });
      }
    });
  },

  // Verify user account with email OTP
  // Function to verify user account
  verifyAccount: async (req, res) => {
    const { otp } = req.params; // Getting OTP from URL parameters
    const email = req.user.email; // The user's email is retrieved from the verification middleware

    // Check if user exists and verify OTP
    db.query(
      "SELECT * FROM user WHERE email = ? AND otp = ?",
      [email, otp],
      (error, results) => {
        if (error) {
          console.error("Error verifying account:", error);
          return res.status(500).json({ message: "Internal server error" });
        }

        if (results.length === 0) {
          return res.status(404).json({ message: "Invalid OTP" });
        }

        // Update verification status and remove OTP
        const updateQuery =
          "UPDATE user SET verification = TRUE, otp = NULL WHERE email = ?";
        db.query(updateQuery, [email], (updateError, updateResults) => {
          if (updateError) {
            console.error("Error updating verification status:", updateError);
            return res.status(500).json({ message: "Internal server error" });
          }

          res.status(200).json({ message: "Account verified successfully" });
        });
      }
    );
  },
};
