import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Button, Input, Select } from "antd";
import { SettingOutlined } from "@ant-design/icons";
const { Option } = Select;
const OPTIONS = ["Apples", "Nails", "Bananas", "Helicopters"];

const FormPostNew2 = ({ onHandleHideForm1 }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [salary, setSalary] = useState(1);
  const handleChange = (selectedItems) => {
    setSelectedItems(selectedItems);
  };
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
  return (
    <Fragment>
      <>
        <div className="row text-center">
          <div className="col-4 text-center"></div>
          <div className="col-4 text-center my-3">
            <h5>
              <strong>Thông tin công việc</strong>
            </h5>
          </div>
          <div className="col-4 text-center"></div>
        </div>

        <div className="row">
          <div className="col-3 my-2">
            <p>
              <strong>
                Nơi làm việc<span>*</span>
              </strong>
            </p>
            <p>
              <Select
                style={{ width: "100%" }}
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={(value) => {
                  console.log("value onchange", value);
                }}
                onSearch={(value) => {
                  console.log("value onsearch", value);
                }}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value="Hà Nội">Hà Nội</Option>
                <Option value="Hồ Chí Minh">Hồ Chí Minh</Option>
              </Select>
            </p>
          </div>
          <div className="col-3 my-2">
            <p>
              <strong>
                Quận/Huyện<span>*</span>
              </strong>
            </p>
            <p>
              <Select
                mode="multiple"
                placeholder="Quận/Huyện"
                value={selectedItems}
                onChange={handleChange}
                style={{ width: "100%" }}
              >
                {filteredOptions.map((item) => (
                  <Select.Option key={item} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </p>
          </div>
          <div className="col-3 my-2">
            <p>
              <strong>
                Ngành nghề chính<span>*</span>
              </strong>
            </p>
            <p>
              <Select
                style={{ width: "100%" }}
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={(value) => {
                  console.log("value onchange", value);
                }}
                onSearch={(value) => {
                  console.log("value onsearch", value);
                }}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value="Hà Nội">Hà Nội</Option>
                <Option value="Hồ Chí Minh">Hồ Chí Minh</Option>
              </Select>
            </p>
          </div>
          <div className="col-3 my-2">
            <p>
              <strong>
                Ngành nghề phụ<span>*</span>
              </strong>
            </p>
            <p>
              <Select
                mode="multiple"
                placeholder="Quận/Huyện"
                value={selectedItems}
                onChange={handleChange}
                style={{ width: "100%" }}
              >
                {filteredOptions.map((item) => (
                  <Select.Option key={item} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </p>
          </div>
        </div>
        {/* 1. */}
        <div className="row">
          <div className="col-3 my-2">
            <p>
              <strong>
                Cấp bậc<span>*</span>
              </strong>
            </p>
            <p>
              <Select
                style={{ width: "100%" }}
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={(value) => {
                  console.log("value onchange", value);
                }}
                onSearch={(value) => {
                  console.log("value onsearch", value);
                }}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value="Hà Nội">Hà Nội</Option>
                <Option value="Hồ Chí Minh">Hồ Chí Minh</Option>
              </Select>
            </p>
          </div>
          <div className="col-3 my-2">
            <p>
              <strong>
                Số lượng tuyển<span>*</span>
              </strong>
            </p>
            <p>
              <Input placeholder="123" />
            </p>
          </div>
          <div className="col-3 my-2">
            <p>
              <strong>
                Loại hình công việc<span>*</span>
              </strong>
            </p>
            <p>
              <Select
                style={{ width: "100%" }}
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={(value) => {
                  console.log("value onchange", value);
                }}
                onSearch={(value) => {
                  console.log("value onsearch", value);
                }}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value="Hà Nội">Hà Nội</Option>
                <Option value="Hồ Chí Minh">Hồ Chí Minh</Option>
              </Select>
            </p>
          </div>
          <div className="col-3 my-2">
            <p>
              <strong>
                Ngành nghề phụ<span>*</span>
              </strong>
            </p>
            <p>
              <Select
                style={{ width: "100%" }}
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={(value) => {
                  console.log("value onchange", value);
                }}
                onSearch={(value) => {
                  console.log("value onsearch", value);
                }}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value="Hà Nội">Hà Nội</Option>
                <Option value="Hồ Chí Minh">Hồ Chí Minh</Option>
              </Select>
            </p>
          </div>
        </div>
        {/* 2 */}
        <div className="row">
          <div className="col-3">
            <p>
              <strong>
                Mức lương<span>*</span>
              </strong>
            </p>
            <Select
              style={{ width: "100%" }}
              defaultValue="Thỏa thuận"
              onChange={(e) => {
                console.log("E", e);
                if (e) {
                  setSalary(e);
                } else {
                  e = null;
                }
              }}
            >
              <Option value="1">Thỏa thuận</Option>
              <Option value="0">Cố định</Option>
              <Option value="-1">Trong khoảng</Option>
            </Select>
          </div>
          {salary == 1 && (
            <div className="col-9">
              <p>
                <strong>
                  Hiển thị<span>*</span>
                </strong>
              </p>
              <Input
                style={{ width: "100%" }}
                placeholder="Thỏa thuận"
                disabled
              />
            </div>
          )}
          {salary == 0 && (
            <>
              <div className="col-3">
                <p>
                  <strong>
                    Tối thiểu<span>*</span>
                  </strong>
                </p>
                <Input addonAfter="triệu" />
              </div>
              <div className="col-3">
                <p>
                  <strong>
                    Hiển thị<span>*</span>
                  </strong>
                </p>
                <Input addonAfter="triệu" disabled />
              </div>
            </>
          )}
          {salary == -1 && (
            <>
              <div className="col-3">
                <p>
                  <strong>
                    Tối thiểu<span>*</span>
                  </strong>
                </p>
                <Input addonAfter="triệu" />;
              </div>
              <div className="col-3">
                <p>
                  <strong>
                    Tối đa<span>*</span>
                  </strong>
                </p>
                <Input addonAfter="triệu" />;
              </div>
              <div className="col-3">
                <p>
                  <strong>
                    Hiển thị<span>*</span>
                  </strong>
                </p>
                <Input
                  style={{ width: "100%" }}
                  placeholder="Thỏa thuận"
                  disabled
                />
              </div>
            </>
          )}
        </div>
      </>
    </Fragment>
  );
};

FormPostNew2.propTypes = {};

export default FormPostNew2;
