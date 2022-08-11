import axios from "axios";
// import fetcher from "./fetchService";
import { getUserEmail, removeUserSession } from "./user/common";

const axiosService = axios.create({
  baseURL: process.env.REACT_APP_BE_HOST,
  withCredentials: true,
});

// axios intercepter를 활용하여 accessToken 검증 및 재발급
// let isTokenRefreshing = false;
// let refreshSubscribers = [];

// const onTokenRefreshed = (accessToken) => {
//   refreshSubscribers.map((callback) => callback(accessToken));
// };

// const addRefreshSubscriber = (callback) => {
//   refreshSubscribers.push(callback);
// };

// axiosService.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const {
//       config,
//       response: { status },
//     } = error;
//     const originalRequest = config;

//     if (status === 401) {
//       if (!isTokenRefreshing) {
//         isTokenRefreshing = true;

//         const { data } = await axiosService
//           .post("/user/newaccesstoken", {
//             email: getUserEmail(),
//           })
//           .then((res) => {
//             console.log(res);
//             const newAccessToken = res.data.accessToken;
//             isTokenRefreshing = false;

//             axiosService.defaults.headers.common[
//               "Auth-accessToken"
//             ] = `${newAccessToken}`;

//             onTokenRefreshed(newAccessToken);

//             // fetcher(process.env.REACT_APP_BE_HOST, {
//             //   headers: { "Auth-accessToken": `${newAccessToken}` },
//             // });
//           })
//           .catch((err) => {
//             if (err) {
//               removeUserSession();
//               window.location.replace("/");
//             }
//           });
//       }
//       const retryOriginalRequest = new Promise((resolve) => {
//         addRefreshSubscriber((accessToken) => {
//           console.log(originalRequest.headers);
//           originalRequest.headers.post["Auth-accessToken"] = `${accessToken}`;
//           resolve(axiosService(originalRequest));
//         });
//       });
//       return retryOriginalRequest;
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosService;
