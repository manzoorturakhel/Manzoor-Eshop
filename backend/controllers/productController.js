const multer = require("multer");
const fs = require("fs");

const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/APIFeautures");
const AppError = require("../utils/AppError");
const Product = require("../models/productModel");
const imageResize = require("../utils/imageResize");
const { createJsonResponse } = require("./userController");
const productCategory = require("../models/categoryModel");

const multerStorage = multer.memoryStorage();
const multerFilter = function (req, file, cb) {
  if (!file.mimetype.startsWith("image")) {
    cb(null, false);
  }
  cb(null, true);
};

const upload = multer({
  storage: multerStorage,
  multerFilter: multerFilter,
});

exports.profileUpload = upload.single("image");
exports.resizeImage = imageResize("products", "product");

exports.createProduct = catchAsync(async (req, res, next) => {
  console.log(`${__dirname}../public/products`);
  req.body.user = req.user._id;
  if (req.file) {
    req.body.image = req.file.filename;
  }

  const product = await Product.create(req.body);
  createJsonResponse(201, product, res);
});

exports.getAllProducts = catchAsync(async (req, res, next) => {
  console.log("query string", req.query);
  const api = new APIFeatures(req.query, Product.find());
  api.sort();
  api.pagination();
  api.search();
  api.category();
  const products = await api.query;

  createJsonResponse(200, products, res);
});

exports.getAproduct = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  const products = await Product.findById(productId);

  createJsonResponse(200, products, res);
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  if (req.file) {
    req.body.image = req.file.filename;
  }

  const { name, category, price, quantity, image } = req.body;

  // const product = await Product.findByIdAndUpdate(productId, req.body, {
  //   new: true,
  //   runValidators: true,
  // });
  const product = await Product.findById(productId);
  fs.unlink(`./public/img/products/${product.image}`, function (err) {
    if (!err) {
      console.log("deleted");
    }
  });
  if (name) {
    product.name = name;
  }
  if (category) {
    product.category = category;
  }
  if (price) {
    product.price = price;
  }
  if (quantity) {
    product.quantity = quantity;
  }
  if (image) {
    product.image = image;
  }
  const newProduct = await product.save();
  createJsonResponse(200, newProduct, res);
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  const product = await Product.findByIdAndDelete(productId);
  fs.unlink(`./public/img/products/${product.image}`, function (err) {
    if (!err) {
      console.log("deleted");
    }
    console.log("error in deleting");
  });
  res.status(203).json({
    status: "success",
    data: null,
  });
});

exports.getAllCategories = catchAsync(async (req, res, next) => {
  console.log("getAllCategories");
  const categories = await productCategory.find();
  createJsonResponse(200, categories, res);
});
