import { Layout, Tabs } from "antd";
import { Content } from "antd/lib/layout/layout";
import React, {
  Fragment, useEffect, useState
} from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  useHistory,
  useParams,
  useRouteMatch
} from "react-router-dom";
import FooterHome from "../../../components/Footer/FooterHome";
import JobProvider from "../../../components/JobHome/context/jobCommonContext";
import MainNavigation from "../../../components/Layout/MainNavigation";
import FieldCompanyApi from "../../../services/fieldCompanyApi";
import ProductGeneralInfomation from "../components/company/ProductGeneralInfomation";
import ProductHeader from "../components/company/ProductHeader";
import ProductCompanyGeneralInfomation from "../components/ProductCompanyGeneralInfomation";


const { TabPane } = Tabs;

const CompanyDetail = (props) => {
  const { t } = useTranslation();
  const params = useParams();
  const { slug } = params;
  console.log("🚀 ~ file: CompanyDetail.js ~ line 29 ~ CompanyDetail ~ slug", slug)
  const match = useRouteMatch();
  const [isShowModal, setIsShowModal] = useState(false);
  const [checkAppliedJob, setCheckAppliedJob] = useState();
  const [role, setRole] = useState()
  const history = useHistory();
  const { isAuthenticated } = useSelector((state) => state?.userLogin);
  const userId = useSelector((state) => state?.userLogin?.user?.taiKhoan._id);
  const [recruitmentsLinhVuc, setRecruitmentsLinhVuc] = useState([]);
  const [company, setCompany] = useState();
  const handleAddButtonClick = () => {

  }
    const getCompanyDetail = async () => {
      try {
        const response = await FieldCompanyApi.getCompanyById(
          slug,
        );
        console.log("response 1222", response?.data[0]);
        setCompany(response?.data[0]);
      } catch (error) {
        console.log(error.response);
      }
    };
    useEffect(() => {
      getCompanyDetail();
    }, [slug]);
  return (
    <Fragment>
      <Helmet>
        <title>Company Detail | jobboard.com</title>
      </Helmet>
      <MainNavigation />
      <div className="mt-65"></div>

      <Layout>
        <JobProvider>
          <div className="container bottom-footer">
            <Content>
              <div className="bg-white px-3 mt-4 mb-2 py-3">
                <ProductHeader
                  companyInfo={company}
                  checkAppliedJob={checkAppliedJob}
                  role={role}
                />
              </div>
              <div className="my-2">
                <div className="card-container my-3 py-3">
                  <Tabs
                    defaultActiveKey="2"
                    style={{ width: "100%" }}
                    onChange={(key) => {}}
                  >
                    <TabPane tab={t("productDetail.tabs.header.tab1")} key="1">
                      <div className="px-3 py-3 bg-white ">
                        <ProductGeneralInfomation
                        company={company}
                        />
                      </div>
                     
                    </TabPane>
                    <TabPane tab={t("productDetail.tabs.header.tab2")} key="2">
                      <div className="px-3 py-3 bg-white rounded">
                        <ProductCompanyGeneralInfomation
                          companyInfo={company}
                        />
                      </div>
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

CompanyDetail.propTypes = {};

export default CompanyDetail;
