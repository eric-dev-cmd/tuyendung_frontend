import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Layout, Select } from "antd";
import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Carousel from '../components/Carousel/Carousel';
import CarouselCustom from '../components/Carousel/CarouselCustom';
import MainNavigation from "../components/Layout/MainNavigation";
import JobList from "./User/components/Job/JobList";
import { AiFillStar, AiFillDollarCircle } from "react-icons/ai";
import { FaUsersCog, FaLaptopCode } from "react-icons/fa";
import FooterHome from "../components/Footer/FooterHome";
import CareerTrends from "../components/CareerTrends";
import { GlobalData } from '../data/globalData'


const { Option } = Select;
const { Header, Footer, Sider, Content } = Layout;


const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const Home = () => {
  const user = useSelector((state) => state.userLogin.userInfor);
  const dispatch = useDispatch();
  var currentTime = new Date();
  var year = currentTime.getFullYear();
  const { t } = useTranslation()
  const careers = GlobalData.xuHuongNgheNghiep();
  console.log("ttv", careers)
  return (
    <Fragment>
      <Helmet>
        <title>Trang chủ | 123job.org</title>
      </Helmet>
      <MainNavigation />
      <div className="bg-white mt-65">
        <Layout>
          {/* <Header>Header</Header> */}
          <div className="container bg-white py-3">
            <Content>
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
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    filterSort={(optionA, optionB) =>
                      optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
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
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    filterSort={(optionA, optionB) =>
                      optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
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
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    filterSort={(optionA, optionB) =>
                      optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                    }
                  >
                    <Option value="1">Not Identified</Option>
                  </Select>
                  <br />
                </div>
                <div className="col-2 text-center">
                  <Button className="form-control d-flex align-items-center justify-content-center" type="primary" icon={<SearchOutlined />} >
                    Tìm kiếm
                  </Button>
                  <br />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-12">
                  <h4>{t("common.titleHome")}</h4>
                  <p>{t("common.titleParagraph")}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <Carousel />
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-12">
                  <h5 className="text-uppercase">
                    <AiFillStar className="pb-1" />
                    {t("common.titleRecruitmentNew")}</h5>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-12 col-sm-6 col-lg-4">
                  <JobList />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-12">
                  <CarouselCustom />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-12">
                  <h5 className="text-uppercase">
                    <AiFillStar className="pb-1" />
                    {t("common.titleHotJob")}
                  </h5>
                </div>
              </div>
              <div className="d-flex">
                <div className="width-70 me-3">
                  <div className="row mt-2">
                    <div className="col-12 col-sm-6 col-lg-6">
                      <JobList />
                    </div>
                    <div className="col-12 col-sm-6 col-lg-6">
                      <JobList />
                    </div>
                    <div className="col-12 col-sm-6 col-lg-6">
                      <JobList />
                    </div>
                    <div className="col-12 col-sm-6 col-lg-6">
                      <JobList />
                    </div>
                    <div className="col-12 col-sm-6 col-lg-6">
                      <JobList />
                    </div>
                    <div className="col-12 col-sm-6 col-lg-6">
                      <JobList />
                    </div>
                  </div>
                </div>
                <div className="width-30 float-end">
                  <div className="row mt-2">
                    <div className="col-12 col-sm-12 col-lg-12">
                      <Carousel />
                    </div>
                  </div>
                </div>
              </div>
              {/* Three */}
              <div className="d-flex flex-wrap mt-4">
                <div className="width-33 me-4">
                  <div className="row mt-2">
                    <div className="col-12">
                      <h5 className="text-uppercase">
                        <AiFillDollarCircle className="pb-1" /> &nbsp;
                        {t("common.titleHighPayingJobs")}
                      </h5>
                    </div>
                    <div className="height-405 overflow-auto">
                      <div className="col-12">
                        <JobList />
                      </div>
                      <div className="col-12">
                        <JobList />
                      </div>
                      <div className="col-12">
                        <JobList />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="width-33 me-4">
                  <div className="row mt-2">
                    <div className="col-12">
                      <h5 className="text-uppercase">
                        <FaUsersCog className="pb-1" /> &nbsp;
                        {t("common.titleManagementJob")}
                      </h5>
                    </div>
                    <div className="height-405 overflow-auto">
                      <div className="col-12">
                        <JobList />
                      </div>
                      <div className="col-12">
                        <JobList />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="width-33">
                  <div className="row mt-2">
                    <div className="col-12">
                      <h5 className="text-uppercase">
                        <FaLaptopCode className="pb-1" /> &nbsp;
                        {t("common.titleITJob")}
                      </h5>
                    </div>
                    <div className="height-405 overflow-auto">
                      <div className="col-12">
                        <JobList />
                      </div>
                      <div className="col-12">
                        <JobList />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-12">
                  <h5 className="text-uppercase">
                    <FaUsersCog className="pb-1" /> &nbsp;
                    {t("common.titleManagementJob")}
                  </h5>
                </div>
                <CareerTrends careers={careers} />
              </div>
            </Content>
          </div>
        </Layout>
        <FooterHome />
      </div>
    </Fragment>
  );
};

export default Home;
