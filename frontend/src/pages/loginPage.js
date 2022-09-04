import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Login from "../components/auth/Login";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("userId")) {
      dispatch({
        type: "LOGIN",
        token: localStorage.getItem("token"),
        userId: localStorage.getItem("userId"),
        user: JSON.parse(localStorage.getItem("user")),
      });
      navigate("/");
    }
  }, [dispatch, navigate]);

  return <Login />;
};
export default LoginPage;
