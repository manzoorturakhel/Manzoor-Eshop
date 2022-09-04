import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Rating from "../ratings";
import "./Post.css";
const Post = ({ product }) => {
  const dispatch = useDispatch();
  const onDelete = () => {
    console.log(product._id);
    dispatch({
      type: "DELETE_PRODUCT",
      productId: product._id,
    });
  };
  return (
    <div className="myProducts">
      <div className="myProducts__img">
        <img
          width="100px"
          height="100px"
          src={`http://localhost:8800/img/products/${product?.image}`}
          alt="product"
        />
        <div className="myProducts__details">
          <h3>{product.name}</h3>
          <Rating value={3} text="3" />
        </div>
      </div>

      <div className="myProducts__edits">
        <Link className="link-btn" to={`/posts/${product._id}`}>
          Edit
        </Link>
        <button type="submit" onClick={onDelete} className="btn">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Post;
