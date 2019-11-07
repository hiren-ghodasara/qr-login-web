import axios from "axios";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import * as types from "./actionTypes";
import moment from "moment";

export function listAllContest(filter) {
  const params = {
    ...filter
  };
  return async dispatch => {
    dispatch(showLoading());
    dispatch({ type: types.LOAD_CONTEST_REQUEST});
    try {
      const res = await axios.post("/api/get-all-contest", params);
      dispatch({ type: types.LOAD_CONTEST_SUCCESS, payload: res });
      dispatch(hideLoading());
      return res;
    } catch (error) {
      dispatch({ type: types.LOAD_CONTEST_FAILURE});
      dispatch(hideLoading());
      return Promise.reject(error);
    }
  };
}

export function testCreate() {
  const params = {
    execution_date: moment()
  };
  return async dispatch => {
    dispatch(showLoading());
    try {
      const res = await axios.post("/api/test-create", params);
      dispatch(hideLoading());
      dispatch(listAllContest());
      return res;
    } catch (error) {
      dispatch(hideLoading());
      return Promise.reject(error);
    }
  };
}

export function listAllFilter() {
  return async dispatch => {
    dispatch(showLoading());
    try {
      const res = await axios.get("/api/get-all-filters");
      dispatch({ type: types.LOAD_CONTEST_FILTER_SUCCESS, payload: res });
      dispatch(hideLoading());
      return res;
    } catch (error) {
      dispatch(hideLoading());
      return Promise.reject(error);
    }
  };
}

export function searchOrganizer(val) {
  console.log("val-----", val);
  return async dispatch => {
    try {
      dispatch({ type: types.ORGANIZER_SEARCH_SUCCESS, payload: val });
    } catch (error) {
      return Promise.reject(error);
    }
  };
}
