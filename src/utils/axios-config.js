import axios from "axios";
import config from "./../config";
import { getLocalState } from "../localStorage";
import configureStore from "../store/configureStore";
import { onRefreshToken } from "../actions/userAction";

const store = configureStore();
let isAlreadyFetchingAccessToken = false;
let Authinterceptor = null;

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
    // axios.interceptors.request.use(config => {
    //   console.log("config request", config.headers);
    //   config.headers.Authorization = `Bearer ${access_token}`;
    //   return config;
    // });
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    axios.defaults.headers.common["X-Requested-With"] = `XMLHttpRequest`;
  }
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
}

const onResponseSuccess = response => {
  console.log("Axios onResponseSuccess", response.data);
  if (response && response.data) {
    return response.data;
  }
  return response;
};

const onResponseError = error => {
  console.log("Axios onResponseError", error);

  if (error.response.status !== 401) {
    return Promise.reject(error);
  }

  // Logout user if token refresh didn't work or user is disabled
  //alert(error.config.url);
  console.log(error.config);
  const purl = `${error.config.baseURL}/oauth/token`;
  if (error.config.url == purl || error.response.message == "Account is disabled.") {
    console.log("refreshToken - error", error);
    localStorage.clear();
    window.location.href = "/";
    return Promise.reject(error);
  }

  let originalRequest = error.config;
  
  console.log("isAlreadyFetchingAccessToken", isAlreadyFetchingAccessToken);

  if (error.response.status === 401) {
    if (!originalRequest._retry) {
      
      if (isRefreshing) {
        return new Promise(function(resolve, reject) {
          failedQueue.push({resolve, reject})
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return axios(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        })
      }

      originalRequest._retry = true; // now it can be retried
      isRefreshing = true;

      const refresh_token = getLocalState("refresh_token");
      return store
        .dispatch(onRefreshToken(refresh_token))
        .then(response => {
          const headerAuth = `Bearer ${response.access_token}`;
          originalRequest.headers["Authorization"] = headerAuth;
          console.log("refreshToken - error.response222222", error.config);
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
          console.log("refreshToken - error", error);
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
      alert("retry");
      console.log("refreshToken - error", error);
      localStorage.clear();
      window.location.href = "/";
      return Promise.reject(error);
    }
  }
};
// store
//   .dispatch("refreshToken")
//   .then(response => {
//     console.log("refreshToken - response", response);
//     return axios(originalRequest);
//   })
//   .catch(error => {
//     console.log("refreshToken - error", error);
//     store
//       .dispatch("userLogout")
//       .then(res => {
//         console.log("refreshToken - res", res);
//         //router.push({ name: "login" });
//       })
//       .catch(err => {
//         console.log("refreshToken - err", err);
//         //router.push({ name: "login" });
//       });
//   });

// export function createAxiosResponseInterceptor() {
//   const interceptor = axios.interceptors.response.use(
//     response => onResponseSuccess(response),
//     error => {
//       // Reject promise if usual error
//       if (error.response.status !== 401) {
//         return Promise.reject(error);
//       }
//       // error.response.status === 401 && !isAlreadyFetchingAccessToken
//       /*
//        * When response code is 401, try to refresh the token.
//        * Eject the interceptor so it doesn't loop in case
//        * token refresh causes the 401 response
//        */
//       axios.interceptors.response.eject(interceptor);

//       return axios
//         .post("/api/refresh_token", {
//           refresh_token: this._getToken("refresh_token")
//         })
//         .then(response => {
//           saveToken();
//           error.response.config.headers["Authorization"] = "Bearer " + response.data.access_token;
//           return axios(error.response.config);
//         })
//         .catch(error => {
//           destroyToken();
//           this.router.push("/login");
//           return Promise.reject(error);
//         })
//         .finally(createAxiosResponseInterceptor);
//     }
//   );
// }
