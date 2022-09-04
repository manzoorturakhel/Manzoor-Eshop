import { useReducer, useCallback } from "react";

const formReducer = (state, action) => {
  let formValid = true;
  switch (action.type) {
    case "INPUT_CHANGE":
      for (let i in state.inputs) {
        if (i === action.name) {
          formValid = formValid && action.isValid;
        } else {
          formValid = formValid && state.inputs[i].isValid;
        }
      }

      return {
        inputs: {
          ...state.inputs,
          [action.name]: {
            value: action.value,
            isValid: action.isValid,
          },
        },
        isFormValid: formValid,
      };
    default:
      return state;
  }
};
const useForm = (INITIAL_STATE, formIsValid) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: INITIAL_STATE,
    formIsValid,
  });

  const { isFormValid } = formState;

  const gettingInput = useCallback((value, isValid, name) => {
    dispatch({
      type: "INPUT_CHANGE",
      name,
      value,
      isValid,
    });
  }, []);

  const formHandler = (e) => {
    e.preventDefault();
  };

  return [formState, isFormValid, gettingInput, formHandler];
};

export default useForm;
