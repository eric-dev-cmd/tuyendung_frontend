import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/authActions";
import "./Login.css";
import { Helmet } from "react-helmet";

const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    tenDangNhap: "",
    matKhau: "",
  });
  const { tenDangNhap, matKhau } = formData;
  const user = useSelector((state) => state.userLogin);
  useEffect(() => {
    console.log("USER LOGIN", user);
    if (user.isAuthenticated) {
      console.log("Logged");
    } else {
      console.log("No logged");
    }
  }, [user]);
  const handleOnChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(tenDangNhap, matKhau));
  };
  return (
    <Fragment>
      <Helmet>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta charSet="utf-8" />
        <title>Đăng nhập tài khoản | 123job.org</title>
      </Helmet>
      <div className="login-wrapper d-flex justify-content-center pt-5">
        <div className="bg-login">
          <form onSubmit={handleOnSubmit}>
            <div className="py-2 text-center">
              <h3>Đăng nhập</h3>
            </div>
            <div className="admin-modal-content">
              <div className="input-wrapper">
                <div className="input-wrapper-item">
                  <input
                    name="tenDangNhap"
                    type="text"
                    className="form__input"
                    placeholder="zunggzing"
                    value={tenDangNhap}
                    onChange={handleOnChange}
                    required
                  />
                  <label htmlFor="adminUsername" className="form__label">
                    Tên tài khoản
                  </label>
                </div>
              </div>
              <div className="input-wrapper">
                <div className="input-wrapper-item">
                  <input
                    name="matKhau"
                    type="password"
                    className="form__input"
                    placeholder="********"
                    value={matKhau}
                    onChange={handleOnChange}
                    required
                  />
                  <label htmlFor="adminPassword" className="form__label">
                    Mật khẩu
                  </label>
                </div>
              </div>
            </div>
            <p className="float-end">
              <Link
                to="/quen-mat-khau"
                className="text-decoration-none"
                style={{ fontSize: "13px" }}
              >
                Quên mật khẩu
              </Link>
            </p>
            <div>
              <Button
                className="btn form-control"
                type="primary"
                htmlType="submit"
                size="large"
              >
                Đăng nhập
              </Button>
            </div>
          </form>
          <p className="pt-3">
            Bạn chưa có tài khoản?{" "}
            <Link to="/dang-ky" className="text-decoration-none">
              Đăng ký
            </Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
