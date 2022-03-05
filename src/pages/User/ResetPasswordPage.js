import React, { useRef } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import authService from "../../services/authService";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

const ResetPasswordPage = (props) => {
  const { register, watch, errors, handleSubmit } = useForm({});
  const history = useHistory();
  const param = useParams();
  const password = useRef({});
  password.current = watch("inputResetPassword", "");
  const onSubmit = async (data) => {
    const payload = {
      matKhau: data.inputResetPassword?.trim(),
      xacNhanMatKhau: data.inputResetPassword?.trim(),
    };
    console.log(payload);
    await authService
      .resetPasword(payload.matKhau, payload.xacNhanMatKhau, param.token)
      .then((data) => {
        toast.success("Đặt lại mật khẩu thành công", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        history.replace("/dang-nhap");
      })
      .catch((err) => {
        console.log("Trung vinh: ", err);

        toast.error("Đã xảy ra lỗi. Vui lòng thử lại.", {
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
    <div>
      {" "}
      <Helmet>
        <title>Đặt lại mật khẩu | 123job.org</title>
      </Helmet>
      <div className="login-wrapper d-flex justify-content-center py-4 my-5">
        <div className="bg-login mt-3" style={{ width: "35%" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="py-2 text-center">
              <h5>
                <b>Tạo lại mật khẩu mới của bản</b>
              </h5>
            </div>
            <div>
              <p>Xác thực thành công! Bây giờ bạn có thể nhập mật khẩu mới.</p>
            </div>
            <div className="admin-modal-content">
              <div className="input-wrapper">
                <div
                  className="input-wrapper-item mb-3"
                  style={{ width: "100%" }}
                >
                  <input
                    name="inputResetPassword"
                    type="password"
                    className="form__input"
                    placeholder="Nhập mật khẩu mới"
                    ref={register({ required: true, minLength: 8 })}
                  />
                </div>
                <div className="error-input">
                  {errors.inputResetPassword &&
                    errors.inputResetPassword.type === "required" && (
                      <p>Vui lòng nhập mật khẩu của bạn</p>
                    )}
                  {errors.inputResetPassword &&
                    errors.inputResetPassword.type === "minLength" && (
                      <p>Vui lòng nhập tối thiểu 8 ký tự</p>
                    )}
                </div>
              </div>
              <div className="input-wrapper">
                <div
                  className="input-wrapper-item mb-3"
                  style={{ width: "100%" }}
                >
                  <input
                    name="inputResetConfirmPassword"
                    type="password"
                    className="form__input"
                    placeholder="Nhập lại mật khẩu mới"
                    ref={register({
                      required: true,
                      minLength: 8,
                      validate: (value) =>
                        value === password.current ||
                        "Mật khẩu nhập lại không chính xác",
                    })}
                  />
                </div>
                <div className="error-input">
                  {errors.inputResetConfirmPassword &&
                    errors.inputResetConfirmPassword.type === "required" && (
                      <p>Vui lòng nhập mật khẩu xác nhận của bạn</p>
                    )}
                  {errors.inputResetConfirmPassword &&
                    errors.inputResetConfirmPassword.type === "minLength" && (
                      <p>Vui lòng nhập tối thiểu 8 ký tự</p>
                    )}
                  {errors.inputResetConfirmPassword && (
                    <p>{errors.inputResetConfirmPassword.message}</p>
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
                Tạo mật khẩu mới
              </Button>
            </div>
          </form>
          <p className="pt-3 text-center">
            Bạn đã có tài khoản?{" "}
            <Link to="/dang-nhap" className="text-decoration-none">
              Hãy đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

ResetPasswordPage.propTypes = {};

export default ResetPasswordPage;
