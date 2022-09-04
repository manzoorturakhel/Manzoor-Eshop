import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import ProductDetails from "./components/product/ProductDetails";
import Header from "./components/UI/Header";
import LoginPage from "./pages/loginPage";
import ProductsPage from "./pages/ProductsPage";
import SignupPage from "./pages/signupPage";
import MyPostsPage from "./pages/myPostsPage";
import CartPage from "./pages/cartPage";
import ProfilePage from "./pages/profilePage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("userId")) {
      dispatch({
        type: "LOGIN",
        token: localStorage.getItem("token"),
        userId: localStorage.getItem("userId"),
        user: JSON.parse(localStorage.getItem("user")),
      });
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/posts" element={<MyPostsPage />} />
        <Route path="/cart" element={<CartPage />} />

        <Route
          path="/posts/createPost"
          element={<div className="center"> createPost Posts</div>}
        />
        <Route
          path="/posts/:postId"
          element={<div className="center"> Edit Post</div>}
        />

        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/products/:productId" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
