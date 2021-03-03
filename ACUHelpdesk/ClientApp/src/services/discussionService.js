import http from "./httpService";

const apiEndpoint = "/negotiationDiscussion";

function negUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export const getDiscussions = async () => {
  return await http.get(apiEndpoint);
};

export const getDiscussion = async negId => {
  return await http.get(negUrl(negId));
};

export const postDiscussion = params => {
  return http.post(apiEndpoint, params);
};
