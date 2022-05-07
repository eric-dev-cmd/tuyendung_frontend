import React, { Fragment, useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Layout, Select } from "antd";
import { useTranslation } from "react-i18next";
const { Option } = Select;
const { Header, Footer, Sider, Content } = Layout;

const SearchCommon = ({ careers, fields, locations }) => {
  const { t } = useTranslation();
  const [cities, setCites] = useState(() => {});
  let cityObjectUnikey = [];

  const getAllCity = () => {
    let result = [];
    let cities = [];

    locations.map((location, index) =>
      result.push({ diaDiem: location.diaDiem.tinhThanhPho })
    );

    result.forEach((item) => {
      cities.push(item.diaDiem);
    });

    let cityUnikey = [...new Set(cities)];

    cityUnikey.forEach((item) => {
      console.log("t", item);
      cityObjectUnikey.push({
        diaDiem: item,
      });
    });
    console.log("cityObjectUnikey", cityObjectUnikey);
    return cityObjectUnikey;
  };
  getAllCity();
  // console.log("cityObjectUnikey", cityObjectUnikey);

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
                defaultValue={t("common.allProfessions")}
                onChange={(e) => {
                  console.log("1. ", e);
                }}
              >
                {careers.map((career, index) => {
                  return (
                    <Option key={index} value={career.tenNganhNghe}>
                      {career.tenNganhNghe}
                    </Option>
                  );
                })}
              </Select>
              <br />
            </div>
            <div className="col-2">
              <Select
                showSearch
                style={{ width: "100%" }}
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
                defaultValue={t("common.allAreasOfTheCompany")}
                onChange={(e) => {
                  console.log("2. ", e);
                }}
              >
                {fields.map((field, index) => {
                  return (
                    <Option key={index} value={field.tenLinhVuc}>
                      {field.tenLinhVuc}
                    </Option>
                  );
                })}
              </Select>
              <br />
            </div>
            <div className="col-2">
              <Select
                showSearch
                style={{ width: "100%" }}
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
                defaultValue={t("common.allThePlaces")}
                onChange={(e) => {
                  console.log("3. ", e);
                }}
              >
                {cityObjectUnikey.map((city, index) => {
                  return (
                    <Option key={index} value={city.diaDiem}>
                      {city.diaDiem}
                    </Option>
                  );
                })}
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
