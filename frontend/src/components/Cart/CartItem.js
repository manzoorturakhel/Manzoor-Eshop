import React from "react";

const CartItem = ({ cart, index }) => {
  return (
    <div key={index} className="myProducts form">
      <div className="myProducts__img">
        <img
          width="100px"
          height="100px"
          src={`http://localhost:8800/img/products/${cart?.image}`}
          alt="product"
        />
        <div className="myProducts__details">
          <h3>{cart?.name}</h3>
        </div>
      </div>
      <div className="myProducts__edits_1">
        <div>
          <h4>Quantity : {cart?.quantity}</h4>
        </div>
        <div className="buttons">
          <button className="btn">+</button> <button className="btn">-</button>
        </div>
      </div>
      <div>subTotal: $958</div>
    </div>
  );
};

export default CartItem;
