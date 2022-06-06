import { DatePicker, Modal, Select } from "antd";
import React from "react";
import { BiBriefcase } from "react-icons/bi";
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
        width={1400}
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
              Xem chi tiết tuyển dụng có đánh giá kém
            </span>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-4">
            <div className="bg-card border rounded px-2 py-2">
              <div className="row">
                <div className="col-12">
                  {" "}
                  <div className="border-bottom py-2">
                    <h6>Tổng quan</h6>
                  </div>
                </div>{" "}
              </div>
              <div className="my-3">
                <div className="row mt-2">
                  <div className="col-4">
                    <strong className="fs-14-d">Vị trí:</strong>
                  </div>
                  <div className="col-8">
                    <span>{props?.detail?.tinTuyenDung?.viTri}</span>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-4">
                    <strong className="fs-14-d">Kinh nghiệm:</strong>
                  </div>
                  <div className="col-8">
                    <span>{props?.detail?.tinTuyenDung?.soNamKinhNghiem}</span>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-4">
                    <strong className="fs-14-d">Loại công việc:</strong>
                  </div>
                  <div className="col-8">
                    <span>{props?.detail?.tinTuyenDung?.loaiCongViec}</span>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-4">
                    <strong className="fs-14-d">Ngày đăng:</strong>
                  </div>
                  <div className="col-8">
                    <span>
                      {TimeUtils.formatDateTime(
                        props?.detail?.tinTuyenDung?.ngayTao,
                        "DD-MM-YYYY"
                      )}
                    </span>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-4">
                    <strong className="fs-14-d">Ngày hết hạn:</strong>
                  </div>
                  <div className="col-8">
                    <span>
                      {TimeUtils.formatDateTime(
                        props?.detail?.tinTuyenDung?.ngayHetHan,
                        "DD-MM-YYYY"
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-8">
            <div className="bg-card border rounded px-2 py-2">
              <div className="row">
                <div className="col-12">
                  {" "}
                  <div className="border-bottom py-2">
                    <h4>
                      <span className="tieude pointer text-danger fw-bold">
                        {props?.detail?.tinTuyenDung?.tieuDe}
                      </span>
                    </h4>
                    <div>
                      <span className="pe-3">
                        {" "}
                        <span className="pe-2">
                          <BiBriefcase />
                        </span>
                        <span>
                          {" "}
                          {props?.detail?.tinTuyenDung?.nhaTuyenDung?.tenCongty}
                        </span>
                      </span>
                      <span className="pe-3">
                        <span className="pe-2">
                          <BiBriefcase />
                        </span>
                        {props?.detail?.tinTuyenDung?.diaDiem?.tinhThanhPho}
                      </span>
                    </div>
                  </div>
                </div>{" "}
                <div className="col-12">
                  {" "}
                  <div className="border-bottom py-2">
                    <h6>Mô tả</h6>
                    <div>{props?.detail?.tinTuyenDung?.moTa}</div>
                  </div>
                </div>{" "}
                <div className="mt-3">
                  {" "}
                  <h6>Chi tiết</h6>
                </div>
                <div className="col-6">
                  {" "}
                  <div className="border-bottom py-2">
                    <div className="row my-2">
                      <div className="col-4">
                        <strong className="fs-14-d">Cấp bậc:</strong>
                      </div>
                      <div className="col-8">
                        {props?.detail?.tinTuyenDung?.bangCap}
                      </div>
                    </div>
                    <div className="row my-2">
                      <div className="col-4">
                        <strong className="fs-14-d">Số lượng tuyển:</strong>
                      </div>
                      <div className="col-8">
                        {props?.detail?.tinTuyenDung?.soLuongTuyen}
                      </div>
                    </div>
                    <div className="row my-2">
                      <div className="col-4">
                        <strong className="fs-14-d">Số lượng đã tuyển:</strong>
                      </div>
                      <div className="col-8">
                        {props?.detail?.soLuongDaTuyen}
                      </div>
                    </div>
                    <div className="row my-2">
                      <div className="col-4">
                        <strong className="fs-14-d">Giới tính:</strong>
                      </div>
                      <div className="col-8">
                        {props?.detail?.tinTuyenDung?.gioiTinh}
                      </div>
                    </div>
                    <div className="row my-2">
                      <div className="col-4">
                        <strong className="fs-14-d">Mức lương:</strong>
                      </div>
                      <div className="col-8">
                        {props?.detail?.tinTuyenDung?.mucLuong}
                      </div>
                    </div>
                  </div>
                </div>{" "}
                <div className="col-6">
                  {" "}
                  <div className="border-bottom py-2">
                    <div className="row my-2">
                      <div className="col-4">
                        <strong className="fs-14-d">Độ tuổi:</strong>
                      </div>
                      <div className="col-8">
                        {props?.detail?.tinTuyenDung?.tuoiTu} -{" "}
                        {props?.detail?.tinTuyenDung?.denTuoi}{" "}
                      </div>
                    </div>
                    <div className="row my-2">
                      <div className="col-4">
                        <strong className="fs-14-d">Ngành nghề:</strong>
                      </div>
                      <div className="col-8">
                        {props?.detail?.tinTuyenDung?.nganhNghe?.tenNganhNghe}{" "}
                      </div>
                    </div>
                    <div className="row my-2">
                      <div className="col-4">
                        <strong className="fs-14-d">Trạng thái:</strong>
                      </div>
                      <div className="col-8">
                        <span class="badge bg-danger px-2">
                          {props?.detail?.tinTuyenDung?.trangThai}
                        </span>{" "}
                      </div>
                    </div>
                    <div className="row my-2">
                      <div className="col-4">
                        <strong className="fs-14-d">Địa điểm:</strong>
                      </div>
                      <div className="col-8">
                        {props?.detail?.tinTuyenDung?.diaDiem?.tinhThanhPho}
                        {" - "}
                        {props?.detail?.tinTuyenDung?.diaDiem?.quanHuyen}
                      </div>
                    </div>
                  </div>
                </div>{" "}
                <div className="col-12">
                  {" "}
                  <div className="border-bottom py-2">
                    <h6>Phúc lợi</h6>
                    <div>{props?.detail?.tinTuyenDung?.phucLoi}</div>
                  </div>
                </div>{" "}
                <div className="col-12">
                  {" "}
                  <div className="border-bottom py-2">
                    <h6>Yêu cầu</h6>
                    <div>{props?.detail?.tinTuyenDung?.yeuCau}</div>
                  </div>
                </div>{" "}
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
