import { ClockCircleOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BiPaperPlane } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import JobList from "../../../../components/FieldJobs/components/JobList";
import profileApi from "../../../../services/profileApi";
import RecruitmentApi from "../../../../services/recruitmentApi";
import { getUserProfile } from "../../../../utils/localStorage";
import TimeUtils from "../../../../utils/timeUtils";
import "./ProductHeader.css";

const ProductHeader = ({ field }, props) => {
  const { isAuthenticated } = useSelector((state) => state?.userLogin);
  const users = useSelector((state) => state?.userLogin);
  const userU = getUserProfile();

  const userId = users?.user?.taiKhoan._id;
  const history = useHistory();
  const { t } = useTranslation();
  console.log("fieldfield", field);
  const [user, setUser] = useState();
  const [fields, setFields] = useState(() => {
    return field?.tenLinhVuc;
  });
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
  const [recruitmentsLinhVuc, setRecruitmentsLinhVuc] = useState([]);
  // console.log("field", field)
  const [filterLinhVucs, setFilterLinhVucs] = useState({
    limit: 20,
    page: 1,
    trangThai: 2,
    linhVuc: fields,
  });
  useEffect(() => {
    console.log("field?.tenLinhVuc", field?.tenLinhVuc);
  }, [field?.tenLinhVuc]);
  const LINH_VUC_NOI_BAT = {
    linhVuc: field?.tenLinhVuc,
    page: 1,
    limit: 15,
    trangThai: 2,
  };
  // Việc làm liên quan
  const getListNganhNghe = async () => {
    try {
      const response = await RecruitmentApi.getListRecruitmentFilterParams(
        LINH_VUC_NOI_BAT
      );
      console.log("filterLinhVucs", filterLinhVucs);
      setRecruitmentsLinhVuc(response?.data);
      console.log("response?.data linh vuc", response?.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getListNganhNghe();
  }, [field?.tenLinhVuc]);
  console.log("VINH", field?.tenLinhVuc);
  return (
    <>
      <div className="row">
        <div className="col-12 pt-1 border-bottom">
          {recruitmentsLinhVuc?.length >= 1 ? (
            <p>
              Tìm thấy <strong>{recruitmentsLinhVuc?.length}</strong> việc làm
              phù hợp với lĩnh vực <strong>{field?.tenLinhVuc}</strong>
            </p>
          ) : (
            <p>Không tìm thấy dữ liệu</p>
          )}
          {/* <p>
                  Tìm việc làm Ngành <strong>1</strong>
                </p> */}
        </div>
      </div>
      <div className="row mt-3">
        <JobList recruitments={recruitmentsLinhVuc} />
      </div>
      <div className="my-3"></div>
    </>
  );
};

ProductHeader.propTypes = {};

export default ProductHeader;
