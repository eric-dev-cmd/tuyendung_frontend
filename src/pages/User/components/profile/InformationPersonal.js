import { AntDesignOutlined } from "@ant-design/icons";
import { Avatar, Button, DatePicker, Input, Modal, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import profileApi from "../../../../services/profileApi";
import { getUserProfile } from "../../../../utils/localStorage";
import TimeUtils from "../../../../utils/timeUtils";

const { Option } = Select;
const InformationPersonal = ({ showModal, onCloseModal, ...props }) => {
  const user = getUserProfile();
  console.log("user, ", user);
  const [name, setName] = useState(props?.user?.ten);
  const [birthDate, setBirthDate] = useState(props?.user?.ngaySinh);
  const [numbers, setNumbers] = useState(props?.user?.sdt);
  const [email, setEmail] = useState(props?.user?.taiKhoan?.email);
  const [address, setAddress] = useState(props?.user?.diaChi);
  const [gender, setGender] = useState(props?.user?.gioiTinh);
  const [selectedImage, setSelectedImage] = useState(null);
  const dateFormat = "YYYY-MM-DD";
  const userId = getUserProfile();
  const resetValue = () => {
    console.log("3. Reset value");
    // setValue(`${prefixName}.name`, null);
    // setValue(`${prefixName}.note`, null);
    // setValue(`${prefixName}.attachments`, null);
  };
  console.log("userId", userId?.taiKhoan._id);
  console.log("props info detail", props);
  const save = () => {
    const payload = {
      ten: name,
      sdt: numbers,
      gioiTinh: gender,
      diaChi: address,
      // soNamKinhNghiem: "Chưa có kinh nghiệm",
      ngaySinh: birthDate,
      taiKhoan: userId?.taiKhoan._id,
    };
    onSubmitCreate(payload);
  };
  const onSubmitCreate = (payload) => {
    props.onSubmit(payload);
    resetValue();
    onCloseModal();
  };
  const accountUser = getUserProfile();
  const uniqueId = accountUser.taiKhoan._id;
  console.log("accountUser", accountUser);
  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    const getProfileDetail = async () => {
      try {
        console.log("userIduserId", uniqueId);
        const response = await profileApi.getUngTuyenVien(uniqueId);
        console.log("get default", response?.data);
        setUserInfo(response?.data);
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

  return (
    <div>
      <Modal
        className="mt-78"
        title="Cập nhật thông tin liên hệ"
        centered
        visible={showModal}
        // onOk={() => {
        //   console.log("Submit ok");
        // }}
        onCancel={() => {
          onCloseModal(false);
        }}
        width={500}
        footer={[
          <Button
            key="back"
            onClick={() => {
              console.log("Cancel");
              onCloseModal(false);
            }}
          >
            Hủy bỏ
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              save();
            }}
            className="mt-78"
          >
            Lưu
          </Button>,
        ]}
      >
        <div className="pb-3 d-flex align-items-center justify-content-center">
          {selectedImage && (
            <Avatar
              size={{
                xs: 24,
                sm: 32,
                md: 40,
                lg: 64,
                xl: 80,
                xxl: 100,
              }}
              src={URL.createObjectURL(selectedImage)}
              icon={<AntDesignOutlined />}
            />
          )}
        </div>
        <div className="pb-3">
          <input
            accept="image/*"
            id="icon-button-file"
            type="file"
            name="file"
            onChange={(event) => {
              let formData = new FormData();
              formData.append("file", event.target.files[0]);
              const requestUrl = `https://web-tuyen-dung-be.herokuapp.com/ungtuyenviens/capNhatAvatar`;
              axios({
                method: "patch",
                url: requestUrl,
                data: formData,
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              });
              setSelectedImage(event.target.files[0]);
            }}
            // hidden
          />
        </div>
        <div className="pb-3">
          <p>
            <strong>Họ tên</strong> <span className="text-danger">(*)</span>
          </p>
          <Input
            // showCount
            // maxLength={20}
            onChange={(e) => {
              console.log("value", e.target.value);
              setName(e.target.value);
            }}
            value={name}
            defaultValue={name}
            size="default"
            placeholder="Ví dụ: Trung Vinh"
          />
        </div>
        <div className="pb-3">
          <p>
            <strong>Ngày sinh</strong> <span className="text-danger">(*)</span>
          </p>
          <span className="pe-2">
            <DatePicker
              className="form-control"
              format={dateFormat}
              name={birthDate}
              // defaultValue={birthDate}
              onChange={(date, dateString) => {
                console.log(date);
                console.log(dateString);
                setBirthDate(dateString);
              }}
            />
          </span>
        </div>
        <div className="pb-3">
          <p>
            <strong>Số điện thoại</strong>{" "}
            <span className="text-danger">(*)</span>
          </p>
          <Input
            // showCount
            // maxLength={20}
            onChange={(e) => {
              console.log("value", e.target.value);
              setNumbers(e.target.value);
            }}
            value={numbers}
            defaultValue={numbers}
            size="default"
            placeholder="Ví dụ: 0987059059"
          />
        </div>
        {/* <div className="pb-3">
          <p>
            <strong>Email liên hệ</strong>{" "}
            <span className="text-danger">(*)</span>
          </p>
          <Input
            // showCount
            // maxLength={20}
            onChange={(e) => {
              console.log("value", e.target.value);
              setEmail(e.target.value);
            }}
            value={email}
            size="default"
            placeholder="Ví dụ: hello.trungvinh@gmail.com"
          />
        </div> */}
        <div className="pb-3">
          <p>
            <strong>Địa chỉ hiện tại</strong>{" "}
            <span className="text-danger">(*)</span>
          </p>
          <Input
            // showCount
            // maxLength={20}
            onChange={(e) => {
              console.log("value", e.target.value);
              setAddress(e.target.value);
            }}
            value={address}
            defaultValue={address}
            size="default"
            placeholder="Ví dụ: 185 Điện Biên Phủ, Quận 1, Hồ Chí Minh"
          />
          <div className="pb-3">
            <p>
              <strong>Giới tính</strong>{" "}
              <span className="text-danger">(*)</span>
            </p>
            <Select
              defaultValue={gender ? gender : "Chọn giới tính"}
              style={{ width: "100%" }}
              onChange={(value) => {
                setGender(value);
              }}
              size="default"
            >
              <Option value="Nam">Nam</Option>
              <Option value="Nữ">Nữ</Option>
            </Select>
          </div>
        </div>
      </Modal>
    </div>
  );
};

InformationPersonal.propTypes = {};

export default InformationPersonal;
