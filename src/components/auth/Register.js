import React, { Fragment, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { registerUser } from "../../redux/actions/authActions";
import "./Login.css";
import { Button } from "antd";
import { useForm } from "react-hook-form";

const Register = () => {
  const dispatch = useDispatch();
  const { register, errors, watch, handleSubmit } = useForm({});
  const password = useRef({});
  password.current = watch("matKhau", "");
  const onSubmit = async (data) => {
    const payload = {
      tenDangNhap: data.tenDangNhap?.trim(),
      email: data.email.trim(),
      matKhau: data.matKhau?.trim(),
      xacNhanMatKhau: data.matKhau?.trim(),
      loaiTaiKhoan: "ung_tuyen_vien",
    };
    console.log("payload:::", payload);
    dispatch(registerUser(payload));
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
          <form onSubmit={handleSubmit(onSubmit)}>
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
                    ref={register({
                      required: true,
                      minLength: 8,
                      maxLength: 30,
                    })}
                  />
                  <label htmlFor="adminUsername" className="form__label">
                    Tên tài khoản
                  </label>
                </div>
                <div className="error-input">
                  {errors.tenDangNhap &&
                    errors.tenDangNhap.type === "required" && (
                      <p>Vui lòng nhập tên tài khoản của bạn</p>
                    )}
                  {errors.tenDangNhap &&
                    errors.tenDangNhap.type === "minLength" && (
                      <p>Vui lòng nhập tối thiểu 8 ký tự</p>
                    )}
                  {errors.tenDangNhap &&
                    errors.tenDangNhap.type === "maxLength" && (
                      <p>Vui lòng nhập ít hơn 30 ký tự</p>
                    )}
                </div>
                <div className="input-wrapper-item mb-3">
                  <input
                    name="email"
                    type="email"
                    className="form__input"
                    placeholder="@gmail.com"
                    ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                  />
                  <label htmlFor="emailRegister" className="form__label">
                    Email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </label>
                </div>
                <div className="error-input">
                  {errors.email && errors.email.type === "required" && (
                    <p>Vui lòng nhập email của bạn</p>
                  )}
                  {errors.email && errors.email.type === "pattern" && (
                    <p>Vui lòng nhập email hợp lệ</p>
                  )}
                </div>
              </div>
              <div className="input-wrapper">
                <div className="input-wrapper-item mb-3">
                  <input
                    name="matKhau"
                    type="password"
                    className="form__input"
                    placeholder="********"
                    ref={register({ required: true, minLength: 8 })}
                  />
                  <label htmlFor="adminPassword" className="form__label">
                    Mật khẩu
                  </label>
                </div>
                <div className="error-input">
                  {errors.matKhau && errors.matKhau.type === "required" && (
                    <p>Vui lòng nhập mật khẩu của bạn</p>
                  )}
                  {errors.matKhau && errors.matKhau.type === "minLength" && (
                    <p>Vui lòng nhập tối thiểu 8 ký tự</p>
                  )}
                </div>
                <div className="input-wrapper-item mb-3">
                  <input
                    name="xacNhanMatKhau"
                    type="password"
                    id="adminConfirmPassword"
                    className="form__input"
                    placeholder="********"
                    ref={register({
                      required: true,
                      minLength: 8,
                      validate: (value) =>
                        value === password.current ||
                        "Mật khẩu nhập lại không chính xác",
                    })}
                  />
                  <label htmlFor="adminConfirmPassword" className="form__label">
                    Xác nhận mật khẩu
                  </label>
                </div>
                <div className="error-input">
                  {errors.xacNhanMatKhau &&
                    errors.xacNhanMatKhau.type === "required" && (
                      <p>Vui lòng nhập mật khẩu của bạn</p>
                    )}
                  {errors.xacNhanMatKhau &&
                    errors.xacNhanMatKhau.type === "minLength" && (
                      <p>Vui lòng nhập tối thiểu 8 ký tự</p>
                    )}
                  {errors.xacNhanMatKhau && (
                    <p>{errors.xacNhanMatKhau.message}</p>
                  )}
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
          <div className="pt-3">
            Bạn đã có tài khoản?{" "}
            <Link to="/dang-nhap" className="text-decoration-none">
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
