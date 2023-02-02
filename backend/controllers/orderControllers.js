const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModal");

// create an order //

const createOrder = asyncHandler(async (req, res, next) => {
  const { userId, orders } = req.body;
  if (!userId || !orders) {
    res.status(400);
    throw new Error("Send all the required fields");
  }
  const oldUserOrders = await Order.findOne({ userId });
  if (oldUserOrders) {
    const newOrders = await Order.findOneAndUpdate(
      { userId },
      { $push: { orders: [...orders] } }
      // { new: true }
    );
    return res.json(newOrders);
  }
  const newOrder = await Order.create({
    userId,
    orders,
  });
  if (!newOrder) {
    res.status(400);
    throw new Error("Order was not created");
  } else {
    res.json(newOrder);
  }
});

// get one user all their orders //
const getAllUserOrders = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  if (!_id) {
    res.status(400);
    throw new Error("Send proper user Id");
  }
  const allOrders = await Order.findOne({ userId: _id });
  if (!allOrders) {
    res.status(200).json({
      msg: "No Orders",
    });
  } else {
    res.json(allOrders);
  }
});
module.exports = { createOrder, getAllUserOrders };
