import React, { Fragment } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Layout, Select } from "antd";
import { useTranslation } from "react-i18next";
const { Option } = Select;
const { Header, Footer, Sider, Content } = Layout;

const SearchCommon = () => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <div className="container-fluid pb-3 pt-4">
        <div className="bg-white">
          <div className="row">
            <div className="col-4">
              <Input
                placeholder={t("common.placeholder.searchInput")}
                className="fs-14"
              />
              <br />
            </div>
            <div className="col-2">
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                <Option value="1">Not Identified</Option>
              </Select>
              <br />
            </div>
            <div className="col-2">
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                <Option value="1">Not Identified</Option>
              </Select>
              <br />
            </div>
            <div className="col-2">
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                <Option value="1">Not Identified</Option>
              </Select>
              <br />
            </div>
            <div className="col-2 text-center">
              <Button
                className="form-control d-flex align-items-center justify-content-center"
                type="primary"
                icon={<SearchOutlined />}
              >
                Tìm kiếm
              </Button>
              <br />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SearchCommon;
