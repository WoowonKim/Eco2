import axios from "axios";
import { getToken } from "./user/common";

export const axiosService = axios.create({
  baseURL: process.env.REACT_APP_BE_HOST,
  headers: {
    "Content-Type": "application/json",
    "Auth-accessToken": getToken(),
  },
});
