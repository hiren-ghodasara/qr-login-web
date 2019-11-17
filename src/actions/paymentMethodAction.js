import axios from "axios";
import * as types from "./actionTypes";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export function getAllPaymentMethods() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const res = await axios.get("/api/user-payment-methods");
      dispatch({ type: types.LOAD_PAYMENT_METHOD_SUCCESS, payload: res });
      dispatch(hideLoading());
      return res;
    } catch (error) {
      dispatch(hideLoading());
      return Promise.reject(error);
    }
  };
}

export function createPaymentMethodIntent() {
    return async (dispatch) => {
      dispatch(showLoading());
      try {
        const res = await axios.get("/api/user-payment-intent");
        dispatch(hideLoading());
        return res;
      } catch (error) {
        dispatch(hideLoading());
        return Promise.reject(error);
      }
    };
  }

export function addPaymentMethod(cardToken) {
    return async (dispatch) => {
      dispatch(showLoading());
      try {
        const res = await axios.post("/api/add-payment-method",cardToken);
        dispatch({ type: types.CREATE_PAYMENT_METHOD_SUCCESS, payload: res });
        dispatch(hideLoading());
        return res;
      } catch (error) {
        dispatch(hideLoading());
        return Promise.reject(error);
      }
    };
  }

