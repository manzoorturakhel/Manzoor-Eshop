const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Provide a name"],
    },
    email: {
      type: String,

      unique: [true, "number already taken provide another number"],
    },
    profile: {
      type: String,
      default: "default.jpeg",
    },
    password: {
      type: String,
      required: [true, "Provide a password at least 8 characters"],
      minlength: 8,
    },
    confirmPassword: {
      type: String,

      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: "ConfirmPassword should match password",
      },
    },

    passwordChanged: Date,
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = async function (
  inputPassword,
  hashedPassword
) {
  const match = await bcrypt.compare(inputPassword, hashedPassword);

  return match;
};

userSchema.methods.hasPasswordChanged = function (JWTiat) {
  if (this.passwordChanged) {
    // if it exists then do comparison
    return this.passwordChanged.getTime() / 1000 > JWTiat;
  }

  return false;
};

//document middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

// document
userSchema.pre("save", function (next) {
  // when the password is not modified or new call next
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChanged = Date.now() - 1000;
  next();
});
const user = mongoose.model("User", userSchema);

module.exports = user;
