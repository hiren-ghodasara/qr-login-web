import initialState from "./initialState";
import * as types from "../actions/actionTypes";

export const userReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case types.AUTH_TOKEN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        access_token: action.payload.access_token,
        refresh_token: action.payload.refresh_token,
        expires_in: action.payload.expires_in
      };
    case types.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        userInfo: action.payload
      };
    case types.USER_LOOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false
      };
    case types.USER_LIST_SUCCESS:
      return {
        ...state,
        userList: action.payload
      };
    case types.USER_API_TOKENS_SUCCESS:
      return {
        ...state,
        tokens: action.payload
      };
    case types.CHANGE_AUTH_MODEL_VISIBILITY:
      return {
        ...state,
        authModel: action.payload
      };
    default:
      return state;
  }
};
