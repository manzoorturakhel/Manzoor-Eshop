import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Logo from "./logo.png";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const cartNumber = useSelector((state) => state.prod.cartNumber);
  console.log(cartNumber);

  const user = useSelector((state) => state.auth.user);

  // console.log("isloggedIn", isLoggedIn, user);

  const onSelectOptions = (e) => {
    //
    // console.log("OnSelectedOptions");

    if (e.target.value !== "logout") {
      // console.log("inside the if condition");
      // // navigate(e.target.value);
      // if (ref.current === selected) {
      //   console.log("equal");
      //   setSelected(e.target.value);
      // } else {
      //   console.log("inside else");
      navigate(e.target.value);
    } else if (e.target.value === "logout") {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("user");

      dispatch({
        type: "LOGOUT",
      });
    }
  };

  const onSearch = (e) => {
    console.log("eeee");
    dispatch({
      type: "SEARCH",
      searchTerm: searchTerm,
    });
  };

  return (
    <header>
      <div className="header-Container">
        <div className="my-logo">
          <Link to="/">
            <img width="200px" height="100px" src={Logo} alt="logo" />
          </Link>
        </div>
        <div className="input-search">
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="search"
              name="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={onSearch}>search</button>
          </form>
        </div>
        <div className="header__links">
          {!isLoggedIn && <NavLink to="/login">Login</NavLink>}
          {!isLoggedIn && <NavLink to="/register">Register</NavLink>}
          {isLoggedIn && (
            <select onClick={onSelectOptions} className="custom__select">
              <option value="/">Hi {`${user?.name?.split(" ")[0]}`}</option>
              <option value="/posts">Posts</option>
              <option value="/profile">Profile</option>
              <option value="logout">Logout</option>
            </select>
          )}
          <NavLink to="/cart">
            <i className="fas fa-shopping-bag"></i>
            <span
              className="cart_number"
              style={{ padding: "4px 6px", borderRadius: "2px" }}
            >
              {cartNumber}
            </span>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
