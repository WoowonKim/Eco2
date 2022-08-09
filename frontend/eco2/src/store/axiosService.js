import axios from "axios";
import { getUserEmail } from "./user/common";

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

axiosService.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;

    if (status === 401) {
      try {
        if (!isTokenRefreshing) {
          isTokenRefreshing = true;

          const { data } = await axiosService.post("/user/newaccesstoken", {
            email: getUserEmail(),
          });

          const newAccessToken = data.accessToken;
          isTokenRefreshing = false;

          // 새로운 accessToken을 default header로 설정
          axiosService.defaults.headers.common[
            "Auth-accessToken"
          ] = `${newAccessToken}`;

          onTokenRefreshed(newAccessToken);
        }
        const retryOriginalRequest = new Promise((resolve) => {
          addRefreshSubscriber((accessToken) => {
            originalRequest.headers.common[
              "Auth-accessToken"
            ] = `${accessToken}`;
            resolve(axiosService(originalRequest));
          });
        });
        return retryOriginalRequest;
      } catch {
        (err) => console.log(err);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosService;
