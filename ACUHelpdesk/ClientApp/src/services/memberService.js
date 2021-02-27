import http from "./httpService";

const apiEndpoint = "/member";

function negUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export const updateMember = member => {
  const body = {
    memberStatus: member.memberStatus,
    onlineStatus: member.onlineStatus,
    actionAt: new Date(),
    isLeader: member.isLeader,
  };
  return http.put(negUrl(member.id), body);
};
