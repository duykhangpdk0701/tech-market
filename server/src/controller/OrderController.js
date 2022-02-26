const OrderDetail = require("../model/OrderDetail");
const Order = require("../model/Order");
const mongoose = require("mongoose");

class OrderController {
  async showAll(req, res) {
    try {
      const orders = await Order.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" },

        {
          $lookup: {
            from: "orderdetails",
            localField: "orderDetail",
            foreignField: "_id",
            as: "orderDetail",
          },
        },

        // {
        //   $lookup: {
        //     from: "products",
        //     localField: "orderDetail.product",
        //     foreignField: "_id",
        //     as: "orderDetail.product",
        //   },
        // },
      ]);

      res.json({ success: true, orders });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, messages: "Interval server error" });
    }
  }

  async show(req, res) {
    const { id } = req.params;
    try {
      const order = await Order.aggregate([
        {
          $lookup: {
            from: "orderdetails",
            localField: "orderDetail",
            foreignField: "_id",
            as: "orderDetail",
          },
        },
        { $match: { _id: mongoose.Types.ObjectId(id) } },
        {
          $lookup: {
            from: "products",
            localField: "orderDetail.product",
            foreignField: "_id",
            as: "newProduct",
          },
        },

        // { $unwind: "$orderDetail.product" },
      ]);
      res.json({ success: true, order: order[0] });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, messages: "Interval server error" });
    }
  }

  async store(req, res) {
    if (!req.body.products) {
      return res
        .status(401)
        .json({ success: false, messages: "Order have no item" });
    }
    let orderDetailId = [];
    let totalPrice = 0;
    try {
      for (const product of req.body.products) {
        const orderDetail = new OrderDetail(product);
        await orderDetail.save();
        orderDetailId.push(orderDetail._id);
        totalPrice += orderDetail.quantity * orderDetail.price;
      }
      const newOrder = new Order({
        ...req.body,
        orderDetail: orderDetailId,
        totalPrice,
      });
      await newOrder.save();
      res.json({
        success: true,
        messages: "Add successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        messages: "Interval server error" + error.message,
      });
    }
  }

  // Chua xu ly update
  // async update(req, res) {
  //     const { id } = req.params;
  //     if (!id)
  //         return res.status(401).json({ success: false, messages: "Missing id" });
  //     try {
  //         const order = await Order.updateOne({ _id: id }, req.body, { new: true });
  //         if (!order)
  //             return res.json({ success: false, messages: "Cant update order" });
  //         res.json({ success: true, messages: "Update successfully" });
  //     } catch (error) {
  //         res.status(500).json({ success: false, messages: error.message });
  //     }
  // }

  async delete(req, res) {
    const { id } = req.params;
    if (!id)
      return res.status(401).json({ success: false, messages: "Missing id" });
    try {
      const order = await Order.deleteOne({ _id: id });
      if (!order)
        return res
          .status(401)
          .json({ success: false, messages: "Cant delete order" });
      res.json({ success: true, messages: "Delete successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, messages: "Interval server error" });
    }
  }

  async setStatus(req, res) {
    try {
      const { id, status } = req.body;
      console.log(req.body);

      if (!id)
        return res.status(401).json({ success: false, messages: "Missing id" });
      const order = await Order.findByIdAndUpdate(id, { status }).exec(
        (error, resOrder) => {
          if (error) {
            res
              .status(500)
              .json({ success: false, messages: "Interval server error" });
          }
          res.json({
            success: true,
            order: { ...resOrder._doc, status: status },
            messages: "update status successfully",
          });
        },
      );
    } catch (error) {
      res
        .status(500)
        .json({ success: false, messages: "Interval server error" });
    }
  }

  showAllDate = async (req, res) => {
    try {
      const orders = await Order.aggregate([
        {
          $project: {
            user: 1,
            status: 1,
            orderDetail: 1,
            address: 1,
            paymentMethod: 1,
            totalPrice: 1,
            formattedDate: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
            },
          },
        },
        { $match: { status: 3 } },
        {
          $lookup: {
            from: "orderdetails",
            localField: "orderDetail",
            foreignField: "_id",
            as: "orderDetail",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" },
      ]);

      const sum = await Order.aggregate([
        {
          $project: {
            user: 1,
            status: 1,
            orderDetail: 1,
            address: 1,
            paymentMethod: 1,
            totalPrice: 1,
            formattedDate: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
            },
          },
        },
        { $match: { status: 3 } },
        {
          $group: {
            _id: null,
            total: {
              $sum: "$totalPrice",
            },
          },
        },
      ]);

      res.json({
        success: true,
        orders: orders,
        sum: sum[0].total,
      });
    } catch (error) {
      res.status(500).json({ success: false, messages: error });
    }
  };

  byDate = async (req, res) => {
    try {
      const { date } = req.body;

      const orders = await Order.aggregate([
        {
          $project: {
            user: 1,
            status: 1,
            orderDetail: 1,
            address: 1,
            paymentMethod: 1,
            totalPrice: 1,
            formattedDate: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
            },
          },
        },
        { $match: { formattedDate: date } },
        { $match: { status: 3 } },
        {
          $lookup: {
            from: "orderdetails",
            localField: "orderDetail",
            foreignField: "_id",
            as: "orderDetail",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" },
      ]);

      const sum = await Order.aggregate([
        {
          $project: {
            user: 1,
            status: 1,
            orderDetail: 1,
            address: 1,
            paymentMethod: 1,
            totalPrice: 1,
            formattedDate: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
            },
          },
        },
        { $match: { formattedDate: date } },
        { $match: { status: 3 } },
        {
          $group: {
            _id: null,
            total: {
              $sum: "$totalPrice",
            },
          },
        },
      ]);

      res.json({
        success: true,
        orders: orders,
        sum: sum[0].total,
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
            user: 1,
            status: 1,
            orderDetail: 1,
            address: 1,
            paymentMethod: 1,
            totalPrice: 1,
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
        { $match: { status: 3 } },
        {
          $lookup: {
            from: "orderdetails",
            localField: "orderDetail",
            foreignField: "_id",
            as: "orderDetail",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" },
      ]);

      const sum = await Order.aggregate([
        {
          $project: {
            user: 1,
            status: 1,
            orderDetail: 1,
            address: 1,
            paymentMethod: 1,
            totalPrice: 1,
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
        { $match: { status: 3 } },
        {
          $group: {
            _id: null,
            total: {
              $sum: "$totalPrice",
            },
          },
        },
      ]);

      res.json({
        success: true,
        orders: chart,
        sum: sum[0].total,
      });
    } catch (error) {
      res.status(500).json({ success: false, messages: error });
    }
  };

  getOrderByUserId = async (req, res) => {
    try {
      const { userId } = req.body;
      const orders = await Order.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" },

        {
          $lookup: {
            from: "orderdetails",
            localField: "orderDetail",
            foreignField: "_id",
            as: "orderDetail",
          },
        },
        { $match: { "user._id": mongoose.Types.ObjectId(userId) } },
      ]);

      res.json({ success: true, orders });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, messages: "Interval server error" });
    }
  };

  getOrderDetailById = async (req, res) => {
    try {
      const { id } = req.body;
      const orderDetail = await OrderDetail.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(id) } },
        {
          $lookup: {
            from: "products",
            localField: "product",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },
      ]);
      res.json({ success: true, orderDetail });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, messages: "Interval server error" });
    }
  };
}

module.exports = new OrderController();
