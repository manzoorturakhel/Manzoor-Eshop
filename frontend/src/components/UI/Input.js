import React, { useReducer, useEffect } from "react";

import "./Input.css";

const INITIAL_sTATE = {
  value: "",
  isTouched: false,
  isValid: false,
};

const inputReducer = (state = INITIAL_sTATE, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      return {
        value: action.value,
        isTouched: state.isTouched,
        isValid: state.isTouched && action.value.length > 0,
      };

    case "ON_BLUR":
      console.log("On_blur");
      return {
        value: state.value,
        isTouched: true,
        isValid: state.value.length > 0,
      };

    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, INITIAL_sTATE);
  //console.log("inputState", inputState);
  const { value, isValid } = inputState;
  console.log("isValid", isValid);
  const { name, onInput } = props;
  const showErrorMsg =
    inputState.isTouched === true && inputState.value.length === 0;
  // console.log(inputState.value.length === 0, inputState.isTouched);
  // console.log(showErrorMsg);

  useEffect(() => {
    onInput(value, isValid, name);
  }, [value, isValid, name, onInput]);

  return (
    <>
      <label
        className="input__label"
        style={{
          color: `${showErrorMsg ? "red" : "#e6d5b8"}`,
        }}
        htmlFor={props.name}
      >
        {props.name}:{" "}
      </label>
      <input
        style={{
          borderColor: `${showErrorMsg ? "red" : "#e6d5b8"}`,
          outline: "none",
        }}
        className="input"
        type={props.type}
        name={props.name}
        id={props.name}
        value={inputState.value}
        onChange={(e) => {
          dispatch({
            type: "INPUT_CHANGE",
            value: e.target.value,
          });
        }}
        onBlur={(e) => {
          dispatch({
            type: "ON_BLUR",
          });
        }}
      />
      <br></br>
    </>
  );
};

export default Input;
