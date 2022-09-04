const Review = require("../models/reviewModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

const { createJsonResponse } = require("./userController");

exports.createReview = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  req.body.user = req.user._id;
  req.body.product = productId;

  const reviews = await Review.find({ product: productId, user: req.user._id });
  console.log("my review", reviews);
  if (reviews.length > 0) {
    return next(
      new AppError("you cant do another review on the same product", 403)
    );
  }

  const review = await Review.create(req.body);

  createJsonResponse(201, review, res);
});

exports.getAllReviewsForAProduct = catchAsync(async (req, res, next) => {
  const { productId } = req.params;

  const reviews = await Review.find({ product: productId });

  createJsonResponse(200, reviews, res);
});

exports.getReview = catchAsync(async (req, res, next) => {
  const { reviewId } = req.params;

  const review = await Review.findById(reviewId);

  createJsonResponse(200, review, res);
});
