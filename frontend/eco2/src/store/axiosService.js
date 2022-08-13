import axios from "axios";
// import fetcher from "./fetchService";
import {
  getAccessToken,
  getUserEmail,
  removeUserSession,
  setAccessToken,
} from "./user/common";

const axiosService = axios.create({
  baseURL: process.env.REACT_APP_BE_HOST,
  withCredentials: true,
});

// axios intercepter를 활용하여 accessToken 검증 및 재발급

let isTokenRefreshing = false;
let refreshSubscribers = [];

const onTokenRefreshed = (accessToken) => {
  refreshSubscribers.map((callback) => callback(accessToken));
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

axiosService.interceptors.request.use(
  (req) => {
    req.headers["Auth-accessToken"] = getAccessToken();
    // console.log(getAccessToken());
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosService.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    const originalReq = err.config;
    const status = err.response ? err.response.status : null;
    // const originalRequest = config;

    if (status === 401) {
      if (!isTokenRefreshing) {
        isTokenRefreshing = true;
        axiosService
          .post(`/user/newaccesstoken`, {
            email: getUserEmail(),
          })
          .then((response) => {
            isTokenRefreshing = false;
            if (!!sessionStorage.getItem("email")) {
              setAccessToken(false, response.data.accessToken);
            } else {
              setAccessToken(true, response.data.accessToken);
            }
            console.log("new accesstoken", response.data.accessToken);
            onTokenRefreshed(response.data.accessToken);
          })
          .catch((err) => {
            removeUserSession();
            window.location.replace("/");
          });
      }
      const retryOriginalRequest = new Promise((resolve) => {
        addRefreshSubscriber((accessToken) => {
          originalReq.headers["Auth-accessToken"] = accessToken;
          resolve(axiosService(originalReq));
        });
      });
      return retryOriginalRequest;
    }
    return Promise.reject(err);
  }
);

export default axiosService;
