import React, { Fragment } from 'react'
import { AiOutlineHeart } from "react-icons/ai";
import classes from "./JobItem.module.css";
import clsx from "clsx"
import { Tooltip } from 'antd';

const JobItem = () => {
    const { jobItemImageWrapper, jobItemParagraph, jobItemImage, jobItemFavoriteWrapper } = classes
    const styleImage = clsx(jobItemImageWrapper, "rounded")
    return (
        <Fragment>
            <div className={classes + "border"}>
                <div className="job-item-wrapper">
                    <div className="d-flex align-items-center position-relative flex-wrap">
                        <div className={styleImage}>
                            <Tooltip placement="top" title={"Công ty Cổ phần Chứng khoán Phú Hưng"}>
                                <a href="#" className="text-decoration-none">
                                    <img className={clsx([jobItemImage, "rounded"])}
                                        src="https://cdn.topcv.vn/44/company_logos/cong-ty-co-phan-dau-tu-giao-duc-va-phat-trien-nguon-luc-quoc-te-pasal-5ad4093c6754b_rs.jpg"
                                        alt="Logo"
                                    />
                                </a>
                            </Tooltip>
                        </div>
                        <div className={clsx([jobItemParagraph, "mt-3 px-3"])}>
                            <Tooltip placement="top" title={"Senior Talent Acquisition Specialist"}>
                                <a href="#" className="titleParagraphOne text-dark fw-bold"><strong>Senior Talent Acquisition Specialist</strong></a>
                            </Tooltip>
                            <Tooltip placement="top" title={"Công ty Cổ phần Chứng khoán Phú Hưng"}>
                                <p>
                                    <a href="#" className="titleParagraphOne text-decoration-none text-muted">
                                        Công ty Cổ phần Chứng khoán Phú Hưng
                                    </a>
                                </p>
                            </Tooltip>
                        </div>
                        <div className={jobItemFavoriteWrapper}>
                            <div className="jobItemFavorite border border-secondary rounded position-absolute top-0 end-0 px-2 badge bg-light text-dark">
                                <AiOutlineHeart className="fs-12" />
                            </div>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="jobItemSalary cursorDefault">
                            <span className="badge bg-secondary me-3">10-12 triệu</span>
                        </div>
                        <div className="jobItemAddress cursorDefault">
                            <span>
                                <Tooltip placement="top" title={"Hồ Chí Minh, Bình Thạnh, HCM Bình Thạnh "}>
                                    <span className="titleParagraphOne">
                                        Hồ Chí Minh, Bình Thạnh
                                    </span>
                                </Tooltip>
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </Fragment >
    )
}

export default JobItem