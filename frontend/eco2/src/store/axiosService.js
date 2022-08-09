import axios from "axios";
import { getToken, getUserEmail } from "./user/common";

export const axiosService = axios.create({
  baseURL: process.env.REACT_APP_BE_HOST,
  headers: {
    "Auth-accessToken": getToken(),
  },
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
    if (error.response.status === 401) {
      if (!isTokenRefreshing) {
        isTokenRefreshing = true;

        const { data } = await axiosService.post("/user/newaccesstoken", {
          email: getUserEmail(),
        });
        // log로 return 값 확인 후 새로운 accessToken 저장하는 로직 작성

        isTokenRefreshing = false;
        // 새로운 accessToken을 default header로 설정
        // axiosService.defaults.headers.common['Auth-AccessToken'] = `${newAccessToekn}`
        // onTokenRefreshed(newAccessToken);
      }
      const retryOriginalRequest = new Promise((resolve) => {
        addRefreshSubscriber((accessToken) => {
          originalRequest.headers.common["Auth-AccessToken"] = `${accessToken}`;
          resolve(axios(originalRequest));
        });
      });
      return retryOriginalRequest;
    }
    return Promise.reject(error);
  }
);
