const INITIAL_STATE = {
  products: [],
  myProducts: [],
  cart: [],
  cartNumber: 0,
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_ALL_PRODUCTS":
      return {
        ...state,
        products: action.products,
      };
    case "GET_MY_PRODUCTS":
      const filteredProds = state.products.filter(
        (prod) => prod.user === action.user
      );
      return {
        ...state,
        myProducts: filteredProds,
      };
    case "CREATE_PRODUCT":
      return {
        ...state,
        products: [...state.products, action.product],
      };
    case "DELETE_PRODUCT":
      const copyProducts = [...state.products];
      const myCopyProducts = [...state.myProducts];
      console.log(copyProducts);
      const filteredProducts = copyProducts.filter((prod) => {
        return prod._id !== action.productId;
      });
      const myFilteredProducts = myCopyProducts.filter((prod) => {
        return prod._id !== action.productId;
      });
      return {
        ...state,
        myProducts: myFilteredProducts,
        products: filteredProducts,
      };

    case "ADD_TO_CART":
      // first of all we should see if the product is already there ? if there then we should just update the cart product quantity
      const copyCart = [...state.cart];
      console.log(state.cart, action.product);

      let findProductIndex = copyCart.findIndex(
        (prod) => prod._id === action.productId
      );
      console.log(findProductIndex);
      let product = copyCart[findProductIndex];

      if (findProductIndex !== -1) {
        console.log("inside if", state.cart, action.product);
        const updateCartProduct = {
          ...product,
          quantity: product.quantity + action.product.quantity * 1,
        };
        copyCart[findProductIndex] = updateCartProduct;
        return {
          ...state,
          cart: copyCart,
        };
      } else {
        console.log("inside else");
        return {
          ...state,
          cart: [...state.cart, action.product],
          cartNumber: state.cartNumber + 1,
        };
      }
    case "SEARCH":
      const regex = new RegExp(`${action.searchTerm}`, "i");
      console.log(regex);
      const fileredProducts = state.products.filter((product) => {
        return regex.test(product.name);
      });
      console.log(fileredProducts);
      return {
        ...state,
        products: fileredProducts,
      };

    default:
      return state;
  }
};

export default productReducer;
