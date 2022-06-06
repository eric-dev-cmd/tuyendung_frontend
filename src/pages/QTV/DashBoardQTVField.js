import {
  Avatar,
  Breadcrumb,
  Button,
  Layout,
  Menu,
  Modal,
  Select,
  Tabs,
} from "antd";
import axios from "axios";
import queryString from "query-string";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RiRefreshLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import PostFiltersForm from "../../components/Admin/PostFiltersForm";
import Pagination from "../../components/Pagination/Pagination";
import TimeUtils from "../../utils/timeUtils";
import ModalCreateCareer from "./components/modal/ModalCreateCareer";
import ModalNewDetailEmployer from "./components/modal/ModalNewDetailEmployer";
import NavbarQTV from "./components/navbar/NavbarQTV";

const { Option } = Select;

const { TabPane } = Tabs;
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const DashBoardQTVField = () => {
  const [isSubmit, setIsSubmit] = useState([]);
  const [collapsed, setCollapsed] = React.useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 5,
  });

  const [recruitments, setRecruitments] = useState([]);
  const paramsString = queryString.stringify(filters);
  console.log("paramsString", paramsString);
  const [type, setType] = useState();
  const [pagination, setPagination] = useState({
    page: 1,
    totalProducts: 1,
  });
  //HANDLE PAGINATION
  const handlePageChange = (newPage) => {
    setFilters({
      ...filters,
      page: newPage.selected + 1,
    });
  };
  const [value, setValue] = useState(0);

  const getDataListFilters = async () => {
    const requestUrl = `http://localhost:4000/linhVucs`;
    try {
      const response = await axios.get(requestUrl);
      setRecruitments(response.data.data);
      setIsSubmit(false);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getDataListFilters();
    }
    return () => {
      mounted = false;
      setRecruitments([]);
    };
  }, []);

  const handleFiltersStatusChange = (newFilters) => {
    console.log("New filters: ", newFilters);
    console.log("+VINH+;", {
      ...filters,
      page: 1,
      trangThai: newFilters,
    });
    setFilters({
      ...filters,
      page: 1,
      trangThai: newFilters,
    });
  };
  const handleFiltersChange = (newFilters) => {
    console.log("New filters: ", newFilters);
    setFilters({
      ...filters,
      page: 1,
      // tieuDe: newFilters.searchTerm,
    });
  };
  const [totalStatus, setTotalStatus] = useState();
  const [totalDungTuyen, setTotalDungTuyen] = useState();
  const [totalChoDuyet, setTotalChoDuyet] = useState();
  const [totalKhoa, setTotalKhoa] = useState();
  const [totalDaDuyet, setTotalDaDuyet] = useState();
  const [totalTuChoi, setTotalTuChoi] = useState();
  const [totalAll, setTotalAll] = useState();

  useEffect(() => {
    const getTotalStatus = async () => {
      const requestUrl = `http://localhost:4000/tinTuyenDungs/tongSoTinTheoTrangThai`;
      try {
        const response = await axios.get(requestUrl).then((res) => {
          res.data.data.map((item) => {
            if (item.trangThai == "Dừng tuyển") setTotalDungTuyen(item.tong);
            if (item.trangThai == "Chờ duyệt") setTotalChoDuyet(item.tong);
            if (item.trangThai == "Khóa") setTotalKhoa(item.tong);
            if (item.trangThai == "Đã duyệt") setTotalDaDuyet(item.tong);
            if (item.trangThai == "Từ chối") setTotalTuChoi(item.tong);
          });
        });

        setTotalStatus(response.data.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    getTotalStatus();
  }, []);
  const [isGetRecruitmentReviewLeast, setIsGetRecruitmentReviewLeast] =
    useState(false);
  const [recruitmentReviewLeast, setRecruitmentReviewLeast] = useState([]);
  useEffect(() => {
    const getRecruitmentReviewLeast = async () => {
      const requestUrl = `http://localhost:4000/tinTuyenDungs/tinTuyenDungCoNguyCoKhoa`;
      try {
        const response = await axios.get(requestUrl);
        setRecruitmentReviewLeast(response?.data?.data);
        console.log("response getRecruitmentReviewLeast", response);
      } catch (error) {
        console.log(error.response);
      }
    };
    getRecruitmentReviewLeast();
  }, [isGetRecruitmentReviewLeast]);

  useEffect(() => {
    getDataListFilters();
  }, [isSubmit]);

  const [isShowModalDetail, setIsShowModalDetail] = useState(false);
  const [detail, setDetail] = useState(false);
  const handleAddButtonClickDetail = (item) => {
    // setUserProfile(item);
    // e.preventDefault();
    console.log("item employer", item);
    setIsShowModalDetail(true);
  };
  const renderModalCreateCareer = useMemo(() => {
    if (!isShowModalDetail) return null;

    return (
      <ModalCreateCareer
        showModal={isShowModalDetail}
        // showModal={true}
        onCloseModal={() => {
          setIsShowModalDetail(false);
          // clearErrors();
        }}
        // onSubmit={handleSubmitModalProfile}
      />
    );
  }, [isShowModalDetail]);

  const confirmDeleteDrop = (id) =>
    Modal.confirm({
      title: "Bạn chắc chắn muốn xóa lĩnh vực này?",
      // content: "first",
      onOk: async () => {
        try {
          const requestUrl = `http://localhost:4000/linhVucs/${id}`;
          await axios.delete(requestUrl).then((res) => {
            if (res?.data?.status == "success") {
              setIsSubmit(true);
              toast.success("Cập nhật thành công", {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
          });
        } catch (error) {
          Modal.error({
            title: "error",
            content: error.message,
          });
        }
      },
    });

  return (
    <Fragment>
      <Helmet>
        <title>[Admin] - Trang chủ quản trị viên</title>
      </Helmet>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <NavbarQTV />
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
            }}
          />
          <Content
            style={{
              margin: "0 16px",
            }}
          >
            <Breadcrumb
              style={{
                margin: "16px 0",
              }}
            >
              <Breadcrumb.Item>Tổng quan</Breadcrumb.Item>
              <Breadcrumb.Item>Quản lý ngành nghề</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background bg-white"
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              <strong>Tất cả ngành nghề</strong>
              <div className="row">
                <div className="col-12">
                  <Tabs
                    defaultActiveKey="6"
                    value={value}
                    onChange={(e) => {
                      setValue(e);
                      handleFiltersStatusChange(e);
                      console.log("key ABC", e);
                      setIsGetRecruitmentReviewLeast(false);

                      if (e == 9) {
                        setIsGetRecruitmentReviewLeast(true);
                      }
                    }}
                  >
                    <TabPane
                      tab={`Tất cả (${totalCount ? totalCount : 0})`}
                      key="6"
                    >
                      <div className="row">
                        <div className="col-2">
                          <PostFiltersForm onSubmit={handleFiltersChange} />
                        </div>
                        <div className="col-2">
                          <Button
                            style={{ width: "100%" }}
                            className="d-flex align-items-center justify-content-center"
                            type="primary"
                            // icon={<GrFormRefresh />}
                            onClick={() => {
                              window.location.reload();
                            }}
                          >
                            <RiRefreshLine className="me-2" /> Làm mới
                          </Button>
                        </div>
                        <div className="col-2 ms-3">
                          <Button
                            style={{ width: "100%" }}
                            className="d-flex align-items-center justify-content-center"
                            type="danger"
                            onClick={() => {
                              handleAddButtonClickDetail();
                            }}
                          >
                            <AiOutlinePlusCircle className="me-2" /> Thêm lĩnh
                            vực
                          </Button>
                        </div>
                      </div>

                      <div className="row mt-3">
                        <div className="col-12">
                          <div className="table-responsive">
                            <table className="table table-bordered table-hover align-items-center justify-content-center mb-0">
                              <thead className="bg-table">
                                <tr>
                                  <th className="text-secondary opacity-7 text-white py-3 text-center">
                                    <strong>STT</strong>
                                  </th>
                                  <th className="text-secondary opacity-7 ps-2 text-white py-3 text-center">
                                    <strong> Tên lĩnh vực</strong>
                                  </th>
                                  <th className="text-secondary opacity-7 ps-2 text-white py-3 text-center  ">
                                    <strong>Hình ảnh</strong>
                                  </th>
                                  <th className="text-secondary opacity-7 ps-2 text-center text-white py-3">
                                    <strong>Thao tác</strong>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {recruitments.map((item, index) => {
                                  return (
                                    <tr key={index}>
                                      <td className="align-middle">
                                        <p className="text-sm font-weight-bold mb-0 text-center">
                                          {index + 1}
                                        </p>
                                      </td>
                                      <td className="align-middle">
                                        <p className="text-sm fw-bold mb-0 text-center">
                                          {item?.tenLinhVuc}
                                        </p>
                                      </td>
                                      <td className="align-middle text-center d-flex justify-content-around">
                                        <span className="text-xs font-weight-bold d-flex align-items-center  text-center">
                                          <div className=" rounded">
                                            <Avatar
                                              shape="square"
                                              size={120}
                                              src={
                                                item?.hinhAnh
                                                  ? `https://webtuyendung.s3.ap-southeast-1.amazonaws.com/${item?.hinhAnh}`
                                                  : `https://webtuyendung.s3.ap-southeast-1.amazonaws.com/utv-avatar-default.png`
                                              }
                                            />
                                          </div>
                                        </span>
                                      </td>

                                      <td
                                        className="text-center cursor-pointer align-middle pointer"
                                        onClick={(e) => {
                                          console.log("e", e);
                                        }}
                                      >
                                        {/* <span className="text-xs font-weight-bold pointer">
                                              <FaEllipsisV />
                                            </span> */}
                                        <div class="dropdown">
                                          <button
                                            class="btn btn-secondary dropdown-toggle"
                                            type="button"
                                            id="dropdownMenuButton1"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                          >
                                            Chi tiết
                                          </button>
                                          <ul
                                            class="dropdown-menu"
                                            aria-labelledby="dropdownMenuButton1"
                                          >
                                            <li
                                              onClick={() => {
                                                // confirmLock(item?._id);
                                              }}
                                            >
                                              <span class="dropdown-item">
                                                Sửa
                                              </span>
                                            </li>
                                            <li
                                              onClick={() => {
                                                confirmDeleteDrop(item?._id);
                                              }}
                                            >
                                              <span class="dropdown-item">
                                                Xóa
                                              </span>
                                            </li>
                                          </ul>
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        {recruitments.length < 1 && (
                          <div className="col-12">
                            <div
                              className="alert alert-warning text-center"
                              role="alert"
                            >
                              Không có dữ liệu
                            </div>
                          </div>
                        )}

                        <div className="col-12 mt-4">
                          {recruitments.length !== 0 && (
                            <Pagination
                              onPageChange={handlePageChange}
                              pagination={pagination}
                            />
                          )}
                        </div>
                      </div>
                    </TabPane>
                  </Tabs>
                </div>
              </div>
            </div>
            <div></div>
            {renderModalCreateCareer}
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            Ant Design ©2018 Created by Trung Vinh
          </Footer>
        </Layout>
      </Layout>
    </Fragment>
  );
};
export default DashBoardQTVField;
