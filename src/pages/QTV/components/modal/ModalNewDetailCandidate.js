import { Avatar, DatePicker, Modal, Select, Timeline } from "antd";
import React from "react";
import { AiOutlineLink } from "react-icons/ai";
import { BsGenderFemale, BsTelephoneOutbound } from "react-icons/bs";
import { FaBirthdayCake, FaRegAddressBook } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import TimeUtils from "../../../../utils/timeUtils";

const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";

const ModalNewDetailCandidate = ({
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
              <span class="badge bg-primary py-3">
                Xem chi tiết ứng tuyển viên
              </span>
            </span>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12">
            <div className="bg-card border rounded px-2 py-4">
              <div className="row">
                <div className="col-2">
                  {" "}
                  <div className=" rounded">
                    <Avatar
                      shape="square"
                      size={120}
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
                      <strong>{props?.detail?.ten}</strong>
                    </h5>
                  </div>
                  <div className="row ">
                    <div className="col-3">
                      <HiOutlineMail />{" "}
                      <span>{props?.detail?.taiKhoan?.email}</span>
                      <span className="pe-3"></span>
                    </div>
                    <div className="col-3">
                      <BsTelephoneOutbound /> <span>{props?.detail?.sdt}</span>
                    </div>
                    <div className="col-6">
                      <BsGenderFemale className="pe-1" />
                      <span>{props?.detail?.gioiTinh}</span>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-3">
                      <FaBirthdayCake className="pe-1" />
                      <span>
                        {TimeUtils.formatDateTime(
                          props?.detail?.ngaySinh,
                          "DD-MM-YYYY"
                        )}
                      </span>
                    </div>

                    <div className="col-3">
                      <strong className="pe-1"> Kinh nghiệm: </strong>
                      <span>{props?.detail?.soNamKinhNghiem}</span>
                    </div>
                    <div className="col-6">
                      <FaRegAddressBook /> <span>{props?.detail?.diaChi}</span>
                      <span className="pe-3"></span>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-12">
                      <span className="pe-1">
                        {" "}
                        <strong>Lời giới thiệu: </strong>
                      </span>
                      <span>{props?.detail?.loiGioiThieu}</span>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-6">
                      <div className="my-2">
                        <span>
                          <strong className="fs-16">
                            <span class="badge bg-success py-2">Học vấn</span>
                          </strong>
                        </span>
                      </div>
                      <div>
                        {props?.detail?.dsHocVan.map((item) => {
                          return (
                            <Timeline mode="left">
                              <div className="row">
                                <div className="col-12">
                                  <Timeline.Item color="#198754">
                                    <p>
                                      <strong>Bằng cấp:</strong> {item?.bangCap}{" "}
                                      {""}- <strong>Chuyên ngành: </strong>
                                      {item?.chuyenNganh}
                                    </p>
                                    <p>
                                      {" "}
                                      <strong>Đơn vị đào tạo: {""}</strong>
                                      {item?.donViDaoTao}
                                    </p>
                                    <p>
                                      <strong>Thời hạn: {""}</strong>
                                      <span class="badge bg-success">
                                        {TimeUtils.formatDateTime(
                                          item?.tuNgay,
                                          "DD-MM-YYYY"
                                        )}{" "}
                                      </span>{" "}
                                      -{" "}
                                      <span class="badge bg-danger">
                                        {TimeUtils.formatDateTime(
                                          item?.denNgay,
                                          "DD-MM-YYYY"
                                        )}
                                      </span>
                                    </p>
                                    <p>
                                      <strong>Mô tả: {""}</strong>
                                      {item?.moTa}
                                    </p>
                                  </Timeline.Item>
                                </div>
                              </div>
                            </Timeline>
                          );
                        })}
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="my-2">
                        <span>
                          <strong className="fs-16">
                            <span class="badge bg-primary py-2">
                              Kinh nghiệm làm việc
                            </span>
                          </strong>
                        </span>
                      </div>
                      <div>
                        {props?.detail?.dsKinhNghiemLamViec.map((item) => {
                          return (
                            <Timeline mode="left">
                              <div className="row">
                                <div className="col-12">
                                  <Timeline.Item color="#0D6EFD">
                                    <p>
                                      <strong>Công ty:</strong> {item?.congTy}{" "}
                                      {""}
                                    </p>
                                    <p>
                                      {" "}
                                      <strong>Vị trí: {""}</strong>
                                      {item?.viTri}
                                    </p>
                                    <p>
                                      <strong>Thời hạn: {""}</strong>
                                      <span class="badge bg-primary">
                                        {TimeUtils.formatDateTime(
                                          item?.tuNgay,
                                          "DD-MM-YYYY"
                                        )}{" "}
                                      </span>{" "}
                                      -{" "}
                                      <span class="badge bg-danger">
                                        {TimeUtils.formatDateTime(
                                          item?.denNgay,
                                          "DD-MM-YYYY"
                                        )}
                                      </span>
                                    </p>
                                    <p>
                                      <strong>Mô tả: {""}</strong>
                                      {item?.moTa}
                                    </p>
                                  </Timeline.Item>
                                </div>
                              </div>
                            </Timeline>
                          );
                        })}
                      </div>
                    </div>
                    <div className="col-6 mt-2">
                      <div className="my-2">
                        <span>
                          <strong className="fs-16">
                            <span class="badge bg-info py-2">
                              Chứng chỉ và bằng cấp
                            </span>
                          </strong>
                        </span>
                      </div>
                      <div>
                        {props?.detail?.dsChungChi.map((item) => {
                          return (
                            <Timeline mode="left">
                              <div className="row">
                                <div className="col-12">
                                  <Timeline.Item color="#0DCAF0">
                                    <p>
                                      <strong>Tên chứng chỉ:</strong>{" "}
                                      {item?.tenChungChi} {""}
                                    </p>
                                    <p>
                                      {" "}
                                      <strong>Đơn vị cung cấp: {""}</strong>
                                      {item?.donViCungCap}
                                    </p>
                                    <p>
                                      <strong>Thời hạn: {""}</strong>
                                      <span class="badge bg-info">
                                        {TimeUtils.formatDateTime(
                                          item?.ngayCap,
                                          "DD-MM-YYYY"
                                        )}{" "}
                                      </span>{" "}
                                      -{" "}
                                      <span class="badge bg-danger">
                                        {TimeUtils.formatDateTime(
                                          item?.ngayHetHan,
                                          "DD-MM-YYYY"
                                        )}
                                      </span>
                                    </p>
                                  </Timeline.Item>
                                </div>
                              </div>
                            </Timeline>
                          );
                        })}
                      </div>
                    </div>
                    <div className="col-6 mt-2">
                      <div className="my-2">
                        <span>
                          <strong className="fs-16">
                            <span class="badge bg-warning py-2">Kỹ năng</span>
                          </strong>
                        </span>
                      </div>
                      <div>
                        {props?.detail?.dsChungChi.map((item) => {
                          return (
                            <Timeline mode="left">
                              <div className="row">
                                <div className="col-12">
                                  <Timeline.Item color="#FFC107">
                                    <p>
                                      <strong>Tên kỹ năng:</strong>{" "}
                                      {item?.tenKyNang} {""}
                                    </p>
                                  </Timeline.Item>
                                </div>
                              </div>
                            </Timeline>
                          );
                        })}
                      </div>
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

ModalNewDetailCandidate.propTypes = {};

export default ModalNewDetailCandidate;
