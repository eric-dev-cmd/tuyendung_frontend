import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Button, Col, Modal, Row } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import "./ProductHeader.css";
import {
  ClockCircleOutlined,
  HeartOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { BiPaperPlane } from "react-icons/bi";
import { Link } from "react-router-dom";
import TimeUtils from "../../../utils/timeUtils";
import ApplyJobModal from "./modal/ApplyJobModal";
import CandidateApplicationForm from "../../../services/candidateApplicationForm";
import { toast } from "react-toastify";

const ProductHeader = (props) => {
  const { t } = useTranslation();
  const expirationDateFormat = TimeUtils.formatDateTime(
    props?.ngayHetHan,
    "DD-MM-YYYY"
  );
  const [isShowModal, setIsShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddButtonClick = (e) => {
    e.preventDefault();
    setIsShowModal(true);
  };
  const handleSubmitModal = async (payload) => {
    console.log("Call api payload", payload);
    try {
      await CandidateApplicationForm.createApplicationForm(payload);
      // setDetail(response);
      // setIsSuccessSubmit(true);
      toast.success("Ứng tuyển thành công", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      toast.error(error.response?.data.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const renderModalApplyJob = useMemo(() => {
    if (!isShowModal) return null;

    return (
      <ApplyJobModal
        showModal={isShowModal}
        onCloseModal={() => {
          setIsShowModal(false);
          // clearErrors();
        }}
        onSubmit={handleSubmitModal}
        // detail={detail}
        // isEdit={isEdit}
      />
    );
  }, [isShowModal]);

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
                Hạn nộp hồ sơ: {expirationDateFormat}
              </span>
            </div>
          </div>
        </Col>
        <Col span={4}>
          <div>
            <Button
              onClick={handleAddButtonClick}
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
        {/* <Modal
          title="Ứng tuyển việc làm"
          visible={isShowModal}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Quay lại tìm việc
            </Button>,
            <Button
              key="submit"
              type="primary"
              // loading={loading}
              onClick={handleOk}
              disabled
            >
              Tiếp tục
            </Button>,
          ]}
        >
          <p>Hồ sơ của tôi</p>
          <div className="text-end">
            <Button type="primary">Hoàn thành hồ sơ của tôi</Button>
          </div>
        </Modal> */}
        {renderModalApplyJob}
      </Row>
    </>
  );
};

ProductHeader.propTypes = {};

export default ProductHeader;
