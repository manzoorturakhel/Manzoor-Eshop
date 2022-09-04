const mongoose = require("mongoose");
const Product = require("./productModel");

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    default: 0,
    required: [true, "Provide 1-5"],
  },
  comment: {
    type: String,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
  },
});

reviewSchema.post("save", async function () {
  const product = await Product.findById(this.product);
  let sum = 0;
  let numberOfReviews = 0;
  console.log();

  product.reviews.map((review) => {
    sum = sum + review.rating;
    numberOfReviews += 1;
  });
  product.ratingsQuantity = numberOfReviews;
  product.ratingsAverage = sum / product.ratingsQuantity;
  product.ratingsAverage = product.ratingsAverage.toFixed(2);

  await product.save();
});

const review = mongoose.model("Review", reviewSchema);

module.exports = review;
