import axiosClient from "./axiosClient";

const portfolioApi = {
  getAccountById: (userId) => {
    const url = `/taiKhoans/${userId}`;
    return axiosClient.get(url);
  },
};

export default portfolioApi;
