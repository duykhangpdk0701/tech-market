const OrderDetail = require("../model/OrderDetail");
const { endOfDay, startOfDay } = require("date-fns");
const Order = require("../model/Order");

class Chart {
  year = async (req, res) => {
    try {
      const chart = await OrderDetail.aggregate([
        {
          $lookup: {
            from: "products",
            localField: "product",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            count: { $sum: "$quantity" },
          },
        },
        {
          $group: {
            _id: { year: "$_id.year" },
            monthlyusage: {
              $push: {
                month: "$_id.month",
                quantity: "$count",
              },
            },
          },
        },
      ]);

      res.json({
        success: true,
        chart: chart,
      });
    } catch (error) {
      res.status(500).json({ success: false, messages: error });
    }
  };

  category = async (req, res) => {
    try {
      const chart = await OrderDetail.aggregate([
        {
          $lookup: {
            from: "products",
            localField: "product",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $unwind: "$product",
        },
        {
          $lookup: {
            from: "categories",
            localField: "product.category",
            foreignField: "_id",
            as: "product.category",
          },
        },
        {
          $unwind: "$product.category",
        },

        {
          $group: {
            _id: {
              category: "$product.category._id",
              name: "$product.category.name",
            },
            count: { $sum: "$quantity" },
          },
        },
      ]);

      res.json({
        success: true,
        chart: chart,
      });
    } catch (error) {
      res.status(500).json({ success: false, messages: error });
    }
  };

  byAmountOfDate = async (req, res) => {
    try {
      const { startDate, endDate } = req.body;

      const chart = await OrderDetail.aggregate([
        {
          $project: {
            formattedDate: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
            },
          },
        },
        {
          $match: {
            formattedDate: {
              $gte: startOfDay(new Date(startDate)),
              $lte: endOfDay(new Date(endDate)),
            },
          },
        },
      ]);

      res.json({
        success: true,
        chart: chart,
      });
    } catch (error) {
      res.status(500).json({ success: false, messages: error });
    }
  };
}

module.exports = new Chart();
