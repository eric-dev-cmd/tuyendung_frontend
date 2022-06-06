import {
  ClockCircleOutlined
} from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BiPaperPlane } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import profileApi from "../../../../services/profileApi";
import { getUserProfile } from "../../../../utils/localStorage";
import TimeUtils from "../../../../utils/timeUtils";
import "./ProductHeader.css";

const ProductHeader = (props) => {
  const { isAuthenticated } = useSelector((state) => state?.userLogin);
  const users = useSelector((state) => state?.userLogin);
  const userU = getUserProfile();

  const userId = users?.user?.taiKhoan._id;
  const history = useHistory();
  const { t } = useTranslation();
  const expirationDateFormat = TimeUtils.formatDateTime(
    props?.ngayHetHan,
    "DD-MM-YYYY"
  );
  const [user, setUser] = useState();
  useEffect(() => {
    const getProfileDetail = async () => {
      try {
        console.log("userIduserId", userId);
        const response = await profileApi.getUngTuyenVien(userId);
        setUser(response?.data);
        console.log("response?.dataresponse?.data", response?.data);
      } catch (error) {
        toast.error(error, {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };
    getProfileDetail();
  }, [userId]);

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
            src={
              props?.companyInfo?.avatar
                ? `https://webtuyendung.s3.ap-southeast-1.amazonaws.com/${props?.companyInfo?.avatar}`
                : `https://webtuyendung.s3.ap-southeast-1.amazonaws.com/IMG_5700.JPG`
            }
          />
        </Col>
        <Col span={17}>
          <div className="box-info-job">
            <h1>{props.tieuDe}</h1>
            <div className="company-title mb-2">
              <Link to="#">{props?.companyInfo?.tenCongty}</Link>
            </div>

            <div className="job-deadline d-flex">
              <div>
                <ClockCircleOutlined />
              </div>
              <span className="pt-3px px-1">
                Qui mô: {props?.companyInfo?.quyMo}
              </span>
            </div>
          </div>
        </Col>
        <Col span={4}>
          <div>
            <>
              <Button
                className="form-control d-flex align-items-center justify-content-center py-4 my-4"
                type="primary"
                icon={<BiPaperPlane />}
                onClick={() => {}}
              >
                <span className="ps-2">Theo dõi tôi</span>
              </Button>
            </>
          </div>
        </Col>
      </Row>
    </>
  );
};

ProductHeader.propTypes = {};

export default ProductHeader;
