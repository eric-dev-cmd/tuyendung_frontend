import React, {
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import PropTypes from "prop-types";
import { Avatar, Button, Card, Modal, Tabs, Timeline } from "antd";
import { AntDesignOutlined } from "@ant-design/icons";
import { AiFillCamera, AiOutlinePlusCircle } from "react-icons/ai";
import { Input } from "antd";
import { FaUserEdit } from "react-icons/fa";
import IntroduceModal from "./components/profile/IntroduceModal.js";
import EducationModal from "./components/profile/EducationModal.js";
import ExperienceModal from "./components/profile/ExprerienceModal.js";
import CertificatedModal from "./components/profile/CertificatedModal.js";
import SkillModal from "./components/profile/SkillModal.js";
import { ProfileContext } from "../../context/ProfileContextProvider.js";
import RecruitmentApplicantApi from "../../services/recruitmentApplicant.js";
import { toast } from "react-toastify";

const ProfileMyPage = ({ ...props }) => {
  const { TabPane } = Tabs;
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalEducation, setIsShowModalEducation] = useState(false);
  const [isShowModalExperience, setIsShowModalExperience] = useState(false);
  const [isShowModalCertificated, setIsShowModalCertificated] = useState(false);
  const [isShowModalSkill, setIsShowModalSkill] = useState(false);
  const { detail, setDetail, isEdit, setIsEdit } = useContext(ProfileContext);
  const [isSuccessSubmit, setIsSuccessSubmit] = useState(false);
  const [isHideButtonIntroduce, setIsHideButtonIntroduce] = useState(false);
  const [isMounted, setIsMounted] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));

  const getProfileDetail = async () => {
    try {
      const response =
        await RecruitmentApplicantApi.getRecruitmentApplicantById(
          user.taiKhoan._id
        );
      console.log("response", response);
      setDetail(response);
      setIsSuccessSubmit(false);
      setIsEdit(true);
    } catch (error) {
      setIsEdit(false);
    }
  };

  useEffect(() => {
    let timeout = null;
    if (isSuccessSubmit) {
      timeout = setTimeout(() => getProfileDetail(), 1000);
    }
    return () => clearTimeout(timeout);
  }, [isSuccessSubmit]);

  useEffect(() => {
    getProfileDetail();
    console.log("Data get profile by detail", detail);
  }, []);

  useEffect(() => {
    if (isEdit) {
      console.log("Call api have data");
      getProfileDetail();
    }
  }, []);

  // Handle Introduce

  console.log("isEditisEdit", isEdit);

  const handleSubmitModal = async (data) => {
    if (isEdit) {
      console.log("Call api update");
      console.log("update", data);
      try {
        const response =
          await RecruitmentApplicantApi.updateRecruitmentApplicant({
            loiGioiThieu: data.loiGioiThieu,
            taiKhoan: data.taiKhoan,
          });
        setDetail(response);
        setIsSuccessSubmit(true);
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
    } else {
      console.log("Call api create");
      try {
        const response =
          await RecruitmentApplicantApi.createRecruitmentApplicant(data);
        setDetail(response);
        setIsSuccessSubmit(true);
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
    }
  };

  const handleAddButtonClick = (e) => {
    e.preventDefault();
    setIsShowModal(true);
  };

  const renderModalIntroduce = useMemo(() => {
    if (!isShowModal) return null;

    return (
      <IntroduceModal
        showModal={isShowModal}
        onCloseModal={() => {
          setIsShowModal(false);
          // clearErrors();
        }}
        onSubmit={handleSubmitModal}
        detail={detail}
        isEdit={isEdit}
      />
    );
  }, [isShowModal]);

  // Handle Education

  const handleSubmitModalEducation = async (data) => {
    console.log("Submit modal educarion");
  };
  const handleAddButtonClickEducation = (e) => {
    e.preventDefault();
    console.log("SHOW MODAL Education");
    setIsShowModalEducation(true);
  };

  const renderModalEducation = useMemo(() => {
    if (!isShowModalEducation) return null;

    return (
      <EducationModal
        showModal={isShowModalEducation}
        onCloseModal={() => {
          setIsShowModalEducation(false);
          // clearErrors();
        }}
        onSubmit={handleSubmitModalEducation}
      />
    );
  }, [isShowModalEducation]);

  // Handle Experience

  const handleSubmitModalExperience = async (data) => {
    console.log("Submit modal handleSubmitModalExperience");
  };
  const handleAddButtonClickExperience = (e) => {
    e.preventDefault();
    console.log("SHOW MODAL handleAddButtonClickExperience");
    setIsShowModalExperience(true);
  };

  const renderModalExperience = useMemo(() => {
    if (!isShowModalExperience) return null;

    return (
      <ExperienceModal
        showModal={isShowModalExperience}
        onCloseModal={() => {
          setIsShowModalExperience(false);
          // clearErrors();
        }}
        onSubmit={handleSubmitModalExperience}
      />
    );
  }, [isShowModalExperience]);

  // Handle Certificated

  const handleSubmitModalCertificated = async (data) => {
    console.log("Submit modal handleSubmitModalExperience");
  };
  const handleAddButtonClickCertificated = (e) => {
    e.preventDefault();
    console.log("SHOW MODAL Certificated");
    setIsShowModalCertificated(true);
  };

  const renderModalCertificated = useMemo(() => {
    if (!isShowModalCertificated) return null;

    return (
      <CertificatedModal
        showModal={isShowModalCertificated}
        onCloseModal={() => {
          setIsShowModalCertificated(false);
          // clearErrors();
        }}
        onSubmit={handleSubmitModalCertificated}
      />
    );
  }, [isShowModalCertificated]);

  // Handle Skill

  const handleSubmitModalSkill = async (data) => {
    console.log("Submit modal handleSubmitModalSkill");
  };
  const handleAddButtonClickSkill = (e) => {
    e.preventDefault();
    console.log("SHOW MODAL Skill");
    setIsShowModalSkill(true);
  };

  const renderModalSkill = useMemo(() => {
    if (!isShowModalSkill) return null;

    return (
      <SkillModal
        showModal={isShowModalSkill}
        onCloseModal={() => {
          setIsShowModalSkill(false);
          // clearErrors();
        }}
        onSubmit={handleSubmitModalSkill}
      />
    );
  }, [isShowModalSkill]);

  return (
    <Fragment>
      {" "}
      <div className="bg-white" style={{ height: "306px" }}>
        <div className="profile-wrapper position-relative">
          <div className="profile-banner">
            <img src="https://123job.vn/images/profile/background_profile.png" />
          </div>
          <div className="profile-avatar d-flex align-items-center justify-content-center">
            <div className="position-relative  cursor-pointer">
              <Avatar
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                icon={<AntDesignOutlined />}
              />
              <label htmlFor="icon-button-file" className="cursor-pointer">
                <span className="position-absolute profile-avatar-icon">
                  <AiFillCamera />
                </span>
              </label>
            </div>
          </div>
          <input
            accept="image/*"
            id="icon-button-file"
            type="file"
            style={{ display: "none" }}
          />
        </div>
      </div>
      <div className="bg-white mt-3">
        <div className="px-1 border py-3">
          <Tabs tabPosition="left">
            <TabPane tab="Hồ sơ" key="1">
              <div className="row">
                <div className="col-12">
                  {/* <Card> */}
                  <Card type="inner" title="Giới thiệu">
                    <div className="row">
                      <div className="col-10">
                        <span>
                          {isEdit
                            ? detail?.data?.loiGioiThieu
                            : "Giới thiệu bản thân của bạn"}
                        </span>
                      </div>
                      <div className="col-2">
                        {isEdit && (
                          <Button
                            onClick={(e) => {
                              handleAddButtonClick(e);
                            }}
                            className="form-control d-flex align-items-center justify-content-center"
                            icon={<FaUserEdit />}
                            size="large"
                          >
                            <span className="ps-2">Chỉnh sửa</span>
                          </Button>
                        )}
                      </div>
                    </div>
                    {/* {isHideButtonIntroduce && (
                      <div className="row">
                        <div className="col-3"></div>
                        <div className="col-6">
                          <Button
                            onClick={(e) => handleAddButtonClick(e)}
                            className="form-control d-flex align-items-center justify-content-center py-2 my-4"
                            type="primary"
                            icon={<AiOutlinePlusCircle />}
                            size="large"
                          >
                            <span className="ps-2">Thêm giới thiệu</span>
                          </Button>
                        </div>
                        <div className="col-3"></div>
                      </div>
                    )} */}
                    <div className="row">
                      <div className="col-3"></div>
                      <div className="col-6">
                        {!isEdit && (
                          <Button
                            onClick={(e) => handleAddButtonClick(e)}
                            className="form-control d-flex align-items-center justify-content-center py-2 my-4"
                            type="primary"
                            icon={<AiOutlinePlusCircle />}
                            size="large"
                          >
                            <span className="ps-2">Thêm giới thiệu</span>
                          </Button>
                        )}
                      </div>
                      <div className="col-3"></div>
                    </div>
                  </Card>
                  <Card
                    style={{ marginTop: 16 }}
                    type="inner"
                    title="Học vấn và bằng cấp"
                  >
                    <div className="row">
                      <div className="col-10">
                        <Timeline mode="left">
                          <div className="row">
                            <div className="col-12">
                              <Timeline.Item>
                                <p>
                                  <strong>Cử nhân - CNTT</strong>
                                </p>
                                <p>Cao học - Đại học lâm nghiệp Việt Nam</p>
                                <p>1/2021 - 2/2021</p>
                                <p>Mô tả thêm</p>
                              </Timeline.Item>
                            </div>
                          </div>
                        </Timeline>
                      </div>
                      <div className="col-2">
                        <Button
                          onClick={(e) => {
                            handleAddButtonClickEducation(e);
                          }}
                          className="form-control d-flex align-items-center justify-content-center"
                          icon={<FaUserEdit />}
                          size="large"
                        >
                          <span className="ps-2">Chỉnh sửa</span>
                        </Button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-3"></div>
                      <div className="col-6">
                        <Button
                          onClick={(e) => handleAddButtonClickEducation(e)}
                          className="form-control d-flex align-items-center justify-content-center py-2 my-4"
                          type="primary"
                          icon={<AiOutlinePlusCircle />}
                          size="large"
                        >
                          <span className="ps-2">Thêm học vấn và bằng cấp</span>
                        </Button>
                      </div>
                      <div className="col-3"></div>
                    </div>
                  </Card>
                  <Card
                    style={{ marginTop: 16 }}
                    type="inner"
                    title="Kinh nghiệm làm việc"
                  >
                    <div className="row">
                      <div className="col-10">
                        <Timeline mode="left">
                          <div className="row">
                            <div className="col-12">
                              <Timeline.Item>
                                <p>
                                  <strong>Cử nhân - CNTT</strong>
                                </p>
                                <p>Cao học - Đại học lâm nghiệp Việt Nam</p>
                                <p>1/2021 - 2/2021</p>
                                <p>Mô tả thêm</p>
                              </Timeline.Item>
                            </div>
                          </div>
                        </Timeline>
                      </div>
                      <div className="col-2">
                        <Button
                          onClick={(e) => {
                            handleAddButtonClickExperience(e);
                          }}
                          className="form-control d-flex align-items-center justify-content-center"
                          icon={<FaUserEdit />}
                          size="large"
                        >
                          <span className="ps-2">Chỉnh sửa</span>
                        </Button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-3"></div>
                      <div className="col-6">
                        <Button
                          onClick={(e) => handleAddButtonClickExperience(e)}
                          className="form-control d-flex align-items-center justify-content-center py-2 my-4"
                          type="primary"
                          icon={<AiOutlinePlusCircle />}
                          size="large"
                        >
                          <span className="ps-2">
                            Thêm kinh nghiệm làm việc
                          </span>
                        </Button>
                      </div>
                      <div className="col-3"></div>
                    </div>
                  </Card>
                  <Card
                    style={{ marginTop: 16 }}
                    type="inner"
                    title="Kỹ năng chuyên môn"
                  >
                    <div className="row">
                      <div className="col-10">
                        <span className="text-center">
                          {" "}
                          Giờ không phải là lúc tỏ ra khiêm nhường. Hãy chia sẻ
                          những điểm mạnh nhất của bạn để thu hút những nhà
                          tuyển dụng hàng đầu.
                        </span>
                      </div>
                      <div className="col-2">
                        <Button
                          onClick={(e) => {
                            handleAddButtonClickSkill(e);
                          }}
                          className="form-control d-flex align-items-center justify-content-center"
                          icon={<FaUserEdit />}
                          size="large"
                        >
                          <span className="ps-2">Chỉnh sửa</span>
                        </Button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-3"></div>
                      <div className="col-6">
                        <Button
                          onClick={(e) => handleAddButtonClickSkill(e)}
                          className="form-control d-flex align-items-center justify-content-center py-2 my-4"
                          type="primary"
                          icon={<AiOutlinePlusCircle />}
                          size="large"
                        >
                          <span className="ps-2">Thêm kỹ năng</span>
                        </Button>
                      </div>
                      <div className="col-3"></div>
                    </div>
                  </Card>
                  <Card
                    style={{ marginTop: 16 }}
                    type="inner"
                    title="Chứng chỉ / Giấy chứng nhận"
                  >
                    <div className="row">
                      <div className="col-10">
                        <span>
                          {" "}
                          Chứng chỉ về ngoại ngữ, kỹ năng quản lý, ...
                        </span>
                      </div>
                      <div className="col-2">
                        <Button
                          onClick={(e) => {
                            handleAddButtonClickCertificated(e);
                          }}
                          className="form-control d-flex align-items-center justify-content-center"
                          icon={<FaUserEdit />}
                          size="large"
                        >
                          <span className="ps-2">Chỉnh sửa</span>
                        </Button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-3"></div>
                      <div className="col-6">
                        <Button
                          onClick={(e) => handleAddButtonClickCertificated(e)}
                          className="form-control d-flex align-items-center justify-content-center py-2 my-4"
                          type="primary"
                          icon={<AiOutlinePlusCircle />}
                          size="large"
                        >
                          <span className="ps-2">Thêm mới chứng chỉ</span>
                        </Button>
                      </div>
                      <div className="col-3"></div>
                    </div>
                  </Card>
                  {/* </Card> */}
                </div>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
      {renderModalIntroduce}
      {renderModalEducation}
      {renderModalExperience}
      {renderModalCertificated}
      {renderModalSkill}
    </Fragment>
  );
};

ProfileMyPage.defaultProps = {
  detail: {},
};

export default ProfileMyPage;
