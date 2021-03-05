import http from "./httpService";

const apiEndpoint = "/neg";

export const joinNeg = (connId, negId) => {
  const negid = "" + negId;
  return http.post(`${apiEndpoint}/JoinNeg/${connId}/${negid}`);
};

export const postMessage = message => {
  return http.post(`${apiEndpoint}/SendMessage`, message);
};
