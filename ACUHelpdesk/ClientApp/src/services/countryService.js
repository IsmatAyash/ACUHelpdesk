import http from "./httpService";

const apiEndpoint = "/country";

export const getCountries = async () => {
  return await http.get(apiEndpoint);
};

// export function addUser(user) {
//   return http.post(`${apiEndpoint}/register`, {
//     email: user.email,
//     password: user.password,
//     roleId: user.role,
//   });
// }
