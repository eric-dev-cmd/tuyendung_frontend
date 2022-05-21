import axiosClient from "./axiosClient";

const ReviewApi = {
  getReviewById: (id) => {
    const url = `/danhGias/danhGiaTheoTin/${id}`;
    return axiosClient.get(url);
  },
  getReviewFilterById: (id, param) => {
    console.log("param", param);
    console.log("id", id);
    const url = `/danhGias/danhGiaTheoTin/${id}?${param}`;
    return axiosClient.get(url);
  },
};

export default ReviewApi;
