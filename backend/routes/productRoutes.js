const express = require("express");

const authController = require("../controllers/authController");
const productController = require("../controllers/productController");
const reviewRouter = require("./reviewRoutes");

const router = express.Router();

router.use("/:productId/reviews", reviewRouter);

router.post(
  "/",
  authController.protect,
  productController.profileUpload,
  productController.resizeImage,
  productController.createProduct
);

router.get("/", productController.getAllProducts);
router.get("/categories", productController.getAllCategories);
router.get("/:productId", productController.getAproduct);

router.patch(
  "/:productId",
  authController.protect,
  productController.profileUpload,
  productController.resizeImage,
  productController.updateProduct
);
router.delete(
  "/:productId",
  authController.protect,

  productController.deleteProduct
);

module.exports = router;
