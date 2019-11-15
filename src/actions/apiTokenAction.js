import axios from "axios";
import * as types from "./actionTypes";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export function getAllApiTokens() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const res = await axios.get("/api/user-tokens");
      dispatch({ type: types.LOAD_API_TOKENS_SUCCESS, payload: res });
      dispatch(hideLoading());
      return res;
    } catch (error) {
      dispatch(hideLoading());
      return Promise.reject(error);
    }
  };
}

export function revokeToken(id) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const res = await axios.get("/api/revoke-tokens", {
        params: {
          id: id,
        },
      });
      dispatch({ type: types.DELETE_API_TOKENS_SUCCESS, payload: id });
      dispatch(hideLoading());
      return res;
    } catch (error) {
      dispatch(hideLoading());
      return Promise.reject(error);
    }
  };
}
