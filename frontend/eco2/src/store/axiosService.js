import axios from "axios";

export const axiosService = axios.create({
  baseURL: process.env.REACT_APP_BE_HOST,
  headers: {
    "Content-Type": "application/json",
    "auth-token": "",
  },
});
