const mongoose = require("mongoose");

const ChagerSchema = new mongoose.Schema({
  title: {
    type: "string",
    required: true,
  },
});

module.exports = mongoose.model("Chager", ChagerSchema);
