const jwt = require("jsonwebtoken");
const multer = require("multer");
const { promisify } = require("util");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const User = require("../models/userModel");
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
exports.resizeImage = imageResize("users", "user", 300, 300);

const signToken = (userID) => {
  const token = jwt.sign(
    {
      id: userID,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.EXPIRY_DATE,
    }
  );

  return token;
};

exports.signToken = signToken;

const createTokenAndSendJson = (user, statusCode, res) => {
  const token = signToken(user._id);

  res.status(statusCode).json({
    status: "success",
    token: token,
    data: user,
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  console.log("signup");
  req.body.profile = req.file.filename;
  const user = await User.create(req.body);

  createTokenAndSendJson(user, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  console.log("loginnn");
  if (!(email && password))
    return next(new AppError("email and passwords are required", 403));
  // checking if the user with this id exists
  const user = await User.findOne({ email: email });
  //   console.log("user", user);
  if (!user) return next(new AppError("user not found", 401));
  const matchPasswords = await user.comparePassword(password, user.password);
  if (!matchPasswords) {
    return next(new AppError("either email or password is invalid", 401));
  }
  createTokenAndSendJson(user, 200, res);
  // if it exists then check the password
});

exports.protect = catchAsync(async (req, res, next) => {
  //step-1 checking whether the jwt token is there

  if (
    !(
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    )
  ) {
    return next(new AppError("please login", 403));
  }
  const token = req.headers.authorization.split(" ")[1];

  //step-2 verify the token if its correct

  const verifyToken = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );
  console.log("verifiedToken", verifyToken);

  if (!verifyToken) {
    return next(new AppError("token not verified please login again", 401));
  }
  // step-3 check whether the user still exists
  const user = await User.findById(verifyToken.id);

  if (!user) return next(new AppError("the user doesnt exists", 404));

  // step-4 check whether the password has changed
  const hasPasswordChanged = user.hasPasswordChanged(verifyToken.iat);

  if (hasPasswordChanged) {
    return next(
      new AppError("Your Password has changed please login again", 402)
    );
  }

  req.user = user;
  next();
});
