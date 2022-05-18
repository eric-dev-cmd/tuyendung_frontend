import axiosClient from "./axiosClient";

const InterestedJobApi = {
  creatInterestedJob: ({ tinTuyenDung, ungTuyenVien }) => {
    const url = `/viecLamQuanTams`;
    return axiosClient.post(url);
  },
  getListInterestedJob: () => {
    const url = `/viecLamQuanTams/timTheoUngTuyenVien`;
    return axiosClient.get(url);
  },
};

export default InterestedJobApi;
