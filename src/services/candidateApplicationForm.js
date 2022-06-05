import axiosClient from "./axiosClient";

const CandidateApplicationForm = {
  createApplicationForm: ({
    ungTuyenVien,
    tinTuyenDung,
    guiEmail,
    thongTinLienHe,
    cv,
    phuongThuc
  }) => {
    const url = `/donUngTuyens`;
    return axiosClient.post(url, {
      ungTuyenVien,
      tinTuyenDung,
      guiEmail,
      thongTinLienHe,
      cv,
      phuongThuc
    });
  },
};

export default CandidateApplicationForm;
