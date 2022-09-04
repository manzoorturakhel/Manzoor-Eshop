import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Post from "./Post";
import Card from "../UI/Card";
const Posts = () => {
  const dispatch = useDispatch();
  const myProducts = useSelector((state) => state.prod.myProducts);
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    dispatch({
      type: "GET_MY_PRODUCTS",
      user: userId,
    });
  }, [dispatch, userId]);
  console.log("myproducts", myProducts);
  let posts;
  if (myProducts.length < 1) {
    posts = <div className="center">You dont have any product</div>;
  } else {
    posts = myProducts.map((pro) => {
      return <Post key={pro._id} product={pro} />;
    });
  }

  return (
    <Card>
      <div className="center">
        <button className="btn">Create Products</button>
      </div>
      {posts}
    </Card>
  );
};

export default Posts;
