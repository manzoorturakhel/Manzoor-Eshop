import axios from "axios";
import { getAllProducts } from "../../utils/api";

export const getAllProductss = () => async (dispatch) => {
  try {
    dispatch({
      type: "LOAD",
    });
    const { data } = await axios.get(getAllProducts);

    dispatch({
      type: "GET_ALL_PRODUCTS",
      products: data.data,
    });
    dispatch({
      type: "UNLOAD",
    });
  } catch (error) {
    console.log(error.response.data);
  }
};
