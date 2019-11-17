import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading-bar";
import { userReducer } from "./userReducer";
import { contestReducer } from "./contestReducer";
import { apiTokenReducer } from "./apiTokenReducer";
import { transactionReducer } from "./transactionReducer";
import { paymentMethodReducer } from "./paymentMethodReducer";

const rootReducer = combineReducers({
  userReducer,
  contest: contestReducer,
  apiTokenReducer,
  transactionReducer,
  paymentMethodReducer,
  loadingBar: loadingBarReducer,
});

export default rootReducer;
