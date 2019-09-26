import axios from "axios";
import * as types from "./actionTypes";
import { beginAjaxCall, ajaxCallError } from "./ajaxStatusActions";
import { getLocalState, setLocalState } from "../localStorage";
import config from "../config";

export function getAccessToken(code) {
  console.log("code", code);
  return function(dispatch) {
    dispatch(beginAjaxCall());
    const exchangeOptions = {
      grant_type: "authorization_code",
      client_id: 3,
      redirect_uri: "http://localhost:3000/callback",
      client_secret: "2UItr62OLvEBfvuCLP396VpK9S1jVSgmXoksh2x0",
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
    return axios
      .request(options)
      .then(async res => {
        await saveTokens(res);
        dispatch({ type: types.AUTH_TOKEN_SUCCESS, payload: res });
      })
      .catch(error => {
        dispatch(ajaxCallError());
        return Promise.reject(error);
      });
  };
}

export function onRefreshToken(refreshToken) {
  return function(dispatch) {
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
    return axios
      .request(options)
      .then(res => {
        saveTokens(res);
        dispatch({ type: types.AUTH_TOKEN_SUCCESS, payload: res });
        return res;
      })
      .catch(error => {
        dispatch(ajaxCallError());
        return Promise.reject(error);
      });
  };
}

export function getUserProfile() {
  return async dispatch => {
    dispatch(beginAjaxCall());
    try {
      const res = await axios.get("/api/user");
      console.log("/api/user res", res);
      dispatch({ type: types.USER_LOGIN_SUCCESS, payload: res });
      return res;
    } catch (error) {
      dispatch(ajaxCallError());
      return Promise.reject(error);
    }
  };
}

export function getUserList() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    dispatch({ type: types.USER_LIST_SUCCESS, payload: [] });
    return axios
      .get("/api/user-list")
      .then(res => {
        console.log("/api/user-list res", res);
        dispatch({ type: types.USER_LIST_SUCCESS, payload: res });
        return res;
      })
      .catch(error => {
        console.log("/api/user-list error", error);
        dispatch(ajaxCallError());
        return Promise.reject(error);
      });
  };
}

export function userLogout() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return axios
      .get("/api/logout")
      .then(res => {
        dispatch({ type: types.USER_LOOUT_SUCCESS, payload: res });
        localStorage.clear();
        return res;
      })
      .catch(error => {
        dispatch(ajaxCallError());
        return Promise.reject(error);
      });
  };
}

// Auth Helper Functions
function saveTokens(params) {
  console.log("saveTokens params", params);
  const { access_token, expires_in, refresh_token } = params;
  const expires_at = new Date();
  expires_at.setSeconds(expires_at.getSeconds() + expires_in);
  setLocalState("expires_in", expires_in);
  setLocalState("expires_at", expires_at.getTime());
  setLocalState("access_token", access_token);
  setLocalState("refresh_token", refresh_token);
}

export function onLocalLogin() {
  return function(dispatch, getState) {
    const _expiresAt = getLocalState("expires_in");
    const access_token = getLocalState("access_token");
    const refresh_token = getLocalState("refresh_token");
    if (_expiresAt && access_token) {
      if (new Date().getTime() > _expiresAt) {
        // authorize
        console.log("onLocalLogin - authorize");
        dispatch(getUserProfile());
      } else {
        // refesh token
        console.log("onLocalLogin - refesh token");
        dispatch(onRefreshToken(refresh_token)).then(response => {
          window.location.href = "/";
        });
      }
    } else {
      //unauth
      console.log("onLocalLogin - unauth");
      //onLogout();
    }
  };
}
