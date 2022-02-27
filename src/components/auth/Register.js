import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { register } from "../../redux/actions/authActions";
import "./Login.css";
import { Button } from "antd";

const Register = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    tenDangNhap: "",
    email: "",
    matKhau: "",
    xacNhanMatKhau: "",
    loaiTaiKhoan: "ung_tuyen_vien",
  });
  const { tenDangNhap, email, matKhau, xacNhanMatKhau, loaiTaiKhoan } =
    formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      register(tenDangNhap, email, matKhau, xacNhanMatKhau, loaiTaiKhoan)
    );
  };

  return (
    <Fragment>
      <Helmet>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta charSet="utf-8" />
        <title>Đăng Ký Tài Khoản | 123job.org</title>
      </Helmet>
      <div className="login-wrapper d-flex justify-content-center pt-5">
        <div className="bg-login">
          <form onSubmit={handleOnSubmit}>
            <div className="py-2 text-center">
              <h3>Đăng ký</h3>
            </div>
            <div className="admin-modal-content">
              <div className="input-wrapper">
                <div className="input-wrapper-item my-3">
                  <input
                    name="tenDangNhap"
                    type="text"
                    className="form__input"
                    placeholder="zunggzing"
                    value={tenDangNhap}
                    onChange={(e) => onChange(e)}
                    required
                  />
                  <label htmlFor="adminUsername" className="form__label">
                    Tên tài khoản
                  </label>
                </div>
                <div className="input-wrapper-item">
                  <input
                    name="email"
                    type="email"
                    className="form__input"
                    placeholder="@gmail.com"
                    value={email}
                    onChange={(e) => onChange(e)}
                    required
                  />
                  <label htmlFor="emailRegister" className="form__label">
                    Email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </label>
                </div>
              </div>
              <div className="input-wrapper">
                <div className="input-wrapper-item my-3">
                  <input
                    name="matKhau"
                    type="password"
                    className="form__input"
                    placeholder="********"
                    value={matKhau}
                    onChange={(e) => onChange(e)}
                    required
                  />
                  <label htmlFor="adminPassword" className="form__label">
                    Mật khẩu
                  </label>
                </div>
                <div className="input-wrapper-item">
                  <input
                    name="xacNhanMatKhau"
                    type="password"
                    id="adminConfirmPassword"
                    className="form__input"
                    placeholder="********"
                    value={xacNhanMatKhau}
                    onChange={(e) => onChange(e)}
                    required
                  />
                  <label htmlFor="adminConfirmPassword" className="form__label">
                    Xác nhận mật khẩu
                  </label>
                </div>
              </div>
            </div>

            <div>
              <Button
                className="btn form-control"
                type="primary"
                htmlType="submit"
                size="large"
              >
                Đăng ký
              </Button>
            </div>
          </form>
          <p className="pt-3">
            Bạn đã có tài khoản?{" "}
            <Link to="/dang-nhap" className="text-decoration-none">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
