import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading-bar";
import { userReducer } from "./userReducer";
import { contestReducer } from "./contestReducer";
import { apiTokenReducer } from "./apiTokenReducer";

const rootReducer = combineReducers({
  userReducer,
  contest: contestReducer,
  apiTokenReducer,
  loadingBar: loadingBarReducer,
});

export default rootReducer;
