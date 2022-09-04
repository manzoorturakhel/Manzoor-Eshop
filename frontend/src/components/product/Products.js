import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllProductss } from "../../redux/actions/productActions";
import Loader from "../UI/Loader";
import Card from "../UI/Card";
import Product from "./Product";

import "./Products.css";
const Products = () => {
  const products = useSelector((state) => state.prod.products);
  const loading = useSelector((state) => state.load.loading);

  console.log("product", products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (products.length < 1) {
      dispatch(getAllProductss());
    }
  }, [dispatch, products]);

  return (
    <Card>
      <div className="products__grid">
        {loading ? (
          <Loader />
        ) : (
          products.map((prod) => {
            return <Product key={prod._id} product={prod} />;
          })
        )}
      </div>
    </Card>
  );
};

export default Products;
