const mongoose = require("mongoose");

const StationSchema = new mongoose.Schema({
  title: {
    type: "string",
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  chagers: {
    type: Array,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  logoUrl: {
    type: String,
    required: false,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 3,
  },
  ratingCount: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  verification: {
    type: String,
    default: "Pending",
    enum: ["Pending", "Verified", "Rejected"],
  },
  verificationMessage: {
    type: String,
    default:
      "Your station is under review. We will notify you once it is verified",
  },
  coords: {
    id: { type: String },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    latitudeDelta: { type: Number, default: 0.0122 },
    longitudeDelta: { type: Number, default: 0.0122 },
    address: { type: String, required: true },
    title: { type: String, required: true },
  },
});

module.exports = mongoose.model("Station", StationSchema);
