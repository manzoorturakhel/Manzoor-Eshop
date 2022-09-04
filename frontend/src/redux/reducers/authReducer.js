const INITIAL_STATE = {
  isLoggedIn: false,
  token: "",
  userId: "",
  user: null,
  loading: false,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        isLoggedIn: true,
        token: action.token,
        userId: action.userId,
        user: action.user,
        loading: false,
      };
    case "SIGNUP":
      return {
        isLoggedIn: true,
        token: action.token,
        userId: action.userId,
        user: action.user,
        loading: false,
      };

    case "LOGOUT":
      return {
        isLoggedIn: false,
        token: "",
        userId: "",
        user: null,
        loading: false,
      };

    default:
      return state;
  }
};

export default authReducer;
