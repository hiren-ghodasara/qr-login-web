import axios from "axios";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import * as types from "./actionTypes";
import { beginAjaxCall, ajaxCallError } from "./ajaxStatusActions";
import { getLocalState, setLocalState } from "../localStorage";
import config from "../config";

export function getAccessToken(code) {
  return async dispatch => {
    dispatch(beginAjaxCall());
    const exchangeOptions = {
      grant_type: "authorization_code",
      client_id: config.auth.AUTH_CLIENT_ID,
      client_secret: config.auth.AUTH_CLIENT_SECRET,
      redirect_uri: config.auth.REDIRECT_URI,
      code: code
    };
    const options = {
      method: "POST",
      url: `oauth/token`,
      headers: {
        "content-type": "application/json"
      },
      data: exchangeOptions
    };
    try {
      const res = await axios.request(options);
      saveTokens(res);
      dispatch({ type: types.AUTH_TOKEN_SUCCESS, payload: res });
    } catch (error) {
      dispatch(ajaxCallError());
      return Promise.reject(error);
    }
  };
}

export function onRefreshToken(refreshToken) {
  return async dispatch => {
    dispatch(beginAjaxCall());
    const exchangeOptions = {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: config.auth.AUTH_CLIENT_ID,
      client_secret: config.auth.AUTH_CLIENT_SECRET,
      scope: ""
    };
    const options = {
      method: "POST",
      url: `oauth/token`,
      headers: {
        "content-type": "application/json"
      },
      data: exchangeOptions
    };
    try {
      //debugger;
      const res = await axios.request(options);
      saveTokens(res);
      dispatch({ type: types.AUTH_TOKEN_SUCCESS, payload: res });
      return res;
    } catch (error) {
      dispatch(ajaxCallError());
      return Promise.reject(error);
    }
  };
}

export function getUserProfile() {
  return async dispatch => {
    dispatch(showLoading());
    try {
      const res = await axios.get("/api/user");
      dispatch({ type: types.USER_LOGIN_SUCCESS, payload: res });
      dispatch(hideLoading());
      return res;
    } catch (error) {
      dispatch(hideLoading());
      return Promise.reject(error);
    }
  };
}

export function getQrCode() {
  return async function(dispatch) {
    try {
      const res = await axios.get("/api/get-qr-code");
      return res;
    } catch (error) {
      return Promise.reject(error);
    }
  };
}

export function getUserList() {
  return async function(dispatch) {
    dispatch(showLoading());
    dispatch(beginAjaxCall());
    try {
      const res = await axios.get("/api/user-list");
      dispatch({ type: types.USER_LIST_SUCCESS, payload: res });
      dispatch(hideLoading());
      return res;
    } catch (error) {
      dispatch(hideLoading());
      return Promise.reject(error);
    }
  };
}

export function userLogout() {
  return async dispatch => {
    dispatch(beginAjaxCall());
    try {
      const res = await axios.get("/api/logout");
      dispatch({ type: types.USER_LOOUT_SUCCESS, payload: res });
      localStorage.clear();
      return res;
    } catch (error) {
      dispatch(ajaxCallError());
      return Promise.reject(error);
    }
  };
}

// Auth Helper Functions
export function saveTokens(params) {
  //console.log("saveTokens params", params);
  const { access_token, expires_in, refresh_token } = params;
  const expires_at = new Date();
  expires_at.setSeconds(expires_at.getSeconds() + expires_in);
  setLocalState("expires_in", expires_in);
  setLocalState("expires_at", expires_at.getTime());
  setLocalState("access_token", access_token);
  setLocalState("refresh_token", refresh_token);
}

export function onLocalLogin() {
  return (dispatch, getState) => {
    const _expiresAt = getLocalState("expires_at");
    const access_token = getLocalState("access_token");
    const refresh_token = getLocalState("refresh_token");
    if (_expiresAt && access_token && new Date().getTime() < _expiresAt) {
      // authorize
      console.log("onLocalLogin - authorize");
      dispatch(getUserProfile());
    } else if (refresh_token) {
      // refesh token
      console.log("onLocalLogin - refesh token");
      dispatch(getUserProfile());
    } else {
      //unauth
      console.log("onLocalLogin - unauth");
      localStorage.clear();
    }
  };
}

export function toggleAuthModel(Flag) {
  return (dispatch, getState) => {
    dispatch({ type: types.CHANGE_AUTH_MODEL_VISIBILITY, payload: Flag });
  };
}
