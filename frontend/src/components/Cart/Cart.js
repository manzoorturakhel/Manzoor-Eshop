import React from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import Card from "../UI/Card";

const Cart = () => {
  const cart = useSelector((state) => state.prod.cart);
  const cartNumber = useSelector((state) => state.prod.cartNumber);
  return (
    <Card>
      <h3 className="center bg-thirdPrimary">
        Number of Products ({cartNumber}){" "}
      </h3>
      {cart.map((cart, index) => {
        return <CartItem index={index} cart={cart} />;
      })}
      <div className="buttons-2 mg-10">
        <div>
          <button className="btn">Continue Shopping</button>
        </div>
        <div>
          <button className="btn">Checkout</button>
        </div>
      </div>
    </Card>
  );
};

export default Cart;
