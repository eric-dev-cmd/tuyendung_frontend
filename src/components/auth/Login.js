import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
const Login = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const { userName, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("SUCCESS");
  };
  return (
    <Fragment>
      <div className="login-wrapper d-flex justify-content-center py-5">
        <div className="bg-login">
          <div className="alert alert-danger">Invalid credentials</div>
          <form onSubmit={onSubmit}>
            <div className="py-2 text-center">
              <h3>Đăng nhập</h3>
            </div>
            <div className="admin-modal-content">
              <div className="input-wrapper">
                <div className="input-wrapper-item">
                  <input
                    type="text"
                    className="form__input"
                    placeholder="zunggzing"
                    value={userName}
                    onChange={(e) => onChange(e)}
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
                    type="password"
                    className="form__input"
                    placeholder="********"
                    value={password}
                    onChange={(e) => onChange(e)}
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
              <input
                type="submit"
                className="btn btn-md btn-primary form-control"
                value="Đăng nhập"
              />
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
