import { Button } from "antd";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import authService from "../../services/authService";
import { ForgotPasswordSuccess } from "./components/ForgotPasswordSuccess";

export const FogotPasswordPage = () => {
  const { register, errors, handleSubmit } = useForm({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");

  const onSubmit = async (data) => {
    const payload = {
      email: data.emailForgotPassword?.trim(),
    };
    const { email } = payload;
    console.log(email);
    setEmail(email);
    await authService
      .forgotPasword(email)
      .then((data) => {
        setIsSuccess(true);
        console.log("Thanh cong");
        toast.info(data?.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        setIsSuccess(false);
        toast.error("Email không tồn tại", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  return (
    <>
      <Helmet>
        <title>Quên mật khẩu | 123job.org</title>
      </Helmet>
      {!isSuccess && (
        <div className="login-wrapper d-flex justify-content-center py-4 my-5">
          <div className="bg-login mt-3" style={{ width: "35%" }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="py-2 text-center">
                <h3>Bạn quên mật khẩu?</h3>
              </div>
              <div>
                <p>
                  Đừng lo, chúng tôi sẽ gửi cho bạn một tin nhắn giúp bạn đặt
                  lại mật khẩu qua email đăng ký tài khoản.
                </p>
              </div>
              <div className="admin-modal-content">
                <div className="input-wrapper">
                  <div
                    className="input-wrapper-item mb-3"
                    style={{ width: "100%" }}
                  >
                    <input
                      name="emailForgotPassword"
                      type="email"
                      className="form__input"
                      placeholder="Email"
                      ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                    />
                    <label htmlFor="emailRegister" className="form__label">
                      Email
                    </label>
                  </div>
                  <div className="error-input">
                    {errors.emailForgotPassword &&
                      errors.emailForgotPassword.type === "required" && (
                        <p>Vui lòng nhập email của bạn</p>
                      )}
                    {errors.emailForgotPassword &&
                      errors.emailForgotPassword.type === "pattern" && (
                        <p>Vui lòng nhập email hợp lệ</p>
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
                  Lấy lại mật khẩu
                </Button>
              </div>
            </form>
            <p className="pt-3 text-center">
              Bạn sử dụng 123job.org lần đâu?{" "}
              <Link to="/dang-ky" className="text-decoration-none">
                Hãy đăng ký
              </Link>
            </p>
          </div>
        </div>
      )}

      {isSuccess && <ForgotPasswordSuccess email={email} />}
    </>
  );
};
