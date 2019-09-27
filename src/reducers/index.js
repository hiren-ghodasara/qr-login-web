import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading-bar";
import user from "./userReducer";
import ajaxCallsInProgress from "./ajaxStatusReducer";

const rootReducer = combineReducers({
  user,
  ajaxCallsInProgress,
  loadingBar: loadingBarReducer
});

export default rootReducer;
