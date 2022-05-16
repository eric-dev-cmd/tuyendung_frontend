import React from "react";
import PropTypes from "prop-types";
import { Button, Input, Modal, DatePicker } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Select } from "antd";
import { Checkbox } from "antd";
import moment from "moment";

const { Option } = Select;
const { RangePicker } = DatePicker;

const ExperienceModal = ({ showModal, onCloseModal, ...props }) => {
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
        title="Kinh nghiệm làm việc"
        centered
        visible={showModal}
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
            <strong>Chức danh việc làm</strong>{" "}
            <span className="text-danger">(*)</span>
          </p>
          <Input
            // showCount
            // maxLength={20}
            onChange={(e) => {
              console.log("value", e.target.value);
            }}
            size="large"
            placeholder="Ví dụ: Nhân viên kinh doanh"
          />
        </div>
        <div className="pb-3">
          <p>
            <strong>Công ty / Tổ chức</strong>{" "}
            <span className="text-danger">(*)</span>
          </p>
          <Input
            // showCount
            // maxLength={20}
            onChange={(e) => {
              console.log("value", e.target.value);
            }}
            size="large"
            placeholder="Ví dụ: Công ty cổ phẩn Alpaca"
          />
        </div>
        <div className="pb-3">
          <p>
            <strong>Địa điểm</strong> <span className="text-danger">(*)</span>
          </p>
          <Select
            size="large"
            showSearch
            style={{ width: "100%" }}
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
          >
            <Option value="1">Hồ Chí Minh</Option>
            <Option value="2">Hà Nội</Option>
          </Select>
        </div>
        <div className="pb-3">
          <Checkbox
            onChange={(e) => {
              console.log(`checked = ${e.target.checked}`);
            }}
          >
            <strong>Tôi hiện đang làm việc tại đây</strong>
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
            <strong>Mô tả việc làm tại đây</strong>
          </p>
          <TextArea
            showCount
            maxLength={500}
            style={{ height: 120 }}
            onChange={(e) => {
              console.log("Change:", e.target.value);
            }}
            placeholder="Mô tả việc làm tại đây"
          />
        </div>
        <span>
          Nên: Mô tả vị trí của bạn và bất kỳ những gì bạn đã từng học và làm
          việc tại đây.
        </span>
      </Modal>
    </div>
  );
};

ExperienceModal.propTypes = {};

export default ExperienceModal;
