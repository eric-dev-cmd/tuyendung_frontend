import { Avatar, Col, Row } from "antd";
import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { BsBoxArrowUpRight, BsInfoSquare } from "react-icons/bs";
const ProductCompanyGeneralInfomation = (props) => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <Row>
        <Col span={24}>
          <div className="box-info-job d-flex align-items-center justify-content-between">
            <h1 className="text-dark d-flex align-items-center">
              <BsInfoSquare />{" "}
              <span className="ps-4">
                Thông tin CHI NHÁNH CÔNG TY TNHH MTV HÀ THÀNH
              </span>
            </h1>
            <div>
              <Link to="/company" target="_blank">
                <span className="fs-14"> Xem trang công ty</span>{" "}
                <BsBoxArrowUpRight size={12} />
              </Link>
            </div>
          </div>
        </Col>
      </Row>
      <Row gutter={[32, 8]}>
        <Col span={24}>
          <div className="mb-3">
            <Row gutter={[32, 8]}>
              <Col span={1}>
                <Avatar src="https://www.topcv.vn/v4/image/job-detail/icon/8.svg" />
              </Col>
              <Col span={23}>
                <p className="fw-bolder mb-2">Giới thiệu</p>
                <p>
                  Chi nhánh Công ty TNHH MTV Hà Thành là chi nhánh của công ty
                  TNHH MTV Hà Thành theo giấy phép kinh doanh số: 0100108529
                  ngày 27/6/1996, công ty chuyên kinh doanh bán buôn máy móc,
                  thiết bị và phụ tùng máy nông nghiệp. Sản xuất các cấu kiện
                  kim loại, xây dựng nhà các loại, xây dựng công trình đường ...
                </p>
              </Col>
            </Row>
          </div>
          <div className="mb-3">
            <Row gutter={[32, 8]}>
              <Col span={1}>
                <Avatar src="https://www.topcv.vn/v4/image/job-detail/icon/9.svg" />
              </Col>
              <Col span={23}>
                <p className="fw-bolder mb-2">Qui mô</p>
                <p>25-99 nhân viên</p>
              </Col>
            </Row>
          </div>

          <Row gutter={[32, 8]}>
            <Col span={1}>
              <Avatar src="https://www.topcv.vn/v4/image/job-detail/icon/10.svg" />
            </Col>
            <Col span={23}>
              <p className="fw-bolder mb-2">Địa điểm</p>
              <p>
                35 Nguyễn An Khương, Phường 13, Quận 5, Thành Phố Hồ Chí Minh
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Fragment>
  );
};

ProductCompanyGeneralInfomation.propTypes = {};

export default ProductCompanyGeneralInfomation;
