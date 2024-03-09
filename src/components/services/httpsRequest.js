import axios from "axios";
import { logout } from "../redux/Auth/auth.slice";
import {store} from "../redux/store"

const baseUrl = " https://no23.lavina.tech/"

export const request = axios.create({
  baseURL: baseUrl,
  headers: { "Content-Type": "application/json" },
});

request.interceptors.response.use((response) => {
  return response;
}, errorHandler);

export function errorHandler(error) {
  if (error.response) {
    if (error.response.status === 401) {
      // store.dispatch(logout());
    }

    return Promise.reject(error.response);
  }
  if (error.request) {
    return Promise.reject(error.request);
  }

  return Promise.reject(error);
}
