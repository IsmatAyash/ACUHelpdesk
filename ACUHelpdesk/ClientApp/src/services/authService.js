/* eslint-disable import/no-anonymous-default-export */
// import jwtDecode from 'jwt-decode';
import http from "./httpService";

const apiEndpoint = "/auth";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: user } = await http.post(`${apiEndpoint}/login`, {
    email,
    password,
  });
  localStorage.setItem(tokenKey, user.token);
  return { role: user.role, token: user.token };
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export async function getRoles() {
  return await http.get(`${apiEndpoint}/roles`);
}

export function getUser() {
  return localStorage.getItem("user");
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  getUser,
  getRoles,
  logout,
  getJwt,
  loginWithJwt,
};

// export function logout() {
//   localStorage.removeItem(tokenKey);
// }

// export function getCurrentUser() {
//   try {
//     const jwt = localStorage.getItem(tokenKey);
//     return jwtDecode(jwt);
//   } catch (ex) {
//     return null;
//   }
// }

// export default {
//   login,
//   loginWithJwt,
//   logout,
//   getCurrentUser,
//   getJwt,
// };
