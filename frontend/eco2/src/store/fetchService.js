import { getAccessToken } from "./user/common";

export function profilImage(userId) {
  const headers = new Headers();
  headers.append("Auth-accessToken", getAccessToken());
  const options = {
    method: "GET",
    headers: headers,
  };
  return fetch(`http://localhost:8002/img/profile/${userId}`, options);
}

export function postImage(missionId) {
  const headers = new Headers();
  headers.append("Auth-accessToken", getAccessToken());
  const options = {
    method: "GET",
    headers: headers,
  };
  return fetch(`http://localhost:8002/img/post/${missionId}`, options);
}
