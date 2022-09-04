const express = require("express");

const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

router.post(
  "/signUp",
  authController.profileUpload,
  authController.resizeImage,
  authController.signUp
);

router.post("/login", authController.login);

router.patch(
  "/updateMe",
  authController.protect,
  authController.profileUpload,
  authController.resizeImage,
  userController.updateMe
);

router.patch(
  "/updateMyPassword",
  authController.protect,
  userController.updatePassword
);

module.exports = router;
