const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: false,
      default: "none",
    },
    password: {
      type: String,
      required: true,
    },
    verification: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      default: "9827133807",
    },
    phoneVerification: {
      type: Boolean,
      default: false,
    },
    vehicle: {
      type: String,
      ref: "vehicle",
      required: false,
    },
    address: {
      type: String,
      ref: "Address",
      required: false,
    },
    userType: {
      type: String,
      required: true,
      default: "Client",
      enum: ["Client", "Admin", "StationManager"],
    },
    profile: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-png%2Fprofile&psig=AOvVaw3H5wYva9RqTHhHMJ3cZX86&ust=1709647405040000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCOCZ34Tj2oQDFQAAAAAdAAAAABAU",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
