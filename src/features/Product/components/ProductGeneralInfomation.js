import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Avatar, Button, Col, Row } from "antd";
import { BiDetail, BiPaperPlane } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import { HeartOutlined } from "@ant-design/icons";
import {
  FacebookIcon,
  FacebookMessengerIcon,
  LinkedinIcon,
  PinterestIcon,
  TwitterIcon,
} from "react-share";
import { Timeline } from "antd";

const ProductGeneralInfomation = (props) => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <Row>
        <Col span={24}>
          <div className="box-info-job">
            <h1 className="text-dark d-flex align-items-center">
              <BiDetail />
              <span className="ps-1">
                {t("productDetail.tabs.tabDetail.detailRecruitment")}
              </span>
            </h1>
          </div>
        </Col>
      </Row>
      <Row gutter={[32, 8]}>
        <Col span={16}>
          <div className="px-3 py-2 mx-2 bg-detail">
            <Row>
              <Col span={24}>
                <p className="text-decoration-underline fw-bolder mb-2">
                  Thông tin chung
                </p>
              </Col>
              <Col span={12}>
                <Row>
                  <Col span={3} className="d-flex align-items-center">
                    <Avatar src="https://www.topcv.vn/v4/image/job-detail/icon/1.svg" />
                  </Col>
                  <Col span={21}>
                    {" "}
                    <p>
                      {" "}
                      <strong className="mb-2">Mức lương</strong>
                    </p>
                    <p>Trên 9 triệu</p>
                  </Col>
                </Row>
              </Col>

              <Col span={12}>
                <Row>
                  <Col span={3} className="d-flex align-items-center">
                    <Avatar src="https://www.topcv.vn/v4/image/job-detail/icon/5.svg" />
                  </Col>
                  <Col span={21}>
                    {" "}
                    <p>
                      {" "}
                      <strong className="mb-2">Số lượng tuyển</strong>
                    </p>
                    <p>1 người</p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <div className="column-detail-2 my-3">
              <Row>
                <Col span={12}>
                  <Row>
                    <Col span={3} className="d-flex align-items-center">
                      <Avatar src="https://www.topcv.vn/v4/image/job-detail/icon/2.svg" />
                    </Col>
                    <Col span={21}>
                      {" "}
                      <p>
                        {" "}
                        <strong className="mb-2">Hình thức làm việc</strong>
                      </p>
                      <p>Toàn thời gian</p>
                    </Col>
                  </Row>
                </Col>

                <Col span={12}>
                  <Row>
                    <Col span={3} className="d-flex align-items-center">
                      <Avatar src="https://www.topcv.vn/v4/image/job-detail/icon/6.svg" />
                    </Col>
                    <Col span={21}>
                      {" "}
                      <p>
                        {" "}
                        <strong className="mb-2">Cấp bậc</strong>
                      </p>
                      <p>Nhân viên</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
            <div className="column-detail-3 my-3">
              <Row>
                <Col span={12}>
                  <Row>
                    <Col span={3} className="d-flex align-items-center">
                      <Avatar src="https://www.topcv.vn/v4/image/job-detail/icon/3.svg" />
                    </Col>
                    <Col span={21}>
                      {" "}
                      <p>
                        {" "}
                        <strong className="mb-2">Giới tính</strong>
                      </p>
                      <p>Không yêu cầu</p>
                    </Col>
                  </Row>
                </Col>

                <Col span={12}>
                  <Row>
                    <Col span={3} className="d-flex align-items-center">
                      <Avatar src="https://www.topcv.vn/v4/image/job-detail/icon/7.svg" />
                    </Col>
                    <Col span={21}>
                      {" "}
                      <p>
                        {" "}
                        <strong className="mb-2">Kinh nghiệm</strong>
                      </p>
                      <p>1 năm</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
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
      <Row gutter={[32, 8]}>
        <Col span={16}>
          <div className="px-3 py-2 mx-2 mt-3 bg-detail">
            <Row>
              <Col span={24}>
                <p className="text-decoration-underline fw-bolder mb-2 ">
                  Thông tin chung
                </p>
                <div>
                  <div className="mb-2">
                    - Hồ Chí Minh: 35 Nguyễn An Khương, Phường 13, Quận 5, Thành
                    Phố Hồ Chí Minh, Quận 5
                  </div>
                </div>
              </Col>
              <div className="mt-3">
                <Row>
                  <Col span={24}>
                    <p className="fw-bolder mb-3">Mô tả công việc</p>
                    <div>
                      <div className="mb-2">
                        <Timeline>
                          <Timeline.Item color="gray">
                            Kiểm tra các chứng từ yêu cầu nhập / xuất hàng theo
                            đúng quy định.
                          </Timeline.Item>
                          <Timeline.Item color="gray">
                            Thực hiện việc nhập và xuất hàng cho cá nhân liên
                            quan
                          </Timeline.Item>
                          <Timeline.Item color="gray">
                            Ghi phiếu nhập, phiếu xuất kho.
                          </Timeline.Item>
                          <Timeline.Item color="gray">
                            Theo dõi số lượng xuất nhập tồn hàng ngày và đối
                            chiếu với định mức tồn kho tối thiểu.
                          </Timeline.Item>
                        </Timeline>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Row>
          </div>
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
              <Button>Báo cáo tin tuyển dụng không chính xác</Button>
            </div>
          </div>
          <div className="px-2 py-3 mx-2 mt-3 border">
            <h6 className="ps-1">
              <strong>Ngành nghề</strong>
            </h6>
            <div className="ps-1">
              <Button className="me-2">Xuất nhập khẩu</Button>
              <Button className="me-2">Xây dựng</Button>
              <Button className="me-2">Vận tải</Button>
            </div>
          </div>
          <div className="px-2 py-3 mx-2 mt-3 border">
            <h6 className="ps-1">
              <strong>Khu vực</strong>
            </h6>
            <div className="ps-1">
              <Button className="me-2">Quận 5</Button>
              <Button className="me-2">Hồ Chí Minh</Button>
            </div>
          </div>
        </Col>
      </Row>
      {/* Mô tả công việc */}
      <Row gutter={[32, 8]}>
        <Col span={24}>
          <div className="px-3 mt-3">
            <Row>
              <Col span={24}>
                <p className="fw-bolder mb-3">Yêu cầu ứng viên</p>
                <div>
                  <div className="">
                    <Timeline>
                      <Timeline.Item color="gray">
                        Kiểm tra các chứng từ yêu cầu nhập / xuất hàng theo đúng
                        quy định.
                      </Timeline.Item>
                      <Timeline.Item color="gray">
                        Thực hiện việc nhập và xuất hàng cho cá nhân liên quan
                      </Timeline.Item>
                      <Timeline.Item color="gray">
                        Ghi phiếu nhập, phiếu xuất kho.
                      </Timeline.Item>
                      <Timeline.Item color="gray">
                        Theo dõi số lượng xuất nhập tồn hàng ngày và đối chiếu
                        với định mức tồn kho tối thiểu.
                      </Timeline.Item>
                    </Timeline>
                  </div>
                </div>
                <div className="quyenloi">
                  <p className="fw-bolder mb-3">Quyền lợi</p>
                  <div>
                    <div className="mb-2">
                      <Timeline>
                        <Timeline.Item color="gray">
                          Kiểm tra các chứng từ yêu cầu nhập / xuất hàng theo
                          đúng quy định.
                        </Timeline.Item>
                        <Timeline.Item color="gray">
                          Thực hiện việc nhập và xuất hàng cho cá nhân liên quan
                        </Timeline.Item>
                        <Timeline.Item color="gray">
                          Ghi phiếu nhập, phiếu xuất kho.
                        </Timeline.Item>
                        <Timeline.Item color="gray">
                          Theo dõi số lượng xuất nhập tồn hàng ngày và đối chiếu
                          với định mức tồn kho tối thiểu.
                        </Timeline.Item>
                      </Timeline>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="fw-bolder mb-3">Cách thức ứng tuyển</p>
                  <span>
                    Ứng viên nộp hồ sơ trực tuyến bằng cách bấm{" "}
                    <span className="text-highlight fw-bold">
                      Ứng tuyển ngay{" "}
                    </span>
                    dưới đây.
                  </span>
                  <Row gutter={[32, 8]}>
                    <Col span={6}>
                      <Button
                        className="form-control d-flex align-items-center justify-content-center py-4 my-1"
                        type="primary"
                        icon={<BiPaperPlane />}
                      >
                        <span className="ps-2">
                          {t("productDetail.applyNow")}
                        </span>
                      </Button>
                    </Col>

                    <Col span={3}>
                      <Button
                        className="form-control d-flex align-items-center justify-content-center py-4 my-1"
                        icon={<HeartOutlined />}
                      >
                        {t("productDetail.saveRecruitment")}
                      </Button>
                    </Col>
                    <Col span={15}></Col>
                    <Col span={24}>
                      <p>Hạn nộp hồ sơ: 01/06/2022</p>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

ProductGeneralInfomation.propTypes = {};

export default ProductGeneralInfomation;
