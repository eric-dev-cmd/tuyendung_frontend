import React, { Fragment, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Avatar, Button, Col, Row } from "antd";
import { BiDetail, BiPaperPlane } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import {
  FacebookIcon,
  FacebookMessengerIcon,
  LinkedinIcon,
  PinterestIcon,
  TwitterIcon,
} from "react-share";
import { Timeline } from "antd";
import RecruitmentApi from "../../../../services/recruitmentApi";
import JobList from "../../../../components/CompanyJobs/components/JobList";

const ProductGeneralInfomation = ({company}, ...props) => {
  const { t } = useTranslation();
  const [location, setLocation] = useState(props.diaDiem || {});
  const [dataCompany, setDataCompany] = useState([])
  console.log("AAA", company);
  // // Việc làm theo nhà tuyển dụng
  const getListTinTuyenDungTheoNhaTuyenDung = async () => {
    try {
      const response = await RecruitmentApi.getListRecruitmentFilterParamsNhaTuyenDungById(company?._id);
      setDataCompany(response?.data);
      console.log("response?.data company", response?.data);

    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    getListTinTuyenDungTheoNhaTuyenDung();
  }, [company?._id]);
    useEffect(() => {
      getListTinTuyenDungTheoNhaTuyenDung();
    }, []);

  useEffect(() => {
      console.log(dataCompany);
  }, []);
  return (
    <Fragment>
      <Row>
        <Col span={24}>
          <div className="box-info-job">
            <h1 className="text-dark d-flex align-items-center">
              <BiDetail />
              <span className="ps-1">Tin tức tuyển dụng liên quan</span>
            </h1>
          </div>
        </Col>
      </Row>

      <Row gutter={[32, 8]}></Row>
      <Row gutter={[32, 8]}>
        <Col span={16}>
          <div className="">
            <div className="row">
              <JobList recruitments={dataCompany} />
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div className="px-2 py-3 mx-2 border">
            <h6 className="ps-1">
              <strong>
                {t("productDetail.tabs.tabDetail.shareRecruitment")}
              </strong>
            </h6>
            <div className="ps-1">
              <p>Sao chép đường dẫn</p>
              <p className="pb-1">Chia sẻ qua mạng xã hội</p>
              <div>
                <FacebookIcon />
                <FacebookMessengerIcon />
                <LinkedinIcon />
                <PinterestIcon />
                <TwitterIcon />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

ProductGeneralInfomation.propTypes = {};

export default ProductGeneralInfomation;
