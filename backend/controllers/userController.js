const jwt = require("jsonwebtoken");
const multer = require("multer");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const User = require("../models/userModel");
const { signToken } = require("./authController");
const imageResize = require("../utils/imageResize");

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

exports.profileUpload = upload.single("profile");
exports.resizeImage = imageResize("users", "user");

const createJsonResponse = (statusCode, data, res) => {
  res.status(statusCode).json({
    status: "success",
    data,
  });
};
exports.createJsonResponse=createJsonResponse;
exports.updateMe = catchAsync(async (req, res, next) => {
  const { name, email, profile } = req.body;
  req.body.profile = req.file.filename;
  if (req.body.password) {
    return next(
      new AppError("you can't update password here check it another path ", 403)
    );
  }
  console.log("req.body", req.body);
  const user = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  });
  createJsonResponse(200, user, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { oldPassword, newPassword, newConfirmPassword } = req.body;
  const user = await User.findById(req.user._id);
  console.log("user", user);
  const matchPasswords = await user.comparePassword(oldPassword, user.password);
  if (!matchPasswords) {
    return next(new AppError("your old password is invalid", 401));
  }
  if (newPassword === newConfirmPassword) {
    return next(
      new AppError("your newPassword and newConfirmPassword doesnt match", 400)
    );
  }
  user.password = newPassword;

  const updatedUser = await user.save();
  const token = signToken(user._id);

  res.status(201).json({
    status: "success",
    token: token,
    data: updatedUser,
  });
});

// if(!user) return next('The user was not found',403);

// if(name) {
//     user.name=name;
// }
// if(email){
//     user.email=email;
// }
// if(profile){
//     user.profile=profile
// }

// const updatedUser=
