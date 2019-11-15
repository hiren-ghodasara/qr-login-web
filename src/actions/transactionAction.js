import axios from "axios";
import * as types from "./actionTypes";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export function getAllTransaction() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const res = await axios.get("/api/user-transactions");
      dispatch({ type: types.LOAD_TRANSACTION_SUCCESS, payload: res });
      dispatch(hideLoading());
      return res;
    } catch (error) {
      dispatch(hideLoading());
      return Promise.reject(error);
    }
  };
}

