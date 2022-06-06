import { Avatar, DatePicker, Modal, Select } from "antd";
import React from "react";
import { AiOutlineLink } from "react-icons/ai";
import { BsTelephoneOutbound } from "react-icons/bs";
import { FaRegAddressBook } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import TimeUtils from "../../../../utils/timeUtils";

const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";

const ModalNewDetailEmployer = ({
  showModal,
  onCloseModal,
  isEdit,
  user,
  ...props
}) => {
  console.log("props?.detail", props?.detail);

  return (
    <div>
      <Modal
        centered
        visible={showModal}
        // visible={true}
        // onOk={() => {
        //   console.log("Submit ok");
        // }}
        onCancel={() => {
          onCloseModal(false);
        }}
        width={1000}
        footer={
          [
            // <Button
            //   key="back"
            //   onClick={() => {
            //     console.log("Cancel");
            //     onCloseModal(false);
            //   }}
            // >
            //   Hủy bỏ
            // </Button>,
            // <Button
            //   key="submit"
            //   type="primary"
            //   onClick={() => {
            //     save();
            //   }}
            // >
            //   Lưu
            // </Button>,
          ]
        }
      >
        <div className="row mt-4">
          <div className="col-12 my-1 text-center">
            <span className="fw-bold fs-19 text-uppercase">
              Xem chi tiết nhà tuyển dụng
            </span>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12">
            <div className="bg-card border rounded px-2 py-4">
              <div className="row">
                <div className="col-2">
                  {" "}
                  <div className="border rounded">
                    <Avatar
                      shape="square"
                      size={100}
                      src={
                        props?.detail?.avatar
                          ? `https://webtuyendung.s3.ap-southeast-1.amazonaws.com/${props?.detail?.avatar}`
                          : `https://webtuyendung.s3.ap-southeast-1.amazonaws.com/utv-avatar-default.png`
                      }
                    />
                  </div>
                </div>{" "}
                <div className="col-10 ">
                  <div>
                    <h5 className="fs-14">
                      <strong>{props?.detail?.tenCongty}</strong>
                    </h5>
                  </div>
                  <div className="row ">
                    <div className="col-3">
                      <HiOutlineMail /> <span>{props?.detail?.email}</span>
                      <span className="pe-3"></span>
                    </div>
                    <div className="col-9">
                      <AiOutlineLink className="pe-1" />
                      <a href={props?.detail?.website}>
                        {props?.detail?.website}
                      </a>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-3">
                      <BsTelephoneOutbound /> <span>{props?.detail?.sdt}</span>
                      <span className="pe-3"></span>
                    </div>
                    <div className="col-9">
                      <FaRegAddressBook className="pe-1" />
                      <span>{props?.detail?.diaChi}</span>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-3">
                      <strong>Qui mô:</strong>{" "}
                      <span>{props?.detail?.quyMo}</span>
                      <span className="pe-3"></span>
                    </div>
                    <div className="col-9">
                      <span className="pe-1">
                        {" "}
                        <strong>Năm thành lập: </strong>
                      </span>
                      <span>
                        {TimeUtils.formatDateTime(
                          props?.detail?.namThanhLap,
                          "DD-MM-YYYY"
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-12">
                      <strong className="fs-15">Mô tả: </strong>
                    </div>
                    <div className="col-12">
                      <span>{props?.detail?.moTa}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

ModalNewDetailEmployer.propTypes = {};

export default ModalNewDetailEmployer;
