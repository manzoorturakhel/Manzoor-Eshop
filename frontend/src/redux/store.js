import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import authReducer from "./reducers/authReducer";
import productReducer from "./reducers/productsReducer";
import loadReducer from "./reducers/loadReducer";
const reducers = combineReducers({
  auth: authReducer,
  prod: productReducer,
  load: loadReducer,
});
const store = createStore(reducers, applyMiddleware(thunk));

export default store;
