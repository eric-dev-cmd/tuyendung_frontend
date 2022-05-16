import React from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";

const SkillModal = ({ showModal, onCloseModal, ...props }) => {
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
        title="Kỹ năng"
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
        <p>
          <strong>Kỹ năng</strong>
        </p>
        <TextArea
          showCount
          maxLength={500}
          style={{ height: 120 }}
          onChange={(e) => {
            console.log("Change:", e.target.value);
          }}
        />
      </Modal>
    </div>
  );
};

SkillModal.propTypes = {};

export default SkillModal;
