const Rating = require("../models/ratingModel");
const Station = require("../models/stationModel");

module.exports = {
  addRating: async (req, res) => {
    const newRating = new Rating({
      userId: req.user.id,
      rating: req.body.rating,
      product: req.body.product,
      ratingType: req.body.ratingType,
    });

    try {
      await newRating.save();

      if (req.body.ratingType === "Station") {
        const station = await ReportingObserver.aggregate([
          {
            $match: {
              ratingType: req.body.ratingType,
              product: req.body.product,
            },
          },
          { $group: { _id: "$product" }, averageRating: { $avg: "rating" } },
        ]);

        if (station.length > 0) {
          const averageRating = station[0].rating;
          await Station.findByIdAndUpdate(
            req.body.product,
            { rating: averageRating },
            { new: true }
          );
        }
      }
      res
        .status(200)
        .json({ status: true, message: "Ratinng Updated successfully" });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  checkUserRating: async (req, res) => {
    const ratingType = req.query.ratingType;
    const product = req.query.product;

    try {
      const existingRating = await Rating.findOne({
        userId: req.user.id,
        productId: product,
        ratingType: ratingType,
      });

      if (existingRating) {
        res.status(200).json({
          status: true,
          message: "You have alrady rated this restaurant!",
        });
      } else {
        res.status(200).json({
          status: false,
          message: "You have alrady rated this restaurant!",
        });
      }
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
};
