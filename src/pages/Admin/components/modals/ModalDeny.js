import { Button, DatePicker, Modal, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../../../../services/axiosClient";

const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";

const ModalDeny = ({ showModal, onCloseModal, isEdit, user, ...props }) => {
  const [note, setNote] = useState("");
  const save = async () => {
    try {
      const requestUrl = `http://localhost:4000/donUngTuyens/tuChoiDonUngTuyen/${props?.detail}`;
      console.log("requestUrl", requestUrl);
      const requestUrlSendEmail = `http://localhost:4000/tinTuyenDungs/sendEmail`;
      await axiosClient.patch(requestUrl).then(async (res) => {
        if (res?.status == "success") {
          console.log("requestUrl", res?.data?.thongTinLienHe?.email);

          toast.success("Cập nhật thành công", {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          const sendMail = {
            email: `${res?.data?.thongTinLienHe?.email}`,
            subject: "TỪ CHỐI ĐƠN ỨNG TUYỂN",
            message: `Nhà ứng tuyển đã từ chối đơn ứng tuyển của bạn. Lý do: ${note}`,
          };
          await axios.post(requestUrlSendEmail, sendMail);
        }
      });
      onCloseModal(false);
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <div>
      <Modal
        centered
        visible={showModal}
        // onOk={() => {
        //   console.log("Submit ok");
        // }}
        onCancel={() => {
          onCloseModal(false);
        }}
        width={500}
        footer={[
          <Button
            key="back"
            onClick={() => {
              console.log("Cancel");
              onCloseModal(false);
            }}
          >
            Hủy bỏ
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              save();
            }}
          >
            Đồng ý
          </Button>,
        ]}
      >
        <div className="row">
          <div className="col-12">Xác nhận lý do từ chối đơn ứng tuyển</div>
          <div className="col-12 mt-4">
            <TextArea
              showCount
              maxLength={100}
              style={{ height: 90 }}
              onChange={(e) => {
                console.log("AAAA");
                setNote(e.target.value);
              }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

ModalDeny.propTypes = {};

export default ModalDeny;
