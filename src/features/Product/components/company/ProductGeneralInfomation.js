import React, { Fragment, useContext, useState } from "react";
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

const ProductGeneralInfomation = (company, ...props) => {
  const { t } = useTranslation();
  const [location, setLocation] = useState(props.diaDiem || {});
  return (
    <Fragment>
      <Row>
        <Col span={24}>
          <div className="box-info-job">
            <h1 className="text-dark d-flex align-items-center">
              <BiDetail />
              <span className="ps-1">
                Tin tức tuyển dụng liên quan
              </span>
            </h1>
          </div>
        </Col>
      </Row>
      <Row gutter={[32, 8]}>

       
      </Row>
      <Row gutter={[32, 8]}>
        <Col span={16}>
        </Col>
        <Col span={8}>
          <div className="px-2 py-3 mx-2 mt-3 border">
            <h6 className="ps-1">
              <strong>
                {t("productDetail.tabs.tabDetail.reportRecruitment")}
              </strong>
            </h6>
            <div className="ps-1">
              <p className="pb-3">
                Nếu bạn thấy rằng tin tuyển dụng này không đúng, hãy phản ánh
                với chúng tôi
              </p>
              <Button style={{ width: "100%" }}>
                Báo cáo tin tuyển dụng không chính xác
              </Button>
            </div>
          </div>
          <div className="px-2 py-3 mx-2 mt-3 border">
            <h6 className="ps-1">
              <strong>Ngành nghề</strong>
            </h6>
            <div className="ps-1">
              <Button className="me-2">{props?.nganhNghe?.tenNganhNghe}</Button>
            </div>
          </div>
          <div className="px-2 py-3 mx-2 mt-3 border">
            <h6 className="ps-1">
              <strong>Khu vực</strong>
            </h6>
            <div className="ps-1">
              <Button className="me-2">{props?.diaDiem?.quanHuyen}</Button>
              <Button className="me-2">{props?.diaDiem?.tinhThanhPho}</Button>
            </div>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

ProductGeneralInfomation.propTypes = {};

export default ProductGeneralInfomation;
