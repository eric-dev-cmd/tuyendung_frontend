import React, { Fragment } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import classes from "./JobItem.module.css";
import clsx from "clsx";
import { Tooltip } from "antd";
import { Link } from "react-router-dom";
import { getUserProfile } from "../../../utils/localStorage";
import InterestedJobApi from "../../../services/interestedJobApi";
import { toast } from "react-toastify";

const JobItem = (props) => {
  const {
    jobItemImageWrapper,
    jobItemParagraph,
    jobItemImage,
    jobItemFavoriteWrapper,
  } = classes;
  const styleImage = clsx(jobItemImageWrapper, "rounded");
  const user = getUserProfile();
  const handleSubmitFavorite = async () => {
    const payload = {
      tinTuyenDung: props?.jobs?._id,
      ungTuyenVien: user.taiKhoan._id,
    };
    try {
      const response = await InterestedJobApi.creatInterestedJob(payload);
      if (response.status === "success") {
        toast.success("Lưu việc làm quan tâm thành công", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response);
      console.log(error.response);
    }
  };

  return (
    <Fragment>
      <div className={classes + "border"}>
        <div className="job-item-wrapper">
          <div className="d-flex align-items-center position-relative flex-wrap">
            <div className={styleImage}>
              <Tooltip
                placement="top"
                title={props?.jobs?.nhaTuyenDung?.tenCongty}
              >
                <Link
                  className="text-decoration-none"
                  to={`/job-detail/${props?.jobs?._id}`}
                >
                  <img
                    className={clsx([jobItemImage, "rounded"])}
                    src={`https://webtuyendung.s3.ap-southeast-1.amazonaws.com/${props?.jobs?.nhaTuyenDung?.avatar}`}
                    alt="Logo"
                  />
                </Link>
              </Tooltip>
            </div>
            <div className={clsx([jobItemParagraph, "mt-3 px-3"])}>
              <Tooltip placement="top" title={props?.jobs?.tieuDe}>
                <Link
                  className="titleParagraphOne text-dark fw-bold"
                  to={`/job-detail/${props?.jobs?._id}`}
                >
                  <strong>{props?.jobs?.tieuDe}</strong>
                </Link>
              </Tooltip>
              <Tooltip
                placement="top"
                title={props?.jobs?.nhaTuyenDung?.tenCongty}
              >
                <p>
                  <Link
                    className="titleParagraphOne text-decoration-none text-muted"
                    to={`/job-detail/${props?.jobs?._id}`}
                  >
                    {props?.jobs?.nhaTuyenDung?.tenCongty}
                  </Link>
                </p>
              </Tooltip>
            </div>
            <div
              className={jobItemFavoriteWrapper}
              onClick={(e) => {
                e.preventDefault();
                handleSubmitFavorite();
              }}
            >
              <div className="jobItemFavorite border border-secondary rounded position-absolute top-0 end-0 px-2 badge bg-light text-dark">
                <AiOutlineHeart className="fs-12" />
              </div>
            </div>
          </div>
          <div className="d-flex mt-2">
            <div className="jobItemSalary cursorDefault">
              <span className="badge bg-secondary me-3">
                {props?.jobs?.mucLuong}
              </span>
            </div>
            <div className="jobItemAddress cursorDefault">
              <span>
                <Tooltip
                  placement="top"
                  title={`${props?.jobs?.diaDiem.tinhThanhPho} - ${props?.jobs?.diaDiem?.quanHuyen}`}
                >
                  <span className="titleParagraphOne">
                    {props?.jobs?.diaDiem?.tinhThanhPho} -{" "}
                    {props?.jobs?.diaDiem?.quanHuyen}
                  </span>
                </Tooltip>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default JobItem;
