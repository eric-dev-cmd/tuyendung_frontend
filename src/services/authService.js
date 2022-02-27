import axiosClient from "./axiosClient";

const authService = {
  logIn: (tenDangNhap, matKhau) => {
    const url = "auth/dangnhap";
    return axiosClient.post(url, { tenDangNhap, matKhau });
  },
  registerUser: (tenDangNhap, email, matKhau, xacNhanMatKhau, loaiTaiKhoan) => {
    const url = "auth/dangki";
    return axiosClient.post(url, {
      tenDangNhap,
      email,
      matKhau,
      xacNhanMatKhau,
      loaiTaiKhoan,
    });
  },
  logout: () => {
    return localStorage.removeItem("user");
  },
};

export default authService;
