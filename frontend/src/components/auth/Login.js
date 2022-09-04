import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login1 } from "../../redux/actions/authActions";
import useForm from "../../hooks/useForm";
import Input from "../UI/Input";
import Card from "../UI/Card";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formState, isFormValid, gettingInput, formHandler] = useForm({
    email: {
      value: "",
      isValid: false,
    },
    password: {
      value: "",
      isValid: false,
    },
  });

  const onLogin = () => {
    const data1 = {
      email: formState.inputs.email.value,
      password: formState.inputs.password.value,
    };
    console.log("data", data1);
    dispatch(login1(data1, navigate));
  };
  return (
    <Card>
      <div className="form__center">
        <form onSubmit={formHandler} className={"form"}>
          <Input onInput={gettingInput} type="text" name="email" />

          <Input onInput={gettingInput} type="password" name="password" />

          <div className="limit-btn-width">
            <button className="btn" disabled={!isFormValid} onClick={onLogin}>
              Login
            </button>
          </div>
          <h4>
            If you Don't have Account then Login{" "}
            <Link to="/register">Here</Link>{" "}
          </h4>
        </form>
      </div>
    </Card>
  );
};
export default Login;
