import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Register from "../components/auth/Register";

const SignupPage = () => {
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
  return <Register />;
};
export default SignupPage;
