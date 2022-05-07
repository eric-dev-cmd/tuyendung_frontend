import axiosClient from "./axiosClient";

const CareerApi = {
  getListCareer: () => {
    const url = `/nganhNghes`;
    return axiosClient.get(url);
  }
};

export default CareerApi;
