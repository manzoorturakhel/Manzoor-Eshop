import React, { useState } from "react";
import { Link } from "react-router-dom";

import Input from "../UI/Input";

import FileInput from "../UI/FileInput";
import useForm from "../../hooks/useForm";
import Card from "../UI/Card";

import "./Register.css";

const Register = () => {
  const [file, setFile] = useState(null);
  const [formState, isFormValid, gettingInput, formHandler] = useForm({
    name: {
      value: "",
      isValid: false,
    },
    email: {
      value: "",
      isValid: false,
    },
    password: {
      value: "",
      isValid: false,
    },
    confirmPassword: {
      value: "",
      isValid: false,
    },
  });

  const onSignUp = async () => {
    // console.log(formState);

    const formData = new FormData();
    formData.append("name", formState.inputs.name.value);
    formData.append("mobileNumber", formState.inputs.mobileNumber.value);
    formData.append("profile", file, file.name);
    formData.append("password", formState.inputs.password.value);
    formData.append("confirmPassword", formState.inputs.confirmPassword.value);
  };

  return (
    <Card>
      <div className="form__center">
        <form onSubmit={formHandler} className={"form"}>
          <Input onInput={gettingInput} type="text" name="name" />
          <Input onInput={gettingInput} type="text" name="email" />

          <FileInput
            name="profile"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Input onInput={gettingInput} type="password" name="password" />
          <Input
            onInput={gettingInput}
            type="password"
            name="confirmPassword"
          />
          <div className="limit-btn-width">
            <button className="btn" disabled={!isFormValid} onClick={onSignUp}>
              Register
            </button>
          </div>

          <h4>
            If you Already have Account then Login <Link to="/login">Here</Link>{" "}
          </h4>
        </form>
      </div>
    </Card>
  );
};

export default Register;
