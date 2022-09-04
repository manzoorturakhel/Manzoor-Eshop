import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getAsingleProduct } from "../../utils/api";
import { useSelector, useDispatch } from "react-redux";
import Rating from "../ratings";
import Card from "../UI/Card";
import "./productDetails.css";
import axios from "axios";
const ProductDetails = () => {
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedRating, setSelectedRating] = useState(1);
  const [comment, setComment] = useState("");
  const params = useParams();
  const products = useSelector((state) => state.prod.products);
  console.log("selecteProduct", selectedProduct);

  useEffect(() => {
    let url = getAsingleProduct.replace("<ProductId>", params.productId);
    let product;
    if (products.length > 0 && selectedProduct === "") {
      product = products.find((prod) => prod._id === params.productId);
      console.log("selecccc", selectedProduct);
      setSelectedProduct(product);
    }

    const fetchProduct = async () => {
      try {
        console.log("inside fetchProduct");
        const { data } = await axios.get(url);

        setSelectedProduct(data.data);
        console.log(selectedProduct);
      } catch (error) {}
    };

    if (products.length < 1 && selectedProduct === "") {
      console.log("inside if");
      fetchProduct();
    }
  }, [params, selectedProduct, setSelectedProduct, products]);
  if (selectedProduct === "") {
    return <div className="center"> No product found</div>;
  }

  const onSelect = (e) => {
    setSelectedRating(e.target.value);
  };
  const onCommentHandler = (e) => {
    setComment(e.target.value);
  };

  const onAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      productId: params.productId,
      product: { ...selectedProduct, quantity: quantity },
    });
  };

  return (
    <Card>
      <div className="product__details">
        <div className="product__details_img">
          <img
            src={`http://localhost:8800/img/products/${selectedProduct?.image}`}
            alt="pic"
          />
        </div>
        <div className="product__numerical__values">
          <form onClick={(e) => e.preventDefault()}>
            <table>
              <caption>{selectedProduct?.name}</caption>
              <tbody>
                <tr>
                  <td>Price</td>
                  <th>$ {selectedProduct?.price}</th>
                </tr>
                <tr>
                  <td>Status</td>
                  <th>In Stock</th>
                </tr>
                <tr>
                  <td>Reviews</td>
                  <th>{selectedProduct?.ratingsQuantity} reviews</th>
                </tr>
                <tr>
                  <td>quantity</td>
                  <th>{selectedProduct?.quantity}</th>
                </tr>
                <tr className="table__input">
                  <td>
                    <input
                      value={quantity}
                      type="number"
                      className="review__input"
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </td>
                </tr>
                <tr className="table__btn">
                  <td colSpan={2}>
                    <button onClick={onAddToCart} type="submit" className="btn">
                      Add To Cart
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
      <div className="product__detail_reviews__container">
        <div className="product__detail__reviews">
          <h4>Reviews</h4>
          <Rating value={5} />
          <Rating value={5} />
          <Rating value={5} />
        </div>
        <div className="product__detail__review__form">
          <h4>Write a Review on This Product</h4>
          <form onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="ratings">Ratings</label>
            <select
              name="ratings"
              id="ratings"
              value={selectedRating}
              onChange={onSelect}
            >
              <option value="1">1- Poor</option>
              <option value="2">2- Fair</option>
              <option value="3">3- Good</option>
              <option value="4">4- very Good</option>
              <option value="5">5- Fantastic</option>
            </select>

            <label htmlFor="comment">Comment</label>
            <textarea
              id="comment"
              name="comment"
              cols={5}
              rows={3}
              value={comment}
              onChange={onCommentHandler}
            />

            <button className="btn" type="submit">
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </Card>
  );
};

export default ProductDetails;
