const mongoose = require("mongoose");

const ChagerSchema = new mongoose.Schema({
  time: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "available",
    enum: ["available", "booking"],
  },
  chagerType: {
    type: Array,
    required: true,
  },
  power: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Chager", ChagerSchema);
