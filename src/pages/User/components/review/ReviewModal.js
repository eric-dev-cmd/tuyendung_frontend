import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { ProfileContext } from "../../../../context/ProfileContextProvider";
import StarRating from "../../../../components/StarRating/StarRating";
import isEmpty from "validator/lib/isEmpty";
import isNumeric from "validator/lib/isNumeric";
const ReviewModal = ({ showModal, onCloseModal, isEdit, id, ...props }) => {
  const [validationMsg, setValidationMsg] = useState("");
  const [noiDung, setNoiDung] = useState("");
  const [xepLoai, setXepLoai] = useState(null);

  const validateAll = () => {
    const msg = {};
    if (isEmpty(noiDung)) {
      msg.noiDung = "Vui lòng nhập nội dung";
    }
    if (xepLoai == null) {
      msg.xepLoai = "Vui lòng chọn xếp loại";
    }
    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const save = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const payload = {
      xepLoai,
      noiDung,
      danhGiaBoi: user.taiKhoan._id,
      tinTuyenDung: id,
    };
    console.log(payload);
    const isValid = validateAll();
    if (!isValid) {
      return;
    }
    onSubmitCreate(payload);
  };
  const onSubmitCreate = (payload) => {
    console.log("payload", payload);
    props.onSubmit(payload);
    onCloseModal();
  };
  const onHandleStar = (star) => {
    console.log(star);
    setXepLoai(star);
  };

  return (
    <div>
      <Modal
        title="Đánh giá tin tuyển dụng"
        centered
        visible={showModal}
        // onOk={() => {
        //   console.log("Submit ok");
        // }}
        onCancel={() => {
          onCloseModal(false);
        }}
        width={600}
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
            Lưu
          </Button>,
        ]}
      >
        <div className="mb-3">
          <StarRating onHandleStar={onHandleStar} />
          <p className="text-danger text-xs text-italic mt-1">
            {validationMsg.xepLoai}
          </p>
        </div>
        <TextArea
          showCount
          maxLength={500}
          style={{ height: 120 }}
          onChange={(e) => {
            setNoiDung(e.target.value);
          }}
        />
        <p className="text-danger text-xs text-italic mt-1">
          {validationMsg.noiDung}
        </p>
      </Modal>
    </div>
  );
};

ReviewModal.propTypes = {};

export default ReviewModal;
