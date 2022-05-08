import React from "react";
import PropTypes from "prop-types";
import { Button, Col, Row } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import "./ProductHeader.css";
import {
  ClockCircleOutlined,
  HeartOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { BiPaperPlane } from "react-icons/bi";

const ProductHeader = (props) => {
  const { t } = useTranslation();
  return (
    <>
      <Row gutter={[24, 16]}>
        <Col span={3}>
          <Avatar
            size={{
              xs: 24,
              sm: 32,
              md: 40,
              lg: 64,
              xl: 80,
              xxl: 100,
            }}
            src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
          />
        </Col>
        <Col span={17}>
          <div className="box-info-job">
            <h1>Nhân Viên Thủ Kho (Lương Từ 9 Triệu Trở Lên)</h1>
            <div className="company-title mb-2">
              <a href="https://www.topcv.vn/cong-ty/chi-nhanh-cong-ty-tnhh-mtv-ha-thanh/100146.html">
                CHI NHÁNH CÔNG TY TNHH MTV HÀ THÀNH
              </a>
            </div>

            <div className="job-deadline d-flex">
              <div>
                <ClockCircleOutlined />
              </div>
              <span className="pt-3px px-1">Hạn nộp hồ sơ: 01/06/2022</span>
            </div>
          </div>
        </Col>
        <Col span={4}>
          <div>
            <Button
              className="form-control d-flex align-items-center justify-content-center py-2 my-4"
              type="primary"
              icon={<BiPaperPlane />}
            >
              <span className="ps-2">{t("productDetail.applyNow")}</span>
            </Button>
          </div>
          <div>
            <Button
              className="form-control d-flex align-items-center justify-content-center py-2 my-4"
              icon={<HeartOutlined />}
            >
              {t("productDetail.saveRecruitment")}
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
};

ProductHeader.propTypes = {};

export default ProductHeader;
