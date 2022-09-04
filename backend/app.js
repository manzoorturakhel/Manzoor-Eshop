const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const { globalErrorHandler } = require("./controllers/errorController");

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static(`${__dirname}/public`));

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);

app.use(globalErrorHandler);

app.use("*", (req, res, next) => {
  res.status(500).json({
    status: `this path ${req.originalUrl} is not found! `,
  });
});

module.exports = app;
