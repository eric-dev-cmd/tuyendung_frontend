import { Button, Col, Layout, Row, Tabs, Timeline } from "antd";
import { Content } from "antd/lib/layout/layout";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { BiPaperPlane } from "react-icons/bi";
import { useParams, useRouteMatch } from "react-router-dom";
import FooterHome from "../../../components/Footer/FooterHome";
import JobProvider from "../../../components/JobHome/context/jobCommonContext";
import MainNavigation from "../../../components/Layout/MainNavigation";
import SearchCommon from "../../../components/Search";
import { useCommonContext } from "../../../components/Search/context/commonContext";
import RecruitmentApi from "../../../services/recruitmentApi";
import ProductCompanyGeneralInfomation from "../components/ProductCompanyGeneralInfomation";
import ProductGeneralInfomation from "../components/ProductGeneralInfomation";
import ProductHeader from "../components/ProductHeader";
import { ProductContext, useProductContext } from "../context/ProductContext";
import { HeartOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

const ProductDetail = (props) => {
  const { t } = useTranslation();
  const params = useParams();
  const { slug } = params;
  const match = useRouteMatch();
  const { isSubmit, setIsSubmit, detail, setDetail } = useProductContext();
  const { location, listCareers, companyFields } = useCommonContext();
  const [phucLois, setPhucLois] = useState(detail.phucLoi || []);
  const [yeuCaus, setYeuCaus] = useState(detail.yeuCau || "");

  //CALL API
  const getRecruitmentById = async () => {
    // setLoading(true);
    try {
      const response = await RecruitmentApi.getRecruitmentById(slug);
      setDetail(response.data);
      setPhucLois(response.data.phucLoi);
      setYeuCaus(response.data.yeuCau);
      // setLoading(false);
    } catch (error) {
      // setLoading(false);
      console.log("error", error);
    }
  };
  const splitRequirement = () => {
    if (yeuCaus.indexOf(".") > -1) {
      let values = yeuCaus.split(".");
      return values.map((value, index) => (
        <Timeline.Item key={index} color="gray">
          {value}
        </Timeline.Item>
      ));
    }
  };

  useEffect(() => {
    let timeout = null;
    if (slug) {
      console.log("Call api depen");
      timeout = setTimeout(() => getRecruitmentById(), 1000);
    }
    return () => clearTimeout(timeout);
  }, [slug]);

  console.log("... logger detail", detail);
  console.log("... logger phucLois", phucLois);

  return (
    <Fragment>
      <Helmet>
        <title>Product Detail | 123job.org</title>
      </Helmet>
      <MainNavigation />
      <div className="mt-65">
        <SearchCommon
          careers={listCareers}
          fields={companyFields}
          locations={location}
        />
      </div>

      <Layout>
        <JobProvider>
          <div className="container bottom-footer">
            <Content>
              <div className="bg-white px-3 mt-4 mb-2 py-3">
                <ProductHeader
                  tieuDe={detail.tieuDe}
                  companyInfo={detail.nhaTuyenDung}
                  ngayHetHan={detail.ngayHetHan}
                />
              </div>
              <div className="my-2">
                <div className="card-container my-3 py-3">
                  <Tabs defaultActiveKey="1" style={{ width: "100%" }}>
                    <TabPane tab={t("productDetail.tabs.header.tab1")} key="1">
                      <div className="px-3 py-3 bg-white ">
                        <ProductGeneralInfomation
                          viTri={detail.viTri}
                          soLuongTuyen={detail?.soLuongTuyen}
                          kinhNghiem={detail?.soNamKinhNghiem}
                          gioiTinh={detail?.gioiTinh}
                          mucLuong={detail?.mucLuong}
                          hinhThucLamViec={detail?.loaiCongViec}
                          moTa={detail.moTa}
                          diaDiem={detail.diaDiem}
                          nganhNghe={detail.nganhNghe}
                        />
                      </div>
                      {/* Mô tả công việc */}
                      <div className="px-3 py-3 bg-white ">
                        <Row gutter={[32, 8]}>
                          <Col span={24}>
                            <div className="px-3 mt-3">
                              <Row>
                                <Col span={24}>
                                  <p className="fw-bolder mb-3">
                                    Yêu cầu ứng viên
                                  </p>
                                  <div>
                                    <div className="">
                                      <Timeline>{splitRequirement()}</Timeline>
                                    </div>
                                  </div>
                                  <div className="quyenloi">
                                    <p className="fw-bolder mb-3">Quyền lợi</p>
                                    <div>
                                      <div className="mb-2">
                                        <Timeline>
                                          {/* {phucLois.map((item, index) => (
                                            <Timeline.Item
                                              key={index}
                                              color="gray"
                                            >
                                              {item.tenPhucLoi}
                                            </Timeline.Item>
                                          ))} */}
                                        </Timeline>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <p className="fw-bolder mb-3">
                                      Cách thức ứng tuyển
                                    </p>
                                    <span className="pb-1">
                                      Ứng viên nộp hồ sơ trực tuyến bằng cách
                                      bấm{" "}
                                      <span className="text-highlight fw-bold">
                                        Ứng tuyển ngay{" "}
                                      </span>
                                      dưới đây.
                                    </span>
                                    <Row gutter={[32, 8]}>
                                      <Col span={6}>
                                        <Button
                                          className="form-control d-flex align-items-center justify-content-center py-4 my-2"
                                          type="primary"
                                          icon={<BiPaperPlane />}
                                        >
                                          <span className="ps-2">
                                            {t("productDetail.applyNow")}
                                          </span>
                                        </Button>
                                      </Col>

                                      <Col span={3}>
                                        <Button
                                          className="form-control d-flex align-items-center justify-content-center py-4 my-2"
                                          icon={<HeartOutlined />}
                                        >
                                          {t("productDetail.saveRecruitment")}
                                        </Button>
                                      </Col>
                                      <Col span={15}></Col>
                                      <Col span={24}>
                                        <p>Hạn nộp hồ sơ: 01/06/2022</p>
                                      </Col>
                                    </Row>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </TabPane>
                    <TabPane tab={t("productDetail.tabs.header.tab2")} key="2">
                      <div className="px-3 py-3 bg-white ">
                        <ProductCompanyGeneralInfomation
                          companyInfo={detail.nhaTuyenDung}
                        />
                      </div>
                    </TabPane>
                    <TabPane tab={t("productDetail.tabs.header.tab3")} key="3">
                      <p>Việc làm liên quan</p>
                    </TabPane>
                  </Tabs>
                </div>
              </div>
            </Content>
          </div>
        </JobProvider>
      </Layout>
      <FooterHome />
    </Fragment>
  );
};

ProductDetail.propTypes = {};

export default ProductDetail;
