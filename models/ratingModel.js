const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  ratingType: {
    type: String,
    required: true,
    enum: ["Station", "Chager"],
  },
  product: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
});

module.exports = mongoose.model("Rating", RatingSchema);
