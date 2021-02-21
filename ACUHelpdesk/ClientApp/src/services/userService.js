import http from "./httpService";
import { history } from "./history";

const baseUrl = "/user";
const tokenKey = "token";

export const userService = {
  login,
  logout,
  register,
  verifyEmail,
  forgotPassword,
  validateResetToken,
  resetPassword,
  negPassCode,
  getMembers,
};

async function login(email, password) {
  const { data: user } = await http.post(`${baseUrl}/auth`, {
    email,
    password,
  });
  localStorage.setItem(tokenKey, user.token);
  return user;
}

function logout() {
  http.post(`${baseUrl}/revoke-token`, {});
  localStorage.removeItem(tokenKey);
  history.push("/user/login");
}

function verifyEmail(passcode) {
  return http.post(`${baseUrl}/verify-email`, { passcode });
}

function negPassCode(email) {
  return http.post(`${baseUrl}/neg-passcode`, { email });
}

export function register(params) {
  return http.post(`${baseUrl}/register`, params);
}

function forgotPassword(email) {
  return http.post(`${baseUrl}/forgot-password`, { email });
}

function validateResetToken(token) {
  return http.post(`${baseUrl}/validate-reset-token`, { token });
}

function resetPassword({ passcode, password, confirmPassword }) {
  return http.post(`${baseUrl}/reset-password`, {
    passcode,
    password,
    confirmPassword,
  });
}

function getMembers() {
  return http.get(`${baseUrl}/members`);
}
