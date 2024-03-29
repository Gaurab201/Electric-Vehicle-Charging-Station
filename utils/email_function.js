const nodemailer = require("nodemailer");

async function sendEmail(userEmail, message) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: userEmail,
    subject: "Electriv Vehicle Charging Station Verification Code",
    html: `<h1> Electric vehicle charging station Email Verification Code</h1>
    <p> Your verification code is:</p>
    <h2 style="color: blue">${message}</h2>
    <p> Please enter your verification code to complete your registration process.</p>
    <p> If you did not request this email, please ingore this email.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);

    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email sent error: " + error);
  }
}

module.exports = sendEmail;
