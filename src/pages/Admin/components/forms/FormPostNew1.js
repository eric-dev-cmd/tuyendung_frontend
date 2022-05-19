import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Button, Input } from "antd";

const FormPostNew1 = ({ onHandleHideForm1, onHandleShowForm1 }) => {
  return (
    <Fragment>
      <div>
        <div className="row text-center">
          <h5>
            <strong>Tiêu đề tuyển dụng</strong>
          </h5>
        </div>

        <div className="row">
          <div className="col-3 my-2"></div>
          <div className="col-6 my-2">
            <p>
              <strong>
                Tiêu đề tuyển dụng<span>*</span>
              </strong>
            </p>
            <p>
              <Input placeholder="Ví dụ tuyển nhân viên kinh doanh" />
            </p>
          </div>
          <div className="col-3 my-2"></div>
          <div className="col-3 my-2"></div>
          <div className="col-6 my-2 bg-black">
            <div className="bg-secondary px-2 py-3 rounded text-white">
              <p className="text-underline">
                <strong>Ví dụ:</strong> Tuyển nhân viên kinh doanh không yêu cầu
                kinh nghiệm
              </p>
              <p className="text-underline">
                <strong>Nên:</strong>{" "}
                <ul>
                  <li>Viết tiếng việt có dấu</li>
                  <li>
                    Đề các chức danh, vi trí cần tuyển, số lương cần tuyển
                  </li>
                </ul>
              </p>
              <p className="text-underline">
                <strong> Không nên:</strong>
              </p>
              <ul>
                <li>Không để số điện thoại</li>
                <li>Không để tên công ty</li>
                <li>Không để email</li>
              </ul>
            </div>
          </div>
          <div className="col-3 my-2 text-white"></div>
          <div className="col-3 my-2 text-white"></div>
          <div className="col-6 my-2 text-white"></div>
          <div className="col-3 my-2 text-white"></div>
        </div>
      </div>
    </Fragment>
  );
};

FormPostNew1.propTypes = {};

export default FormPostNew1;
