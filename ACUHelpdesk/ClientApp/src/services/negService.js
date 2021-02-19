import http from "./httpService";

const apiEndpoint = "/negotiation";

export const getNegotiations = async () => {
  return await http.get(apiEndpoint);
};
