const Order = require("../model/Order");
const OrderDetail = require("../model/OrderDetail");
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
      ]);
      res.json({ success: true, order });
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
    const { id, status } = req.body;
    if (!id)
      return res.status(401).json({ success: false, messages: "Missing id" });
    try {
      const order = await Order.findByIdAndUpdate(id, { status });

      res.json({
        success: true,
        order,
        messages: "update status successfully",
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, messages: "Interval server error" });
    }
  }
}

module.exports = new OrderController();
