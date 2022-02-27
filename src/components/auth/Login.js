import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/authActions";
import "./Login.css";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";

const Login = () => {
  const dispatch = useDispatch();
  const { register, errors, handleSubmit } = useForm({});
  const user = useSelector((state) => state.userLogin);

  useEffect(() => {
    console.log("USER LOGIN", user);
    if (user.isAuthenticated) {
      console.log("Logged");
    } else {
      console.log("No logged");
    }
  }, [user]);
  const onSubmit = async (data) => {
    const payload = {
      tenDangNhap: data.dangNhapTenTaiKhoan?.trim(),
      matKhau: data.dangNhapMatKhau?.trim(),
    };
    console.log("payload:::", payload);
    dispatch(login(payload));
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="py-2 text-center">
              <h3>Đăng nhập</h3>
            </div>
            <div className="admin-modal-content">
              <div className="input-wrapper">
                <div className="input-wrapper-item mb-3">
                  <input
                    name="dangNhapTenTaiKhoan"
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
                  {errors.dangNhapTenTaiKhoan &&
                    errors.dangNhapTenTaiKhoan.type === "required" && (
                      <p>Vui lòng nhập tên tài khoản của bạn</p>
                    )}
                  {errors.dangNhapTenTaiKhoan &&
                    errors.dangNhapTenTaiKhoan.type === "minLength" && (
                      <p>Vui lòng nhập tối thiểu 8 ký tự</p>
                    )}
                  {errors.dangNhapTenTaiKhoan &&
                    errors.dangNhapTenTaiKhoan.type === "maxLength" && (
                      <p>Vui lòng nhập ít hơn 30 ký tự</p>
                    )}
                </div>
              </div>
              <div className="input-wrapper">
                <div className="input-wrapper-item mb-3">
                  <input
                    name="dangNhapMatKhau"
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
                  {errors.dangNhapMatKhau &&
                    errors.dangNhapMatKhau.type === "required" && (
                      <p>Vui lòng nhập mật khẩu của bạn</p>
                    )}
                  {errors.dangNhapMatKhau &&
                    errors.dangNhapMatKhau.type === "minLength" && (
                      <p>Vui lòng nhập tối thiểu 8 ký tự</p>
                    )}
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
