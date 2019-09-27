import { createStore, applyMiddleware } from "redux";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import logger from "redux-logger";
import thunk from "redux-thunk";
//import { loadingBarMiddleware } from 'react-redux-loading-bar';
import rootReducer from "../reducers";

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, applyMiddleware(thunk, logger, reduxImmutableStateInvariant()));
}
