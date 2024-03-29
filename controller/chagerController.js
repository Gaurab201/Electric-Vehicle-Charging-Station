const Chager = require("../models/chagerModel");

module.exports = {
  addChager: async (req, res) => {
    const { title } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ status: false, message: "You have a missing Fields" });
    }

    try {
      const newChager = new Chager(req.body);

      await newChager.save();
      res
        .status(200)
        .json({ status: true, message: "Food saved successfully" });
    } catch (err) {
      response.status(404).json({ status: false, message: err.message });
    }
  },
};
