import { md5Generator } from "../utils/md5Generator";
import { request } from "./httpsRequest";
import {store} from "../redux/store"




export const searchBooks = async (
  title,
  key,
  secret
) => {
//   const { userKey, userSecret } = parseCookies();
const { key: userKey, secret: userSecret } = store.getState().auth.userData;


console.log(userKey, userSecret);
  const url = `/books/:${title.trim()}`; 
  return await request({
    url: url,
    method: "GET",
    headers: {
      Key: key || userKey,
      Sign: md5Generator("GET", url, "", secret || userSecret),
    },
  });
};

export const addBook = async (isbn) => {
  const url = "/books";
//   const { userKey, userSecret } = parseCookies();
const { key: userKey, secret: userSecret } = store.getState().auth.userData;

  return await request({
    url: url,
    method: "POST",
    headers: {
      Key: userKey,
      Sign: md5Generator("POST", url, `{"isbn":"${isbn}"}`, userSecret),
    },
    data: { isbn: isbn },
  });
};

export const getBooks = async () => {
  const url = "/books";
//   const { userKey, userSecret } = parseCookies();
  const { key: userKey, secret: userSecret } = store.getState().auth.userData;
  
  return await request({
    url: url,
    method: "GET",
    headers: {
      Key: userKey,
      Sign: md5Generator("GET", url, "", userSecret),
    },
  });
};

export const changeStatus = async (id, status) => {
  const url = `/books/${id}`;
//   const { userKey, userSecret } = parseCookies();
const { key: userKey, secret: userSecret } = store.getState().auth.userData;


  return await request({
    url: url,
    method: "PATCH",
    headers: {
      Key: userKey,
      Sign: md5Generator("PATCH", url, `{"status":${status}}`, userSecret),
    },
    data: { status: status },
  });
};

export const deleteBook = async (id) => {
  const url = `/books/${id}`;
//   const { userKey, userSecret } = parseCookies();
const { key: userKey, secret: userSecret } = store.getState().auth.userData;


  return await request({
    url: url,
    method: "DELETE",
    headers: {
      Key: userKey,
      Sign: md5Generator("DELETE", url, "", userSecret),
    },
  });
};
