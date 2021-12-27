const OrderDetail = require("../model/OrderDetail");
const Order = require("../model/Order");

class Chart {
  year = async (req, res) => {
    try {
      const chart = await Order.aggregate([
        { $match: { status: 3 } },
        {
          $unwind: "$orderDetail",
        },
        {
          $group: {
            _id: null,
            orderDetail: { $push: "$orderDetail" },
          },
        },
        {
          $project: {
            _id: 0,
          },
        },

        {
          $lookup: {
            from: "orderdetails",
            localField: "orderDetail",
            foreignField: "_id",
            as: "orderDetail",
          },
        },
        {
          $unwind: "$orderDetail",
        },

        {
          $group: {
            _id: {
              year: { $year: "$orderDetail.createdAt" },
              month: { $month: "$orderDetail.createdAt" },
            },
            count: { $sum: "$orderDetail.quantity" },
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

  year2 = async (req, res) => {
    try {
      const chart = await Order.aggregate([
        { $match: { status: 3 } },
        {
          $unwind: "$orderDetail",
        },
        {
          $group: {
            _id: null,
            orderDetail: { $push: "$orderDetail" },
          },
        },
        {
          $project: {
            _id: 0,
          },
        },

        {
          $lookup: {
            from: "orderdetails",
            localField: "orderDetail",
            foreignField: "_id",
            as: "orderDetail",
          },
        },
        {
          $unwind: "$orderDetail",
        },

        {
          $lookup: {
            from: "products",
            localField: "orderDetail.product",
            foreignField: "_id",
            as: "orderDetail.product",
          },
        },
        {
          $unwind: "$orderDetail.product",
        },

        {
          $lookup: {
            from: "categories",
            localField: "orderDetail.product.category",
            foreignField: "_id",
            as: "orderDetail.product.category",
          },
        },
        {
          $unwind: "$orderDetail.product.category",
        },

        {
          $group: {
            _id: {
              category: "$orderDetail.product.category._id",
              name: "$orderDetail.product.category.name",
            },
            count: { $sum: "$orderDetail.quantity" },
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
      const chart = await Order.aggregate([
        { $match: { status: 3 } },
        {
          $unwind: "$orderDetail",
        },
        {
          $group: {
            _id: null,
            orderDetail: { $push: "$orderDetail" },
          },
        },
        {
          $project: {
            _id: 0,
          },
        },

        {
          $lookup: {
            from: "orderdetails",
            localField: "orderDetail",
            foreignField: "_id",
            as: "orderDetail",
          },
        },
        {
          $unwind: "$orderDetail",
        },

        {
          $lookup: {
            from: "products",
            localField: "orderDetail.product",
            foreignField: "_id",
            as: "orderDetail.product",
          },
        },
        {
          $unwind: "$orderDetail.product",
        },

        {
          $lookup: {
            from: "categories",
            localField: "orderDetail.product.category",
            foreignField: "_id",
            as: "orderDetail.product.category",
          },
        },
        {
          $unwind: "$orderDetail.product.category",
        },

        {
          $group: {
            _id: {
              category: "$orderDetail.product.category._id",
              name: "$orderDetail.product.category.name",
            },
            count: { $sum: "$orderDetail.quantity" },
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

      const chart = await Order.aggregate([
        {
          $project: {
            orderDetail: 1,
            count: { $size: "$orderDetail" },
            formattedDate: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
            },
          },
        },
        {
          $match: {
            formattedDate: {
              $gte: startDate,
              $lte: endDate,
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
