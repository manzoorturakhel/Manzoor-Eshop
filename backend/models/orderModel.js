const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  Product: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
  },
  User: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  address: {
    type: String,
    required: [true, "An order must have an address to deliver"],
  },
});

const order = mongoose.model("Order", orderSchema);

module.exports = order;
