import { combineReducers } from "redux";
import user from "./userReducer";
import ajaxCallsInProgress from "./ajaxStatusReducer";

const rootReducer = combineReducers({
    user,
  ajaxCallsInProgress
});

export default rootReducer;
