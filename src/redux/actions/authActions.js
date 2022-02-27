import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from "../constants/authConstants";
import "react-toastify/dist/ReactToastify.css";
import authService from "../../services/authService";
import { toast } from "react-toastify";

export const login = (payload) => async (dispatch) => {
  console.log(payload);
  const { tenDangNhap, matKhau } = payload;
  dispatch({ type: USER_LOGIN_REQUEST });
  try {
    const response = await authService.logIn(tenDangNhap, matKhau);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: response });
    localStorage.setItem("token", JSON.stringify(response.token));
    localStorage.setItem("user", JSON.stringify(response));
    toast.success("Đăng nhập thành công", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data.message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response.data,
    });
  }
};
export const registerUser = (payload) => async (dispatch) => {
  const { tenDangNhap, email, matKhau, xacNhanMatKhau, loaiTaiKhoan } = payload;
  dispatch({
    type: USER_REGISTER_REQUEST,
  });
  try {
    const response = await authService.registerUser(
      tenDangNhap,
      email,
      matKhau,
      xacNhanMatKhau,
      loaiTaiKhoan
    );
    dispatch({ type: USER_REGISTER_SUCCESS, payload: response });
    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response));
    toast.success("Đăng ký thành công", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (error) {
    console.log(error.response?.data);
    toast.error(error.response?.data.message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response.data,
    });
  }
};
