import React from "react";
import { useSelector } from "react-redux";
//import { useNavigate } from "react-router-dom";
import Products from "../components/product/Products";

const ProductsPage = () => {
  // const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log("isloggedIn", isLoggedIn);

  // useEffect(() => {
  //   if (!(localStorage.getItem("userId") && localStorage.getItem("userId"))) {
  //     navigate("/login");
  //   }
  // }, [navigate]);
  return <Products />;
};

export default ProductsPage;
