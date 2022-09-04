const express = require("express");

const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");

//  nested routes we use mergeParams to have access to other routes params
const router = express.Router({ mergeParams: true });

router.post("/", authController.protect, reviewController.createReview);

router.get("/", reviewController.getAllReviewsForAProduct);
router.get("/:reviewId", reviewController.getReview);

module.exports = router;
