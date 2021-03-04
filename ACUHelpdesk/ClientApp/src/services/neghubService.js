import http from "./httpService";

const apiEndpoint = "/neg";

export function joinNeg(negname, connId) {
  http.post(`${apiEndpoint}/JoinNeg/${connId}/${negname}`, null);
}

export const postMessage = message => {
  return http.post(`${apiEndpoint}/SendMessage`, message);
};
