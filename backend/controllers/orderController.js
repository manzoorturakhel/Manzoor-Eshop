const Order = require("../models/orderModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

const { createJsonResponse } = require("./userController");

exports.createOrder = catchAsync(async (req, res, next) => {
  const { productId } = req.body;

  req.body.product = productId;
  req.body.user = req.user._id;

  const order = await Order.create(req.body);
  createJsonResponse(201, order, res);
});
