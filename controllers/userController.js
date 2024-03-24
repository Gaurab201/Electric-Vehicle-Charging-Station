const db = require("../utils/connect");

module.exports = {
  getUserById: async (req, res) => {
    const userID = req.params.userid;

    const getUserQuery = "SELECT * FROM users WHERE userid = ?";
    db.query(getUserQuery, [userID], (error, results) => {
      if (error) {
        console.error("Error getting user:", error);
        res.status(500).json({ message: "Internal server error" });
      } else {
        if (results.length > 0) {
          res.status(200).json({ user: results[0] });
        } else {
          res.status(404).json({ message: "User not found" });
        }
      }
    });
  },

  getuser: async (req, res) => {},

  // Verify Account by OTP
  verifyAccount: async (req, res) => {
    const { userId, otp } = req.body;

    try {
      // Retrieve user from the database
      const getUserQuery = "SELECT * FROM users WHERE userid = ?";
      db.query(getUserQuery, [userId], async (error, results) => {
        if (error) {
          console.error("Error verifying account:", error);
          return res
            .status(500)
            .json({ status: false, message: "Internal server error" });
        }

        if (results.length === 0) {
          return res
            .status(404)
            .json({ status: false, message: "User not found" });
        }

        const user = results[0];

        // Check if OTP matches
        if (otp === user.otp) {
          // Update user verification status and remove OTP
          const updateUserQuery =
            "UPDATE users SET verification = true, otp = NULL WHERE userid = ?";
          db.query(updateUserQuery, [userId], (error, results) => {
            if (error) {
              console.error("Error updating user verification:", error);
              return res
                .status(500)
                .json({ status: false, message: "Internal server error" });
            }
            return res
              .status(200)
              .json({ status: true, message: "Account verified successfully" });
          });
        } else {
          return res
            .status(400)
            .json({ status: false, message: "Invalid OTP" });
        }
      });
    } catch (error) {
      console.error("Error in verifyAccount:", error);
      return res
        .status(500)
        .json({ status: false, message: "Internal server error" });
    }
  },

  deleteUserById: async (req, res) => {
    const userId = req.params.userid;

    const deleteUserQuery = "DELETE FROM users WHERE userid = ?";
    db.query(deleteUserQuery, [userId], (error, results) => {
      if (error) {
        res
          .status(500)
          .json({ status: false, message: "Internal server error" });
      } else {
        res.status(200).json({
          status: true,
          message: "User deleted successfully",
        });
      }
    });
  },
};
