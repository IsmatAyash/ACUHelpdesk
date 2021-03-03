import http from "./httpService";

const apiEndpoint = "/negotiation";
const apiInitiate = `${apiEndpoint}/initiate`;
const apiNegs = `${apiEndpoint}/negs`;

function negUrl(id) {
  return `${apiEndpoint}/${id}`;
}

// export const getNegotiations = async () => {
//   return await http.get(apiEndpoint);
// };

export const getNegotiations = async userId => {
  return await http.get(`${apiNegs}/${userId}`);
};

export const postNegotiation = params => {
  return http.post(apiEndpoint, params);
};

export const updateNegotiation = (neg, initiate) => {
  const body = { ...neg };
  delete body.id;
  if (initiate) return http.put(`${apiInitiate}/${neg.id}`, body);
  else return http.put(negUrl(neg.id), body);
};

export function deleteNegotiation(negId) {
  return http.delete(negUrl(negId));
}

export function getNegotiation(negId) {
  return http.get(negUrl(negId));
}

export function postInvitation(obj) {
  return http.post(`${apiEndpoint}/invitation`, { obj });
}
