import axiosClient from "./axiosClient";

const CandidateApplicationForm = {
  createApplicationForm: ({
    ungTuyenVien,
    tinTuyenDung,
    guiEmail,
    thongTinLienHe,
  }) => {
    console.log(
      "payload",
      ungTuyenVien,
      tinTuyenDung,
      guiEmail,
      thongTinLienHe
    );
    const url = `/donUngTuyens`;

    console.log("url", url);
    return axiosClient.post(url, {
      ungTuyenVien,
      tinTuyenDung,
      guiEmail,
      thongTinLienHe,
    });
  },
};

export default CandidateApplicationForm;
