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
};

async function login(email, password) {
  const { data: user } = await http.post(`${baseUrl}/auth`, {
    email,
    password,
  });
  localStorage.setItem(tokenKey, user.token);
  return user;
}

// function login(email, password) {
//   return http
//     .post(`${baseUrl}/authenticate`, { email, password })
//     .then(user => {
//       // publish user to subscribers and start timer to refresh token
//       userSubject.next(user);
//       startRefreshTokenTimer();
//       return user;
//     });
// }

function logout() {
  // revoke token, stop refresh timer, publish null to user subscribers and redirect to login page
  http.post(`${baseUrl}/revoke-token`, {});
  // stopRefreshTokenTimer();
  // userSubject.next(null);
  localStorage.removeItem(tokenKey);
  history.push("/user/login");
}

function verifyEmail(passcode) {
  console.log("Inside user service", passcode);
  return http.post(`${baseUrl}/verify-email`, { passcode });
}

export function register(params) {
  console.log("in user service", params);
  console.log(baseUrl);
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
