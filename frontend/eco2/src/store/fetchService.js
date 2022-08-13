// function updateOptions(options) {
//   const update = { ...options };
//   if (!!options) {
//     update.headers = {
//       ...update.headers,
//     };
//   }
//   return update;
// }

import { getAccessToken } from "./user/common";

// export default function fetcher(url, options) {
//   return fetch(url, updateOptions(options));
// }

export function profilImage(userId) {
  const headers = new Headers();
  headers.append("Auth-accessToken", getAccessToken());
  const options = {
    method: "GET",
    headers: headers,
  };
  return fetch(`http://localhost:8002/img/profile/${userId}`, options);
  // .then((res) => {
  //   res.arrayBuffer().then(function (buffer) {
  //     const url = window.URL.createObjectURL(new Blob([buffer]));
  //     return url;
  //   });
  // })
  // .catch((err) => {
  //   return console.log(err);
  // });
}

export function postImage(missionId) {
  const headers = new Headers();
  headers.append("Auth-accessToken", getAccessToken());
  const options = {
    method: "GET",
    headers: headers,
  };
  return fetch(`http://localhost:8002/img/post/${missionId}`, options);
  // .then((res) => {
  //   res.arrayBuffer().then(function (buffer) {
  //     const url = window.URL.createObjectURL(new Blob([buffer]));
  //     return url;
  //   });
  // })
  // .catch((err) => {
  //   return console.log(err);
  // });
}
