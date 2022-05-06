import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import CarouselImage from "../components/Carousel/Carousel";
import CarouselCustom from "../components/Carousel/CarouselCustom";
import MainNavigation from "../components/Layout/MainNavigation";
import JobList from "./User/components/Job/JobList";
import { AiFillStar, AiFillDollarCircle } from "react-icons/ai";
import { FaUsersCog, FaLaptopCode } from "react-icons/fa";
import FooterHome from "../components/Footer/FooterHome";
import CareerTrends from "../components/CareerTrends";
import { GlobalData } from "../data/globalData";
import { Breadcrumb, Layout, Carousel } from "antd";
import SearchCommon from "../components/Search";

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
  const { t } = useTranslation();
  const careers = GlobalData.xuHuongNgheNghiep();

  return (
    <Fragment>
      <Helmet>
        <title>Trang chủ | 123job.org</title>
      </Helmet>
      <MainNavigation />

      <div className="mt-65">
        <SearchCommon />
        <Layout>
          <div className="container pt-5 bottom-footer">
            <Content>
              <div className="row mt-2">
                <div className="col-12">
                  <h4>{t("common.titleHome")}</h4>
                  <p>{t("common.titleParagraph")}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <CarouselImage />
                </div>
              </div>
              {/* Tin việc làm tuyển dụng mới nhất */}
              <div className="bg-white px-3 pt-1">
                <div className="row mt-5">
                  <div className="col-12">
                    <h5 className="text-uppercase">
                      <AiFillStar className="pb-1" />
                      {t("common.titleRecruitmentNew")}
                    </h5>
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
                        <CarouselImage />
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
              </div>
              {/* Việc làm quản lý */}
              <div className="bg-white px-3 mt-4 mb-2">
                <div className="row mt-2 pb-4">
                  <div className="col-12">
                    <h5 className="text-uppercase pt-4">
                      <FaUsersCog className="pb-1" /> &nbsp;
                      {t("common.titleManagementJob")}
                    </h5>
                  </div>
                  <CareerTrends careers={careers} />
                </div>
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
