import http from "./httpService";

const apiEndpoint = "/negotiationProduct";

function negUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export const getNegProducts = negId => {
  return http.get(negUrl(negId));
};

export const updateNegProducts = (negId, products) => {
  return http.put(negUrl(negId), products);
};
