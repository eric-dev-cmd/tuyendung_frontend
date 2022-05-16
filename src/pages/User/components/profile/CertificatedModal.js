import React from "react";
import PropTypes from "prop-types";
import { Button, Checkbox, DatePicker, Input, Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";

const CertificatedModal = ({ showModal, onCloseModal, ...props }) => {
  const resetValue = () => {
    console.log("3. Reset value");
    // setValue(`${prefixName}.name`, null);
    // setValue(`${prefixName}.note`, null);
    // setValue(`${prefixName}.attachments`, null);
  };
  const save = () => {
    // let data = watch(prefixName);
    console.log("running save()");
    // onSubmitCreate(payload);
    onSubmitCreate();
    console.log("Add success");
  };
  const onSubmitCreate = (payload) => {
    props.onSubmit(payload);
    resetValue();
    onCloseModal();
  };
  return (
    <div>
      <Modal
        title="Giới Chứng chỉ / giấy chứng nhận"
        centered
        visible={showModal}
        // onOk={() => {
        //   console.log("Submit ok");
        // }}
        onCancel={() => {
          onCloseModal(false);
        }}
        width={800}
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
        <div className="pb-3">
          <p>
            <strong>Tiêu đề</strong> <span className="text-danger">(*)</span>
          </p>
          <Input
            // showCount
            // maxLength={20}
            onChange={(e) => {
              console.log("value", e.target.value);
            }}
            size="large"
            placeholder="Toeic 990, IELTS6.5"
          />
        </div>
        <div className="pb-3">
          <Checkbox
            onChange={(e) => {
              console.log(`checked = ${e.target.checked}`);
            }}
          >
            <strong>Chứng chỉ này chưa hết hạn</strong>
          </Checkbox>
        </div>
        <div className="pb-3">
          <span className="pe-2">
            <DatePicker
              onChange={(date, dateString) => {
                console.log(date, dateString);
              }}
              picker="month"
            />
          </span>
          <span className="pe-2">
            <DatePicker
              onChange={(date, dateString) => {
                console.log(date, dateString);
              }}
              picker="year"
            />
          </span>
          <span className="px-2"> to </span>
          <span className="pe-2">
            <DatePicker
              onChange={(date, dateString) => {
                console.log(date, dateString);
              }}
              picker="month"
            />
          </span>
          <span className="pe-2">
            <DatePicker
              onChange={(date, dateString) => {
                console.log(date, dateString);
              }}
              picker="year"
            />
          </span>
        </div>
        <div className="pb-3">
          <p>
            <strong>Mô tả chứng chỉ</strong>
          </p>
          <TextArea
            showCount
            maxLength={200}
            style={{ height: 120 }}
            onChange={(e) => {
              console.log("Change:", e.target.value);
            }}  
          />
        </div>
      </Modal>
    </div>
  );
};

CertificatedModal.propTypes = {};

export default CertificatedModal;
