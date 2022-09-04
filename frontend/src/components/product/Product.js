import React from "react";
import { Link } from "react-router-dom";
import Rating from "../ratings";

import "./Product.css";
const Product = ({ product }) => {
  return (
    <div className="product">
      <div className="product__img">
        <Link to={`/products/${product._id}`}>
          <img
            style={{ marginBottom: "10px" }}
            src={`http://localhost:8800/img/products/${product.image}`}
            alt={product.name}
          />
        </Link>
      </div>
      <Link className="product__link" to={`/products/${product._id}`}>
        {product.name}
      </Link>
      <Rating
        value={product.ratingsAverage}
        text={product.ratingsQuantity + " reviews"}
      />
      <h4> $ {product.price}</h4>
    </div>
  );
};

export default Product;
