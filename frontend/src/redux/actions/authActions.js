import axios from "axios";
import { signUp, login } from "../../utils/api";
export const signUpAction = (data1, navigate) => async (dispatch) => {
  try {
    // dispatch({
    //   type: "LOAD",
    // });
    const { data } = await axios.post(signUp, data1);
    dispatch({
      type: "SIGNUP",
      token: data.token,
      userId: data.data._id,
      user: data.data,
    });
    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data.data._id);
    localStorage.setItem("user", JSON.stringify(data.data));
    localStorage.setItem(
      "tokenExpirationDate",
      new Date(new Date().getTime() + 60 * 1000 * 180)
    );

    // dispatch({
    //   type: "UNLOAD",
    // });
    navigate("/");
  } catch (error) {
    dispatch({
      type: "openModal",
    });
    dispatch({
      type: "setMessage",
      header: "Sign Up Failed",
      body: "the user already exists",
    });

    console.log(error.message);
  }
};
export const login1 = (data1, navigate) => async (dispatch) => {
  try {
    // dispatch({
    //   type: "LOAD",
    // });
    const { data } = await axios.post(login, data1);

    // const login = await fetch(`http://localhost:5000/api/v1/users/login`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });
    // const loginData = await login.json();
    // if (loginData.status !== "success") {
    //   dispatch({
    //     type: "UNLOAD",
    //   });

    //   throw new Error("can't login");
    // }
    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data.data._id);
    localStorage.setItem("user", JSON.stringify(data.data));

    localStorage.setItem(
      "tokenExpirationDate",
      new Date(new Date().getTime() + 60 * 1000 * 180)
    );
    dispatch({
      type: "LOGIN",
      token: data.token,
      userId: data.data._id,
      user: data.data,
    });
    // dispatch({
    //   type: "UNLOAD",
    // });
    navigate("/");
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: "setMessage",
      header: "login failed",
      body: "Either password or email is wrong",
    });
    dispatch({
      type: "openModal",
    });
  }
};

export const logout = (navigate) => async (dispatch) => {};
