import axios from "axios";
import { getAccessToken, getUserEmail, removeUserSession, setAccessToken } from "./user/common";

const axiosService = axios.create({
  baseURL: process.env.REACT_APP_BE_HOST,
  withCredentials: true,
});

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
