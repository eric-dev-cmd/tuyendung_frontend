import axiosClient from "./axiosClient";

const CareerApi = {
  getListCareer: () => {
    const url = `/nganhNghes`;
    return axiosClient.get(url);
  },
  getListCareerTrends: () => {
    const url = `/nganhNghes/xuHuongNganhNghe`;
    return axiosClient.get(url);
  },
  createCareerLV: (payload) => {
    console.log("createCareerLV", payload);
    const url = `/linhVucs`;
    return axiosClient.post(url, payload);
  },
};

export default CareerApi;
