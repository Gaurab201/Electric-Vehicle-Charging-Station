const mongoose = require("mongoose");

const StationSchema = new mongoose.Schema({
  title: {
    type: "string",
    required: true,
  },
  openingtime: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  chagerType: {
    type: Array,
    required: true,
  },
  totalPorts: {
    type: String,
    required: false,
    default: "3",
  },
  availablePorts: {
    type: String,
    default: "2",
    required: false,
  },
  chager: {
    type: mongoose.Schema.Types.ObjectId,
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
    default: "120",
    required: false,
  },
  isAvailable: {
    type: Boolean,
    default: "true",
  },
  StationMessage: {
    type: String,
    default: "Your station chager are under construction",
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
