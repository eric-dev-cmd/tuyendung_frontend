import { Layout, Tabs } from "antd";
import { Content } from "antd/lib/layout/layout";
import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useParams, useRouteMatch } from "react-router-dom";
import FooterHome from "../../../components/Footer/FooterHome";
import JobProvider from "../../../components/JobHome/context/jobCommonContext";
import MainNavigation from "../../../components/Layout/MainNavigation";
import SearchCommon from "../../../components/Search";
import { useCommonContext } from "../../../components/Search/context/commonContext";
import ProductCompanyGeneralInfomation from "../components/ProductCompanyGeneralInfomation";
import ProductGeneralInfomation from "../components/ProductGeneralInfomation";
import ProductHeader from "../components/ProductHeader";

const { TabPane } = Tabs;

const ProductDetail = (props) => {
  const params = useParams();
  const { slug } = params;
  const match = useRouteMatch();
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
  const { t } = useTranslation();

  console.log("Slug", slug);
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
                <ProductHeader />
              </div>
              <div className="my-2">
                <div className="card-container my-3 py-3">
                  <Tabs defaultActiveKey="1" style={{ width: "100%" }}>
                    <TabPane tab={t("productDetail.tabs.header.tab1")} key="1">
                      <div className="px-3 py-3 bg-white ">
                        <ProductGeneralInfomation />
                      </div>
                    </TabPane>
                    <TabPane tab={t("productDetail.tabs.header.tab2")} key="2">
                      <div className="px-3 py-3 bg-white ">
                        <ProductCompanyGeneralInfomation />
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
