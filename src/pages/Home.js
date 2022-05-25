import { Layout } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { AiFillDollarCircle, AiFillStar } from "react-icons/ai";
import { FaLaptopCode, FaUsersCog } from "react-icons/fa";
import CareerTrends from "../components/CareerTrends";
import CarouselImage from "../components/Carousel/Carousel";
import CarouselCustom from "../components/Carousel/CarouselCustom";
import FooterHome from "../components/Footer/FooterHome";
import JobList from "../components/JobHome/components/JobList";
import JobListFilter from "../components/JobHome/components/JobListFilter";
import JobProvider from "../components/JobHome/context/jobCommonContext";
import MainNavigation from "../components/Layout/MainNavigation";
import SearchCommon from "../components/Search";
import { useCommonContext } from "../components/Search/context/commonContext";
import { GlobalData } from "../data/globalData";
import CareerApi from "../services/careerApi";

const { Header, Footer, Sider, Content } = Layout;

const Home = () => {
  const { t } = useTranslation();
  const careers = GlobalData.xuHuongNgheNghiep();
  const [careersTrends, setCareersTrends] = useState([]);
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
    recruitmentsApproved,
  } = useCommonContext();

  useEffect(() => {
    const getListCareerTrends = async () => {
      try {
        const response = await CareerApi.getListCareerTrends();
        console.log("getListCareerTrends", response);
        setCareersTrends(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    getListCareerTrends();
  }, []);

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

                <div className="bg-white px-3 pt-1">
                  {/* 12 tin nổi bật nhất */}
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
                  {/* <div className="row mt-5">
                    <div className="col-12">
                      <h5 className="text-uppercase">
                        <AiFillStar className="pb-1" />
                        {t("common.titleRecruitmentNew")}
                      </h5>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <JobList recruitments={recruitments} />
                  </div> */}
                  <div className="row mt-2">
                    <div className="col-12">
                      <CarouselCustom />
                    </div>
                  </div>
                  {/* <div className="my-3">
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
                  </div> */}
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
                            {t("common.titlePartTimeJob")}
                          </h5>
                        </div>
                        <div
                          className="height-405 overflow-auto"
                          id="custom-scrollbar"
                        >
                          <div className="col-12">
                            <JobListFilter
                              recruitments={recruitmentsPartTime}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="width-33">
                      <div className="row mt-2">
                        <div className="col-12">
                          <h5 className="text-uppercase">
                            <FaLaptopCode className="pb-1" /> &nbsp;
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
                  </div>
                </div>

                {/* <div className="bg-white px-3 mt-4 mb-2 py-1">
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
                </div> */}

                {/* Các ngành nghề*/}
                <div className="bg-white px-3 mt-4 mb-2">
                  <div className="row mt-2 pb-4">
                    <div className="col-12">
                      <h5 className="text-uppercase pt-4">
                        <FaUsersCog className="pb-1" /> &nbsp;
                        {t("common.careers")}
                      </h5>
                    </div>
                    <CareerTrends careers={careersTrends} />
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
