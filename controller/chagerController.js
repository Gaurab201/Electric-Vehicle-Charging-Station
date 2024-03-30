const Chager = require("../models/chagerModel");

module.exports = {
  addChager: async (req, res) => {
    const { time, power, price, chagerType } = req.body;

    if (!time || !power || !price || !chagerType) {
      return res
        .status(400)
        .json({ status: false, message: "You have a missing Fields" });
    }

    try {
      const newChager = new Chager(req.body);

      await newChager.save();
      res
        .status(200)
        .json({ status: true, message: "Chager saved successfully" });
    } catch (err) {
      res.status(404).json({ status: false, message: err.message });
    }
  },

  getChagerById: async (req, res) => {
    const id = req.params.id;
    try {
      const chagers = await Chager.findById(id);

      res.status(200).json(chagers);
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
};
