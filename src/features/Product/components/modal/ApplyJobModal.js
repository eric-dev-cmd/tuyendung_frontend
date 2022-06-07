import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import { Button, Checkbox, Input, Modal, Tag } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { ProfileContext } from "../../../../context/ProfileContextProvider";
import { AiFillEdit } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../../../../utils/localStorage";
import profileApi from "../../../../services/profileApi";
import { toast } from "react-toastify";
import { RadioButton } from "../../../../components/RadioButton/RadioButton";
import "./styles.scss";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
const ApplyJobModal = ({
  showModal,
  onCloseModal,
  isEdit,
  isShowOptionApply,
  ...props
}) => {
  const [isEntered, setIsEntered] = useState(false);
  const [name, setName] = useState(props?.user?.ten);
  const [phone, setPhone] = useState(props?.user?.sdt);
  const [email, setEmail] = useState(props?.user?.taiKhoan?.email);
  const [introduce, setIntroduce] = useState(props?.user?.loiGioiThieu);
  const [isSendEmail, setIsSendEmail] = useState(false);
  const [applyUser, setApplyUser] = useState({});
  const [isShowButtonGD1, setIsShowButtonGD1] = useState(true);
  const [isShowNextPage2, setIsShowNextPage2] = useState(true);
  const [isShowApply, setIsShowApply] = useState(true);
  const [cvMethod, setCvMethod] = useState(0);
  // Xử lý file upload
  const [file, setFile] = useState();
  const inputFile = useRef(null);
  const params = useParams();
  const { slug } = params;
  console.log(" modal isEdit", isEdit);
  const accountUser = getUserProfile();
  const uniqueId = accountUser.taiKhoan._id;
  const [isDisabled, setIsDisabled] = useState(false);
  const [validationMsg, setValidationMsg] = useState("");

  const validateAll = () => {
    const msg = {};
    if (isEmpty(name)) {
      msg.name = "Vui lòng nhập tên của bạn";
    }
    if (isEmpty(phone)) {
      msg.phone = "Vui lòng nhập số điện thoại của bạn";
    }
    if (isEmpty(email)) {
      msg.email = "Vui lòng nhập email của bạn";
    } else if (!isEmail(email)) {
      msg.email = "Vui lòng nhập email hợp lệ";
    }
    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const nextPage = () => {
    const isValid = validateAll();
    if (!isValid) {
      return;
    }
    setIsEntered(true);
  };
  const nextPage2 = () => {
    if (cvMethod) {
      console.log("Chọn");
      setIsDisabled(false);
    } else {
      console.log("Không Chọn");
      setIsDisabled(true);
      return;
    }
    setIsShowNextPage2(false);
    setIsShowButtonGD1(false);
    setIsShowApply(false);
    setIsEntered(false);
  };

  const save = () => {
    const payload = {
      ungTuyenVien: uniqueId,
      tinTuyenDung: slug,
      guiEmail: isSendEmail,
      thongTinLienHe: {
        ten: name,
        sdt: phone,
        email: email,
        loiGioiThieu: introduce,
      },
      phuongThuc: cvMethod === "1" ? true : false,
      cv: file?.name || null,
    };
    console.log(
      "🚀 ~ file: ApplyJobModal.js ~ line 57 ~ save ~ payload",
      payload
    );

    onSubmitApplyJob(payload, file);
  };
  const onSubmitApplyJob = (payload, file) => {
    props.onSubmit(payload, file);
    onCloseModal();
  };
  const [user, setUser] = useState(props?.user);

  useEffect(() => {
    const getProfileDetail = async () => {
      try {
        const response = await profileApi.getUngTuyenVien(uniqueId);
        setUser(response?.data);
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
  }, []);

  const radioChangeHandler = (e) => {
    const value = e.target.value;
    setCvMethod(value);
  };
  const [isShowFileName, setIsShowFileName] = useState(false);
  const [isHideButton, setIsHideButton] = useState(true);
  const handleChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);
      setIsShowFileName(true);
      setIsHideButton(false);
    } else {
      alert("Khong co file");
    }
  };
  return (
    <div>
      <Modal
        title="Liên hệ với tôi"
        centered
        visible={showModal}
        onCancel={() => {
          onCloseModal(false);
        }}
        className="mt-78"
        // width={800}
        footer={[
          <Button
            key="back"
            onClick={() => {
              console.log("Cancel");
              // setIsShowButtonGD1(false)
              if (isShowButtonGD1) {
                setIsShowApply(true);
                setIsShowButtonGD1(false);
                onCloseModal(false);
                setIsEntered(false);
              } else if (isEntered) {
                setIsShowApply(false);
                setIsEntered(false);
                setIsShowButtonGD1(false);
              } else if (!isEntered) {
                setIsShowApply(true);
                setIsEntered(false);
                setIsShowButtonGD1(true);
                setIsShowNextPage2(true);
              } else {
                // setIsEntered(false)
              }
            }}
          >
            {isShowButtonGD1 && <span>Quay lại tìm việc</span>}
            {!isShowButtonGD1 &&
              (isEntered ? <span>Quay lại</span> : <span>Quay lại</span>)}
          </Button>,
          <Button
            disabled={isHideButton}
            key="submit"
            type="primary"
            onClick={() => {
              if (isShowNextPage2) {
                nextPage2();
              } else if (!isShowNextPage2 && isEntered) {
                save();
              } else if (!isShowNextPage2 && !isEntered) {
                nextPage();
              }
            }}
          >
            {isShowNextPage2 && <span>Tiếp tục</span>}
            {!isShowNextPage2 &&
              (isEntered ? (
                <span>Nộp hồ sơ xin việc</span>
              ) : (
                <span>Tiếp tục</span>
              ))}
          </Button>,
        ]}
      >
        {isShowApply ? (
          <Fragment>
            <div className="radio-btn-container" style={{ display: "flex" }}>
              <RadioButton
                changed={radioChangeHandler}
                id="1"
                isSelected={cvMethod === "1"}
                label="Tải từ máy tính của bạn"
                value="1"
              />

              <RadioButton
                changed={radioChangeHandler}
                id="2"
                isSelected={cvMethod === "0"}
                label="Hồ sơ online"
                value="0"
              />
            </div>
            {!cvMethod && (
              <span className="text-danger">Vui lòng chọn thông tin sau</span>
            )}
            {cvMethod === "1" && (
              <Fragment>
                <div className="container">
                  <div className="card border-0">
                    <div className="drop_box">
                      <header>
                        <h4>Chọn file tại đây</h4>
                      </header>
                      <p>Tệp được hỗ trợ: PDF</p>
                      <input
                        type="file"
                        hidden
                        accept=".pdf"
                        id="fileID"
                        style={{ display: "none" }}
                        onChange={handleChange}
                        ref={inputFile}
                      />
                      <button
                        label="fileID"
                        className="btn"
                        onClick={() => inputFile.current.click()}
                      >
                        Click để tải hồ sơ lên
                      </button>
                    </div>
                    <div>
                      {isShowFileName && (
                        <>
                          <div>
                            <strong>Tệp đã tải lên:</strong>{" "}
                          </div>
                          <Tag
                            style={{ width: "100%" }}
                            className="rounded d-block py-2 fs-16"
                            closable
                            onClose={() => {
                              console.log("Click delete api");
                              // setFile(file.filter((fil) => fil?.name !== x?.name));
                            }}
                          >
                            {file?.name}
                          </Tag>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Fragment>
            )}
            {/* <h2 style={{ marginTop: "25px" }}>Bạn chọn: {cvMethod}</h2> */}
          </Fragment>
        ) : !isEntered ? (
          <Fragment>
            {/* Hiển thị giao diện 2 */}
            <div className="pb-2">
              <p>
                <strong>
                  Thông tin giúp nhà tuyển dụng có thể kết nối tới bạn nhanh
                  nhất ngay sau khi ứng tuyển
                </strong>
              </p>
            </div>
            <div className="pb-2">
              <p>
                <strong>Họ tên</strong> <span className="text-danger">(*)</span>
              </p>
              <Input
                // showCount
                // maxLength={20}
                size="large"
                placeholder="Trung Vinh"
                value={name}
                // defaultValue={user?.ten}
                onChange={(e) => {
                  const value = e.target.value;
                  setName(value);
                }}
                defaultValue={name}
              />
              <p className="text-danger text-xs text-italic mt-1">
                {validationMsg.name}
              </p>
            </div>
            <div className="pb-2">
              <p>
                <strong>Số điện thoại</strong>{" "}
                <span className="text-danger">(*)</span>
              </p>
              <Input
                // showCount
                // maxLength={20}
                value={phone}
                onChange={(e) => {
                  const value = e.target.value;
                  setPhone(value);
                }}
                size="large"
                placeholder="0987079079"
                defaultValue={phone}
              />
              <p className="text-danger text-xs text-italic mt-1">
                {validationMsg.phone}
              </p>
            </div>
            <div className="pb-2">
              <p>
                <strong>Địa chỉ email</strong>{" "}
                <span className="text-danger">(*)</span>
              </p>
              <Input
                // showCount
                // maxLength={20}
                value={email}
                onChange={(e) => {
                  const value = e.target.value;
                  setEmail(value);
                }}
                size="large"
                placeholder="zunggzing@gmail.com"
                defaultValue={email}
              />
              <p className="text-danger text-xs text-italic mt-1">
                {validationMsg.email}
              </p>
            </div>
            <div className="pb-2">
              <p>
                <strong>Giới thiệu về bản thân</strong>{" "}
              </p>
              <TextArea
                showCount
                maxLength={500}
                style={{ height: 120 }}
                value={introduce}
                onChange={(e) => {
                  const value = e.target.value;
                  setIntroduce(value);
                }}
                defaultValue={introduce}
              />
            </div>
            <div className="pb-2">
              <p>
                <strong>
                  Gặp vấn đề với ứng tuyển này? Vui lòng cho chúng tôi biết thêm
                  0987099099
                </strong>{" "}
              </p>
            </div>{" "}
          </Fragment>
        ) : (
          <Fragment>
            {/* Hiển thị giao diện xem lại thông tin */}
            <div className="pb-1">
              <p>
                <strong>
                  Hãy xem lại hồ sơ xin việc của bạn để chắc chắc các thông tin
                  dưới là chính xác của bạn.
                </strong>
              </p>
            </div>
            <div className="pb-2">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <strong>Thông tin liên lạc</strong>
                </div>
                {isEntered && (
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setIsEntered(false);
                    }}
                  >
                    <span className="pointer">
                      <AiFillEdit /> Sửa
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="pb-2">
              <div className="row">
                <div className="col-12">
                  <ul className="list-group">
                    <li className="list-group-item">
                      <div>
                        <strong>Họ tên</strong>
                      </div>
                      <div>
                        <span>{name}</span>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div>
                        <strong>Địa chỉ email</strong>
                      </div>
                      <div>
                        <span>{email}</span>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div>
                        <strong>Số điện thoại</strong>
                      </div>
                      <div>
                        <span>{phone}</span>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div>
                        <strong>Giới thiệu về bản thân</strong>
                      </div>
                      <div>
                        <span>{introduce}</span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="col-12 mt-1">
                  <Checkbox
                    onChange={(e) => {
                      console.log(`checked = ${e.target.checked}`);
                      setIsSendEmail(e.target.checked);
                    }}
                  >
                    Thông báo cho tôi qua email khi có việc làm tương tự
                  </Checkbox>
                </div>
                <div className="col-12 mt-2">
                  <p>
                    Bằng cách nộp hồ sơ, bạn đồng ý với Điều khoản sử dụng và
                    Chính Sách Bảo Mật của 123job.vn cũng như đơn đăng ký của
                    bạn được gửi đến Nhà tuyển dụng và được xử lý theo chính
                    sách bảo mật của Nhà tuyển dụng.
                  </p>
                </div>
                <div className="col-12">
                  <p>
                    Gặp vấn đề với ứng tuyển này? Vui lòng cho chúng tôi biết
                    thêm 0987999000
                  </p>
                </div>
              </div>
            </div>
          </Fragment>
        )}
        {/* Modal 1 */}

        {/* {} */}
        {/* Modal 1 */}
      </Modal>
    </div>
  );
};

ApplyJobModal.propTypes = {};

export default ApplyJobModal;
