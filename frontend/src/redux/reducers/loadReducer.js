const loadReducer = (
  state = {
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case "LOAD":
      return {
        loading: true,
      };
    case "UNLOAD":
      return {
        loading: false,
      };
    default:
      return state;
  }
};

export default loadReducer;
