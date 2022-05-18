import axiosClient from "./axiosClient";

const profileApi = {
  createStudy: (payload) => {
    const url = `/ungtuyenviens/themHocVan`;
    return axiosClient.patch(url, payload);
  },
  deletStudy: (id) => {
    const url = `/ungtuyenviens/xoaHocVan`;
    return axiosClient.patch(url, id);
  },
  updateStudy: (payload) => {
    const url = `/ungtuyenviens/capNhatHocVan`;
    return axiosClient.patch(url, payload);
  },
};

export default profileApi;
