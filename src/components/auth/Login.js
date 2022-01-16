import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
const Login = () => {
  return (
    <Fragment>
      <div className="login-wrapper d-flex justify-content-center py-5">
        <div className="bg-login">
          <div className="alert alert-danger">Invalid credentials</div>

          <form>
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
