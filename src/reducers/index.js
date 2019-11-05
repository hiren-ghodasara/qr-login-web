import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading-bar";
import { userReducer } from "./userReducer";
import { contestReducer } from "./contestReducer";
import ajaxCallsInProgress from "./ajaxStatusReducer";

const rootReducer = combineReducers({
  user: userReducer,
  contest: contestReducer,
  ajaxCallsInProgress,
  loadingBar: loadingBarReducer
});

export default rootReducer;
