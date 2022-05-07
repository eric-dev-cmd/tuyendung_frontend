import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import CarouselImage from "../components/Carousel/Carousel";
import CarouselCustom from "../components/Carousel/CarouselCustom";
import MainNavigation from "../components/Layout/MainNavigation";
import JobList from "../components/JobHome/components/JobList";
import { AiFillStar, AiFillDollarCircle } from "react-icons/ai";
import { FaUsersCog, FaLaptopCode } from "react-icons/fa";
import FooterHome from "../components/Footer/FooterHome";
import CareerTrends from "../components/CareerTrends";
import { GlobalData } from "../data/globalData";
import { Breadcrumb, Layout, Carousel } from "antd";
import SearchCommon from "../components/Search";
import JobProvider from "../components/JobHome/context/jobCommonContext";
import JobListFilter from "../components/JobHome/components/JobListFilter";
import CareerApi from "../services/careerApi";
import FieldCompanyApi from "../services/fieldCompanyApi";
import RecruitmentApi from "../services/recruitmentApi";
import {
  BAN_THOI_GIAN,
  LINH_VUC,
  TOAN_THOI_GIAN,
  VI_TRI,
} from "../constansts/common";
import { useCommonContext } from "../components/Search/context/commonContext";

const { Header, Footer, Sider, Content } = Layout;

