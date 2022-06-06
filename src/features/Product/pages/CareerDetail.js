import { Layout, Tabs } from "antd";
import { Content } from "antd/lib/layout/layout";
import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import FooterHome from "../../../components/Footer/FooterHome";
import JobProvider from "../../../components/JobHome/context/jobCommonContext";
import MainNavigation from "../../../components/Layout/MainNavigation";
import FieldCompanyApi from "../../../services/fieldCompanyApi";
import ProductGeneralInfomation from "../components/company/ProductGeneralInfomation";
import ProductHeader from "../components/career/ProductHeader";
import ProductCompanyGeneralInfomation from "../components/company/ProductCompanyGeneralInfomation";
import RecruitmentApi from "../../../services/recruitmentApi";
import SearchCommon from "../../../components/Search";
import { useCommonContext } from "../../../components/Search/context/commonContext";
import queryString from "query-string";

const { TabPane } = Tabs;

const CareerDetail = (props) => {
  const { t } = useTranslation();
  const params = useParams();
  const { slug } = params;
  console.log(
    "🚀 ~ file: CompanyDetail.js ~ line 29 ~ CompanyDetail ~ slug",
    slug
  );
  const match = useRouteMatch();
  const [isShowModal, setIsShowModal] = useState(false);
  const [checkAppliedJob, setCheckAppliedJob] = useState();
  const [role, setRole] = useState();
  const history = useHistory();
  const { isAuthenticated } = useSelector((state) => state?.userLogin);
  const userId = useSelector((state) => state?.userLogin?.user?.taiKhoan._id);
  const [recruitmentsLinhVuc, setRecruitmentsLinhVuc] = useState([]);
  const [company, setCompany] = useState();
  const handleAddButtonClick = () => {};
  const { location, listCareers, companyFields } = useCommonContext();
  const getCompanyDetail = async () => {
    try {
      const response = await FieldCompanyApi.getCompanyById(slug);
      setCompany(response?.data[0]);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    getCompanyDetail();
  }, [slug]);

  const [field, setField] = useState();
  const getLinhVucById = async () => {
    try {
      const response = await FieldCompanyApi.getListFieldsLinhVucById(slug);
      setField(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLinhVucById();
  }, []);
  useEffect(() => {
    getLinhVucById();
  }, [slug]);

  return (
    <Fragment>
      <Helmet>
        <title>Company Detail | jobboard.com</title>
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
          <div className="container pt-2 bottom-footer bg-white my-4">
            <Content>
              <ProductHeader field={field} />
            </Content>
          </div>
        </JobProvider>
      </Layout>
      <FooterHome />
    </Fragment>
  );
};

CareerDetail.propTypes = {};

export default CareerDetail;
