const db = require("../utils/db.config");

module.exports = {
  // Function to place a booking
  placeBooking: async (req, res) => {
    const {
      UserID,
      id,
      ChargerID,
      StartTime,
      EndTime,
      ArrivalTime,
      PaymentStatus,
      PaymentMethod,
      PaymentAmount,
    } = req.body;

    // Check if the charger is available for booking during the specified time range
    const checkBookingQuery = `
      SELECT * 
      FROM Booking 
      WHERE ChargerID = ? 
      AND (
          (StartTime <= ? AND EndTime >= ?) OR 
          (StartTime <= ? AND EndTime >= ?) OR 
          (StartTime <= ? AND EndTime >= ?)
      )
    `;

    db.query(
      checkBookingQuery,
      [ChargerID, StartTime, StartTime, EndTime, EndTime, StartTime, EndTime],
      (error, results) => {
        if (error) {
          console.error("Error checking charger availability:", error);
          return res.status(500).json({ message: "Internasl server error" });
        }

        if (results.length > 0) {
          // Charger is already booked during the specified time range
          return res.status(400).json({
            message: "Charger is already booked during this time range",
          });
        }

        // If the charger is available, proceed with placing the booking
        const placeBookingQuery = `
          INSERT INTO Booking (UserID, id, ChargerID, StartTime, EndTime, ArrivalTime, PaymentStatus, PaymentMethod, PaymentAmount) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(
          placeBookingQuery,
          [
            UserID,
            id,
            ChargerID,
            StartTime,
            EndTime,
            ArrivalTime,
            PaymentStatus,
            PaymentMethod,
            PaymentAmount,
          ],
          (error, results) => {
            if (error) {
              console.error("Error placing booking:", error);
              return res.status(500).json({ message: "Internal server error" });
            }

            // Update the charger status to 'Booking'
            const updateChargerStatusQuery = `
              UPDATE Charger
              SET ChargerStatus = 'Booking'
              WHERE ChargerID = ?
            `;

            db.query(
              updateChargerStatusQuery,
              [ChargerID],
              (error, results) => {
                if (error) {
                  console.error("Error updating charger status:", error);
                  return res
                    .status(500)
                    .json({ message: "Internal server error" });
                }

                res
                  .status(200)
                  .json({ message: "Booking placed successfully" });
              }
            );
          }
        );
      }
    );
  },

  // Function to get bookings for a specific user
  getUserBooking: async (req, res) => {
    const { UserID } = req.params;

    const getUserBookingQuery = `
      SELECT b.*, c.ChagerStatus
      FROM Booking b
      LEFT JOIN Charger c ON b.ChargerID = c.ChargerID
      WHERE b.UserID = ?
    `;

    db.query(getUserBookingQuery, [UserID], (error, results) => {
      if (error) {
        console.error("Error fetching user bookings:", error);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (results.length === 0) {
        return res
          .status(404)
          .json({ message: "No bookings found for the user" });
      }

      // Map results to include payment status and booking status
      const userBookings = results.map((booking) => ({
        BookingID: booking.BookingID,
        UserID: booking.UserID,
        id: booking.id,
        ChargerID: booking.ChargerID,
        StartTime: booking.StartTime,
        EndTime: booking.EndTime,
        ArrivalTime: booking.ArrivalTime,
        PaymentStatus: booking.PaymentStatus,
        PaymentMethod: booking.PaymentMethod,
        PaymentAmount: booking.PaymentAmount,
        BookingStatus: booking.BookingStatus, // Assuming ChagerStatus represents the booking status
      }));

      res.status(200).json({ userBookings });
    });
  },
};

// Function to send email notification to user
const sendEmailNotificationToUser = (userId, notification) => {
  const mailOptions = {
    from: "your_email_address",
    to: "user_email_address",
    subject: notification.subject,
    text: notification.text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error("Error sending email notification:", error);
    } else {
      console.log("Email notification sent:", info.response);
    }
  });
};
