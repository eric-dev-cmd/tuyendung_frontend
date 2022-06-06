import { Avatar, Button, DatePicker, Input, Modal, Select } from "antd";
import React, { useRef, useState } from "react";
import { AiOutlineLink } from "react-icons/ai";
import { BsTelephoneOutbound } from "react-icons/bs";
import { FaRegAddressBook } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { toast } from "react-toastify";
import CareerApi from "../../../../services/careerApi";
import TimeUtils from "../../../../utils/timeUtils";

const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";

const ModalCreateCareer = ({
  showModal,
  onCloseModal,
  isEdit,
  user,
  ...props
}) => {
  console.log("props?.detail", props?.detail);
  const [file, setFile] = useState();
  const inputFile = useRef(null);
  const [name, setName] = useState();
  const handleSubmitCareer = async (e) => {
    e.preventDefault();
    const payload = {
      tenLinhVuc: name,
    };
    try {
      const response = await CareerApi.createCareerLV(payload);
      if (response.status === "success") {
        toast.success("Thêm lĩnh vực thành công", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        onCloseModal();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response);
      console.log(error.response);
    }
  };
  return (
    <div>
      <Modal
        centered
        visible={showModal}
        // visible={true}
        // onOk={() => {
        //   console.log("Submit ok");
        // }}
        onCancel={() => {
          onCloseModal(false);
        }}
        width={1000}
        footer={
          [
            // <Button
            //   key="back"
            //   onClick={() => {
            //     console.log("Cancel");
            //     onCloseModal(false);
            //   }}
            // >
            //   Hủy bỏ
            // </Button>,
            // <Button
            //   key="submit"
            //   type="primary"
            //   onClick={() => {
            //     save();
            //   }}
            // >
            //   Lưu
            // </Button>,
          ]
        }
      >
        <div className="row mt-4">
          <div className="col-12 my-1 text-center">
            <span className="fw-bold fs-19 text-uppercase">
              <span class="badge bg-primary py-3 px-4">Thêm lĩnh vực</span>
            </span>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12">
            <div className="bg-card border rounded px-2 py-4">
              <div className="row">
                <div className="col-2">
                  {" "}
                  <div className="border rounded text-center">
                    <Avatar
                      shape="square"
                      size={100}
                      src={
                        props?.detail?.avatar
                          ? `https://webtuyendung.s3.ap-southeast-1.amazonaws.com/${props?.detail?.avatar}`
                          : `https://webtuyendung.s3.ap-southeast-1.amazonaws.com/utv-avatar-default.png`
                      }
                    />
                  </div>
                  <input
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    name="file"
                    hidden
                    ref={inputFile}
                    onChange={(event) => {
                      let formData = new FormData();
                      formData.append("file", event.target.files[0]);
                      // const requestUrl = `http://localhost:4000/ungtuyenviens/capNhatAvatar`;
                      // axios({
                      //   method: "patch",
                      //   url: requestUrl,
                      //   data: formData,
                      //   headers: {
                      //     Authorization: `Bearer ${user.token}`,
                      //   },
                      // });
                      // setSelectedImage(event.target.files[0]);
                    }}
                    // hidden
                  />
                  <div className="mt-3 text-center">
                    <button
                      className="btn btn-primary btn-sm"
                      type="button"
                      label="icon-button-file"
                      htmlFor="icon-button-file"
                      onClick={() => inputFile.current.click()}
                    >
                      Chọn ảnh
                    </button>
                  </div>
                </div>{" "}
                <div className="col-10 ">
                  <Input
                    placeholder="Nhập tên lĩnh vực"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <div className="row mt-4">
                    <div className="col-4"></div>
                    <div className="col-4">
                      <Button
                        style={{ width: "100%" }}
                        type="primary"
                        onClick={handleSubmitCareer}
                      >
                        Lưu
                      </Button>
                    </div>
                    <div className="col-4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

ModalCreateCareer.propTypes = {};

export default ModalCreateCareer;
