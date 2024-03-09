import { request } from "./httpsRequest";
import { md5Generator } from "../utils/md5Generator";

export const registerService = async (data) => {
  return await request({
    url: "signup",
    method: "POST",
    headers: {
      Key: data.key,
      Sign: md5Generator("GET", "/myself", "", data.secret),
    },
    data,
  });
};

export const loginService = async (data) => {
  return await request({
    url: "myself",
    method: "GET",
    headers: {
      Key: data.key,
      Sign: md5Generator("GET", "/myself", "", data.secret),
    },
  });
};