const Home = () => {
  const { t } = useTranslation();
  const careers = GlobalData.xuHuongNgheNghiep();
  const {
    location,
    recruitmentsPartTime,
    fields,
    position,
    recruitmentsFullTime,
    listCareers,
    recruitmentsTopNews,
    companyFields,
    recruitments,
  } = useCommonContext();
  // // Tin tuyển dụng
  // const [recruitments, setRecruitments] = useState([]);
  // // const [location, setLocation] = useState([]);
  // const [recruitmentsPartTime, setRecruitmentsPartTime] = useState([]);
  // const [fields, setFields] = useState([]);
  // const [position, setPosition] = useState([]);
  // const [recruitmentsFullTime, setRecruitmentsFullTime] = useState([]);
  // const [listCareers, setListCareers] = useState([]);
  // const [recruitmentsTopNews, setRecruitmentsTopNews] = useState([]);
  // const [companyFields, setCompanyFields] = useState([]);

  // const getListData = async () => {
  //   try {
  //     const response = await RecruitmentApi.getListRecruitment();
  //     setRecruitments(response.data);
  //     // setLocation(response.data);
  //   } catch (error) {
  //     console.log(error.response);
  //   }
  // };

  // const getListDataPartTime = async (filter) => {
  //   try {
  //     const response = await RecruitmentApi.getListRecruitmentFilterParams(
  //       filter
  //     );
  //     setRecruitmentsPartTime(response.data);
  //   } catch (error) {
  //     console.log(error.response);
  //   }
  // };

  // const getListDataFields = async (filter) => {
  //   try {
  //     const response = await RecruitmentApi.getListRecruitmentFilterParams(
  //       filter
  //     );
  //     setFields(response.data);
  //   } catch (error) {
  //     console.log(error.response);
  //   }
  // };

  // const getListDataPosition = async (filter) => {
  //   try {
  //     const response = await RecruitmentApi.getListRecruitmentFilterParams(
  //       filter
  //     );
  //     setPosition(response.data);
  //   } catch (error) {
  //     console.log(error.response);
  //   }
  // };
  // // Full time
  // const getListDataFullTime = async (filter) => {
  //   try {
  //     const response = await RecruitmentApi.getListRecruitmentFilterParams(
  //       filter
  //     );
  //     setRecruitmentsFullTime(response.data);
  //   } catch (error) {
  //     console.log(error.response);
  //   }
  // };
  // // Tất cả ngành nghề
  // const getListDataCareers = async () => {
  //   try {
  //     const response = await CareerApi.getListCareer();
  //     setListCareers(response.data);
  //   } catch (error) {
  //     console.log(error.response);
  //   }
  // };
  // // Top 12 ứng tuyển nhiều nhất
  // const getListDataTopNewsRecruitments = async () => {
  //   try {
  //     const response = await RecruitmentApi.getListTopNewsRecruitments();
  //     setRecruitmentsTopNews(response.data);
  //   } catch (error) {
  //     console.log(error.response);
  //   }
  // };
  // // Tất cả lĩnh vực công ty
  // const getListDataFieldsCompany = async () => {
  //   try {
  //     const response = await FieldCompanyApi.getListFieldsCompany();
  //     setCompanyFields(response.data);
  //   } catch (error) {
  //     console.log(error.response);
  //   }
  // };

  // useEffect(() => {
  //   getListData();
  //   getListDataPartTime(BAN_THOI_GIAN);
  //   getListDataFields(LINH_VUC);
  //   getListDataPosition(VI_TRI);
  //   getListDataFullTime(TOAN_THOI_GIAN);
  //   getListDataCareers();
  //   getListDataTopNewsRecruitments();
  //   getListDataFieldsCompany();
  // }, []);

  return (
    <Fragment>
      <Helmet>
        <title>Trang chủ | 123job.org</title>
      </Helmet>
      <MainNavigation />

      <div className="mt-65">
        <SearchCommon
          careers={listCareers}
          fields={companyFields}
          locations={location}
        />
        <Layout>
          <JobProvider>
            <div className="container pt-5 bottom-footer">
              <Content>
                {/* Title */}
                <div className="row mt-2">
                  <div className="col-12">
                    <h4>{t("common.titleHome")}</h4>
                    <p>{t("common.titleParagraph")}</p>
                  </div>
                </div>
                {/* CarouselImage */}
                <div className="row">
                  <div className="col-12">
                    <CarouselImage />
                  </div>
                </div>
                {/* 12 tin nổi bật nhất */}
                <div className="bg-white px-3 pt-1">
                  <div className="row mt-5">
                    <div className="col-12">
                      <h5 className="text-uppercase">
                        <AiFillStar className="pb-1" />
                        {t("common.recruitingTopNews")}
                      </h5>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <JobList recruitments={recruitmentsTopNews} />
                  </div>
                  <div className="row mt-5">
                    <div className="col-12">
                      <h5 className="text-uppercase">
                        <AiFillStar className="pb-1" />
                        {t("common.titleRecruitmentNew")}
                      </h5>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <JobList recruitments={recruitments} />
                  </div>
                  <div className="row mt-2">
                    <div className="col-12">
                      <CarouselCustom />
                    </div>
                  </div>
                  <div className="my-3">
                    <div className="row mt-4">
                      <div className="col-12">
                        <h5 className="text-uppercase">
                          <AiFillStar className="pb-1" />
                          {t("common.titlePartTimeJob")}
                        </h5>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <JobList recruitments={recruitmentsPartTime} />
                    </div>
                  </div>
                  {/* Three */}
                  <div className="d-flex flex-wrap mt-4 pb-5 mb-2">
                    <div className="width-33 me-4">
                      <div className="row mt-2">
                        <div className="col-12">
                          <h5 className="text-uppercase">
                            <AiFillDollarCircle className="pb-1" /> &nbsp;
                            {t("common.titleFullTimeJob")}
                          </h5>
                        </div>
                        <div
                          className="height-405 overflow-auto"
                          id="custom-scrollbar"
                        >
                          <div className="col-12">
                            <JobListFilter
                              recruitments={recruitmentsFullTime}
                            />
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
                        <div
                          className="height-405 overflow-auto"
                          id="custom-scrollbar"
                        >
                          <div className="col-12">
                            <JobListFilter recruitments={position} />
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
                        <div
                          className="height-405 overflow-auto"
                          id="custom-scrollbar"
                        >
                          <div className="col-12">
                            <JobListFilter recruitments={fields} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white px-3 mt-4 mb-2 py-1">
                  <div className="d-flex flex-wrap mt-4 pb-5 mb-2">
                    <div className="width-33 me-4">
                      <div className="row mt-2">
                        <div className="col-12">
                          <h5 className="text-uppercase">
                            <AiFillDollarCircle className="pb-1" /> &nbsp;
                            {t("common.recruitingTrainees")}
                          </h5>
                        </div>
                        <div
                          className="height-405 overflow-auto"
                          id="custom-scrollbar"
                        >
                          <div className="col-12">
                            <JobListFilter
                              recruitments={recruitmentsFullTime}
                            />
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
                        <div
                          className="height-405 overflow-auto"
                          id="custom-scrollbar"
                        >
                          <div className="col-12">
                            <JobListFilter recruitments={position} />
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
                        <div
                          className="height-405 overflow-auto"
                          id="custom-scrollbar"
                        >
                          <div className="col-12">
                            <JobListFilter recruitments={fields} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Các ngành nghề*/}
                <div className="bg-white px-3 mt-4 mb-2">
                  <div className="row mt-2 pb-4">
                    <div className="col-12">
                      <h5 className="text-uppercase pt-4">
                        <FaUsersCog className="pb-1" /> &nbsp;
                        {t("common.careers")}
                      </h5>
                    </div>
                    <CareerTrends careers={careers} />
                  </div>
                </div>
              </Content>
            </div>
          </JobProvider>
        </Layout>
        <FooterHome />
      </div>
    </Fragment>
  );
};

export default Home;
