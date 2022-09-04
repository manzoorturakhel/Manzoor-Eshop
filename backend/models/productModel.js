const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required for a product"],
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: [true, "A category is required for product"],
    },

    price: {
      type: Number,
      default: 0,
      required: [true, "a product needs to have a price"],
    },
    quantity: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: "default.jpeg",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    ratingsAverage: {
      type: Number,
      default: 0,
      min: [0, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
productSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "product",
  localField: "_id",
});
productSchema.set("toObject", { virtuals: true });
productSchema.set("toJSON", { virtuals: true });

productSchema.pre(/^find/, function (next) {
  this.populate("category", "-__v").populate("reviews");

  next();
});

const product = mongoose.model("Product", productSchema);

module.exports = product;
