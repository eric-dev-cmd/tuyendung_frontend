import React, { Fragment, useEffect, useState } from "react";
import { Button, Form } from "antd";
import { AiOutlineEdit } from "react-icons/ai";
import { Input } from "antd";
import { useForm, Controller } from "react-hook-form";

const TabAccountInformation = ({ user }) => {
  const [isShowForm, setIsShowForm] = useState(false);
  const { register, watch, trigger, errors, handleSubmit, control } = useForm({
    mode: "onBlur",
  });

  const handleAddForm = (e) => {
    setIsShowForm((prev) => !prev);
  };
  const onSubmit = async (payload) => {
    console.log("payload", payload);
    handleAddForm();
  };

  return (
    <Fragment>
      <div className="container border rounded py-3">
        <div className="border-bottom mb-3">
          <h4 className="mb-3">Thông tin tài khoản</h4>
        </div>
        <div className="row mb-3">
          <div className={`mb-2 ${isShowForm ? "col-3" : "col-12"}`}>
            <span>
              <b>Tài khoản đăng nhập</b>
            </span>
          </div>
          {isShowForm ? (
            ""
          ) : (
            <div className="col-4">
              {user ? <span>{user.email}</span> : "-"}
            </div>
          )}
          {isShowForm ? (
            <div className="mb-2 col-9">
              <span className="text-muted">
                <b>Tài khoản hiện tại</b>
              </span>
              <p>{user ? <b>{user.email}</b> : "-"}</p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <input
                    name="updateEmail"
                    // type="email"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="name@example.com"
                    ref={register({
                      required: true,
                      pattern:
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    })}
                  ></input>
                  <div className="error-input mt-2">
                    {errors.updateEmail &&
                      errors.updateEmail.type === "required" && (
                        <p className="m-0">Vui lòng nhập thông tin</p>
                      )}
                    {errors.updateEmail &&
                      errors.updateEmail.type === "pattern" && (
                        <p className="m-0">Vui lòng nhập đúng định dạng</p>
                      )}
                  </div>
                </div>
                <div>
                  <div>
                    <Button
                      className="me-3"
                      size="default"
                      type="primary"
                      // loading={true}
                      htmlType="submit"
                    >
                      Cập nhật
                    </Button>
                    <Button size="default" onClick={handleAddForm}>
                      Huỷ
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            ""
          )}
          {!isShowForm && (
            <div className="col-8">
              <div className="d-block float-end">
                <Button onClick={handleAddForm}>
                  {" "}
                  <AiOutlineEdit /> &nbsp;Thay đổi
                </Button>
              </div>
            </div>
          )}
        </div>
        <div className="border-bottom"></div>
      </div>
    </Fragment>
  );
};

export default TabAccountInformation;
