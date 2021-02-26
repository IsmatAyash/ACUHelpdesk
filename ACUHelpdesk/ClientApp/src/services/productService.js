import http from "./httpService";

const apiEndpoint = "/product";

//export const getProducts = async () => {
//  return await http.get(apiEndpoint);
//};

export const getProducts = async negId => {
  return http.get(`${apiEndpoint}/${negId}`);
};
