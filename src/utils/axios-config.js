import axios from "axios";
import config from "./../config";
import { getLocalState } from "../localStorage";
import configureStore from "../store/configureStore";
import { onRefreshToken } from "../actions/userAction";

const store = configureStore();

// for multiple requests
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export function setUpInit() {
  axios.defaults.timeout = config.TIMEOUT;
  axios.defaults.baseURL = config.BASE_URL;
  const access_token = getLocalState("access_token");
  if (access_token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    axios.defaults.headers.common["X-Requested-With"] = `XMLHttpRequest`;
  }
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
}

const onResponseSuccess = response => {
  // console.log("Axios onResponseSuccess", response.data);
  if (response && response.data) {
    return response.data;
  }
  return response;
};

const onResponseError = error => {
  console.log("Axios onResponseError", error.response);

  if(!error.response){
    return Promise.reject(error);
  }

  if (error.response.status !== 401) {
    return Promise.reject(error);
  }

  // Logout user if token refresh didn't work or user is disabled
  const purl = `${error.config.baseURL}/oauth/token`;
  if (error.config.url === purl || error.response.message === "Account is disabled.") {
    localStorage.clear();
    window.location.href = process.env.PUBLIC_URL;
    return Promise.reject(error);
  }

  let originalRequest = error.config;

  if (error.response.status === 401) {
    if (!originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function(resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return axios(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true; // now it can be retried
      isRefreshing = true;

      const refresh_token = getLocalState("refresh_token");
      return store
        .dispatch(onRefreshToken(refresh_token))
        .then(response => {
          const headerAuth = `Bearer ${response.access_token}`;
          originalRequest.headers["Authorization"] = headerAuth;
          processQueue(null, response.access_token);
          return axios(originalRequest);
          // return axios
          //   .request(originalRequest)
          //   .then(response => {
          //     return Promise.resolve(response);
          //   })
          //   .catch(error => {
          //     return Promise.reject(error);
          //   });
        })
        .catch(error => {
          //debugger;
          localStorage.clear();
          window.location.href = "/";
          processQueue(error, null);
          return Promise.reject(error);
        })
        .finally(ans => {
          isRefreshing = false;
          setUpInit();
        });
    } else {
      localStorage.clear();
      window.location.href = process.env.PUBLIC_URL;
      return Promise.reject(error);
    }
  }
};
