import React from "react";

const FileInput = (props) => {
  return (
    <>
      <label className="input__label" htmlFor={props.name}>
        {props.name}:{" "}
      </label>
      <input
        style={{
          marginBottom: "20px",
        }}
        type="file"
        accept="image/*"
        value={props.value}
        onChange={props.onChange}
      />
      <br />
    </>
  );
};

export default FileInput;
