import axiosClient from "./axiosClient";

const InterestedJobApi = {
  creatInterestedJob: ({ tinTuyenDung }) => {
    console.log("tinTuyenDung", tinTuyenDung);
    const url = `/tinTuyenDungs/luuTinTuyenDung/${tinTuyenDung}`;
    return axiosClient.patch(url);
  },
  getListInterestedJob: () => {
    const url = `/viecLamQuanTams/timTheoUngTuyenVien`;
    return axiosClient.get(url);
  },
};

export default InterestedJobApi;
