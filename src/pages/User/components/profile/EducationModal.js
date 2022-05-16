import React from "react";
import PropTypes from "prop-types";
import { Button, Input, Modal, DatePicker } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Select } from "antd";
import { Checkbox } from "antd";
import moment from "moment";

const { Option } = Select;
const { RangePicker } = DatePicker;

const EducationModal = ({ showModal, onCloseModal, ...props }) => {
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
  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  return (
    <div>
      <Modal
        title="Chỉnh sửa học vấn bằng cấp"
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
            <strong>Bằng cấp</strong> <span className="text-danger">(*)</span>
          </p>
          <Input
            // showCount
            // maxLength={20}
            onChange={(e) => {
              console.log("value", e.target.value);
            }}
            size="large"
          />
        </div>
        <div className="pb-3">
          <p>
            <strong>Loại bằng</strong> <span className="text-danger">(*)</span>
          </p>
          <Select
            defaultValue="Chọn loại"
            style={{ width: "100%" }}
            onChange={handleChange}
            size="large"
          >
            <Option value="0">Cao học</Option>
            <Option value="1">Đại học</Option>
            <Option value="2">Cao đẳng</Option>
            <Option value="3">Trung cấp</Option>
            <Option value="4">Phổ thông</Option>
          </Select>
        </div>
        <div className="pb-3">
          <p>
            <strong>Tên trường</strong> <span className="text-danger">(*)</span>
          </p>
          <Input
            // showCount
            // maxLength={20}
            onChange={(e) => {
              console.log("value", e.target.value);
            }}
            size="large"
          />
        </div>
        <div className="pb-3">
          <p>
            <strong>Chuyên ngành</strong>{" "}
            <span className="text-danger">(*)</span>
          </p>
          <Input
            // showCount
            // maxLength={20}
            onChange={(e) => {
              console.log("value", e.target.value);
            }}
            size="large"
          />
        </div>
        <div className="pb-3">
          <Checkbox
            onChange={(e) => {
              console.log(`checked = ${e.target.checked}`);
            }}
          >
            <strong>Tôi hiện đang học tại đây</strong>
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
            <strong>Mô tả thêm</strong>
          </p>
          <TextArea
            showCount
            maxLength={500}
            style={{ height: 120 }}
            onChange={(e) => {
              console.log("Change:", e.target.value);
            }}
          />
        </div>
        <span>
          Nên: Mô tả những kiến thức bạn đã học và thành tích đạt được
        </span>
      </Modal>
    </div>
  );
};

EducationModal.propTypes = {};

export default EducationModal;
