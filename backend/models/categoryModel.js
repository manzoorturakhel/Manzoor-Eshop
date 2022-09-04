const mongoose = require("mongoose");

const productCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A category is needed"],
  },
});

const productCategory = mongoose.model("Category", productCategorySchema);
module.exports = productCategory;
