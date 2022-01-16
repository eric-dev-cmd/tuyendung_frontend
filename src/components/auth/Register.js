import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
const Register = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { userName, email, password, confirmPassword } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log("Password not match!");
    } else {
      console.log(formData);
    }
  };
  return (
    <Fragment>
      <div className="login-wrapper d-flex justify-content-center py-5">
        <div className="bg-login">
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="py-2 text-center">
              <h3>Đăng ký</h3>
            </div>
            <div className="admin-modal-content">
              <div className="input-wrapper">
                <div className="input-wrapper-item my-3">
                  <input
                    name="userName"
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
                    name="password"
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
                <div className="input-wrapper-item">
                  <input
                    name="confirmPassword"
                    type="password"
                    id="adminConfirmPassword"
                    className="form__input"
                    placeholder="********"
                    value={confirmPassword}
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
              <input
                type="submit"
                className="btn btn-md btn-primary form-control"
                value="Đăng ký"
              />
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
