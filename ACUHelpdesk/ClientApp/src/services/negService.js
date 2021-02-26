import http from "./httpService";

const apiEndpoint = "/negotiation";

function negUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export const getNegotiations = async () => {
  return await http.get(apiEndpoint);
};

export const postNegotiation = params => {
  return http.post(apiEndpoint, params);
};

export const updateNegotiation = neg => {
  const body = { ...neg };
  delete body.id;
  return http.put(negUrl(neg.id), body);
};

export function deleteNegotiation(negId) {
  return http.delete(negUrl(negId));
}

export function getNegotiation(negId) {
  return http.get(negUrl(negId));
}
