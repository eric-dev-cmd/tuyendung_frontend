import {
  Badge,
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
import { RiRefreshLine } from "react-icons/ri";
import { toast } from "react-toastify";
import PostFiltersForm from "../../components/Admin/PostFiltersForm";
import Pagination from "../../components/Pagination/Pagination";
import axiosClient from "../../services/axiosClient";
import RecruitmentApi from "../../services/recruitmentApi";
import TimeUtils from "../../utils/timeUtils";
import ModalProfileDetail from "./components/modals/ModalProfileDetail";
import NavbarAdmin from "./components/navbar/NavbarAdmin";

const { Option } = Select;

const { TabPane } = Tabs;
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const AllProfilePage = () => {
  const [isSubmit, setIsSubmit] = useState([]);
  const [collapsed, setCollapsed] = React.useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    trangThai: 6,
  });

  const [recruitments, setRecruitments] = useState([]);

  const [type, setType] = useState();
  const [value, setValue] = useState(0);
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

  const getDataListFilters = async () => {
    const paramsString = queryString.stringify(filters);
    const requestUrl = `https://web-tuyen-dung-be.herokuapp.com/donUngTuyens/donUngTuyenTiemNang?${paramsString}`;
    try {
      const response = await axiosClient.get(requestUrl);
      setRecruitments(response.data);
      setTotalCount(response.pagination.total);
      setPagination(response.pagination);
      setIsSubmit(false);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    let mounted = true;
    const paramsString = queryString.stringify(filters);

    if (mounted) {
      getDataListFilters();
    }
    return () => {
      mounted = false;
      setRecruitments([]);
    };
  }, [filters]);

  useEffect(() => {
    let mounted = true;
    const getDataListFilters = async () => {
      const paramsString = queryString.stringify(filters);
      try {
        const response = await RecruitmentApi.getListProfileTalent(
          paramsString
        );
        setRecruitments(response.data);
        setIsSubmit(false);
        // setTotalCount(response.pagination.total);
      } catch (error) {
        console.log(error.response);
      }
    };
    if (mounted) {
      getDataListFilters();
    }
    return () => {
      mounted = false;
      setRecruitments([]);
    };
  }, [filters]);

  const prevPage = async () => {
    const pg = page === 1 ? 1 : page - 1;
    // getListData(pg);
    setPage(pg);
  };
  const nextPage = async () => {
    const pg = page < Math.ceil(totalCount / pageSize) ? page + 1 : page;
    // getListData(pg);
    setPage(pg);
  };
  const handleFiltersStatusChange = (newFilters) => {
    setFilters({
      ...filters,
      page: 1,
      trangThai: newFilters,
    });
  };
  const handleFiltersChange = (newFilters) => {
    setFilters({
      ...filters,
      page: 1,
      tieuDe: newFilters.searchTerm,
    });
  };

  const [userProfile, setUserProfile] = useState();
  const [isShowModalProfile, setIsShowModalProfile] = useState(false);
  const handleAddButtonClickProfile = (item) => {
    // console.log("E", item);
    setUserProfile(item);
    // e.preventDefault();
    setIsShowModalProfile(true);
  };
  const handleSubmitModalProfile = () => {};
  const renderModalProfile = useMemo(() => {
    if (!isShowModalProfile) return null;

    return (
      <ModalProfileDetail
        showModal={isShowModalProfile}
        onCloseModal={() => {
          setIsShowModalProfile(false);
          // clearErrors();
        }}
        user={userProfile}
        onSubmit={handleSubmitModalProfile}
      />
    );
  }, [isShowModalProfile]);
  const [totalStatusApplication, setTotalStatusApplication] = useState();
  const [totalDangUT, setTotalDangUT] = useState();
  const [totalDaUT, setTotalDaUT] = useState();
  const [totalTuChoi, setTotalTuChoi] = useState();
  const [totalAll, setTotalAll] = useState();
  useEffect(() => {
    const getTotalApplication = async () => {
      const requestUrl = `https://web-tuyen-dung-be.herokuapp.com/donUngTuyens/demDonUngTuyenTiemNang`;
      try {
        const response = await axiosClient.get(requestUrl).then((res) => {
          let total = 0;
          res.data.map((item) => {
            if (item.trangThai == "Đang ứng tuyển") setTotalDangUT(item.tong);
            if (item.trangThai == "Đã ứng tuyển") setTotalDaUT(item.tong);
            if (item.trangThai == "Thất bại") setTotalTuChoi(item.tong);
            total = total + item.tong;
            setTotalAll(total);
            setIsSubmit(false);
          });
        });
      } catch (error) {
        console.log(error.response);
      }
    };
    getTotalApplication();
  }, []);

  // xóa đơn ứng tuyển
  // Modal confirm don ung tuyen
  const confirmDeleteProfile = (id) =>
    Modal.confirm({
      title: `Bạn chắc chắn muốn xóa đơn ứng tuyển này?`,
      // content: "first",
      onOk: async () => {
        try {
          const requestUrl = `https://web-tuyen-dung-be.herokuapp.com/donUngTuyens/${id}`;
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

  // ứng viêm tiềm năng
  const handleAddButtonClickTalent = async (id) => {
    try {
      const requestUrl = `https://web-tuyen-dung-be.herokuapp.com/donUngTuyens/themDonUngTuyenTiemNang/${id}`;
      await axios.patch(requestUrl).then((res) => {
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
      console.log(error.response);
    }
  };

  useEffect(() => {
    getDataListFilters();
  }, [isSubmit]);

  return (
    <Fragment>
      <Helmet>
        <title>[Employer] - Hồ sơ tiềm năng</title>
      </Helmet>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <NavbarAdmin />
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
              <Breadcrumb.Item>Hồ sơ ứng tuyển</Breadcrumb.Item>
              <Breadcrumb.Item>Hồ sơ tiềm năng</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background bg-white"
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              <strong>Hồ sơ tiềm năng</strong>
              <div className="row">
                <div className="col-12">
                  <Tabs
                    defaultActiveKey="6"
                    value={value}
                    onChange={(e) => {
                      setValue(e);
                      handleFiltersStatusChange(e);
                    }}
                  >
                    <TabPane
                      tab={`Tất cả (${totalAll ? totalAll : 0})`}
                      key="4"
                    >
                      <div className="row">
                        <div className="col-2">
                          <PostFiltersForm
                            onSubmit={handleFiltersChange}
                            title="Tên tin tuyển dụng"
                          />
                        </div>

                        <div className="col-1 ms-3">
                          <Button
                            className="d-flex align-items-center justify-content-center"
                            type="primary"
                            // icon={<GrFormRefresh />}
                            onClick={() => {
                              window.location.reload();
                            }}
                          >
                            <RiRefreshLine />
                            Làm mới
                          </Button>
                        </div>
                      </div>

                      <div className="row mt-3">
                        <div className="col-12">
                          <div className=" ">
                            <table className="table table-bordered table-hover align-items-center justify-content-center mb-0">
                              <thead className="bg-table">
                                <tr>
                                  <th className="text-secondary opacity-7 text-white py-3 text-center">
                                    <strong>STT</strong>
                                  </th>
                                  <th className="text-secondary opacity-7 ps-2 text-white py-3">
                                    <strong> Thông tin ứng viên</strong>
                                  </th>
                                  <th className="text-secondary opacity-7 ps-2 text-white py-3">
                                    <strong>Tin tuyển dụng</strong>
                                  </th>
                                  <th className="text-secondary text-center opacity-7 ps-2 text-center text-white py-3">
                                    <strong> Trạng thái</strong>
                                  </th>
                                  <th className="text-secondary opacity-7 ps-2 text-center text-white py-3">
                                    <strong>Thao tác</strong>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {recruitments.map((item, index) => {
                                  const {
                                    ungTuyenVien,
                                    tinTuyenDung,
                                    trangThai,
                                    tiemNang,
                                  } = item?.donTuyenDung;
                                  return (
                                    <tr key={index}>
                                      <td className="align-middle">
                                        <p className="text-sm font-weight-bold mb-0 text-center">
                                          {index + 1}
                                        </p>
                                      </td>
                                      <td>
                                        <span>
                                          {" "}
                                          {tiemNang && (
                                            <Badge.Ribbon
                                              text="Tiềm năng"
                                              color="red"
                                            ></Badge.Ribbon>
                                          )}{" "}
                                        </span>
                                        <p className="text-sm fw-bold mb-0">
                                          {ungTuyenVien?.ten}
                                        </p>
                                        <p className="text-sm mb-0">
                                          {ungTuyenVien?.sdt}
                                        </p>
                                        <p className="text-sm mb-0">
                                          {ungTuyenVien?.taiKhoan?.email}
                                        </p>
                                        <p className="address">
                                          <span className="created">
                                            Ngày nộp:{" "}
                                            {TimeUtils.formatDateTime(
                                              item?.ngayUngTuyen,
                                              "DD-MM-YYYY"
                                            )}
                                          </span>
                                        </p>
                                        <p>
                                          <span
                                            className="text-success pointer"
                                            onClick={() => {
                                              handleAddButtonClickProfile(item);
                                            }}
                                          >
                                            Xem thông tin ứng tuyến viên
                                          </span>
                                        </p>
                                      </td>
                                      <td className="">
                                        <p className="text-sm fw-bold mb-0">
                                          {tinTuyenDung?.tieuDe}
                                        </p>
                                        <p className="text-sm mb-0">
                                          Số lượng tuyển :{" "}
                                          {tinTuyenDung?.soLuongTuyen}
                                        </p>
                                        <p className="text-sm mb-0">
                                          Số lượng đã tuyển:{" "}
                                          {tinTuyenDung?.soLuongDaTuyen}
                                        </p>

                                        <p className="text-sm mb-0">
                                          Khu vực:{" "}
                                          {tinTuyenDung?.diaDiem?.tinhThanhPho +
                                            "-" +
                                            tinTuyenDung?.diaDiem?.quanHuyen}
                                        </p>
                                        <p className="text-sm mb-0">
                                          Ngày hết hạn:{" "}
                                          {TimeUtils.formatDateTime(
                                            tinTuyenDung?.ngayHetHan,
                                            "DD-MM-YYYY"
                                          )}{" "}
                                        </p>
                                      </td>
                                      <td className="text-center align-middle">
                                        {trangThai == "Thất bại" ? (
                                          <span>Từ chối</span>
                                        ) : (
                                          <span>{trangThai}</span>
                                        )}
                                      </td>
                                      <td
                                        className=" cursor-pointer pointer align-middle"
                                        // onClick={(e) => {
                                        //   console.log("e", e);
                                        // }}
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
                                                handleAddButtonClickProfile(
                                                  item
                                                );
                                              }}
                                            >
                                              <span class="dropdown-item">
                                                Xem
                                              </span>
                                            </li>
                                            <li
                                              onClick={() => {
                                                handleAddButtonClickTalent(
                                                  item?.donTuyenDung._id
                                                );
                                              }}
                                            >
                                              <>
                                                {trangThai ==
                                                "Thất bại" ? null : !tiemNang ? (
                                                  <span className="dropdown-item">
                                                    Ứng viên tiềm năng
                                                  </span>
                                                ) : (
                                                  <span className="dropdown-item">
                                                    Xóa ứng viên tiềm năng
                                                  </span>
                                                )}
                                              </>
                                            </li>
                                            <li
                                              onClick={() => {
                                                confirmDeleteProfile(
                                                  item?.donTuyenDung._id
                                                );
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
                        <div className="col-12">
                          {recruitments.length !== 0 && (
                            <Pagination
                              onPageChange={handlePageChange}
                              pagination={pagination}
                            />
                          )}
                        </div>
                      </div>
                    </TabPane>
                    <TabPane
                      tab={`Đang ứng tuyển (${totalDangUT ? totalDangUT : 0})`}
                      key="1"
                    >
                      <div className="row">
                        <div className="col-2">
                          <PostFiltersForm onSubmit={handleFiltersChange} />
                        </div>

                        <div className="col-1 ms-3">
                          <Button
                            className="d-flex align-items-center justify-content-center"
                            type="primary"
                            // icon={<GrFormRefresh />}
                            onClick={() => {
                              window.location.reload();
                            }}
                          >
                            <RiRefreshLine className="me-2" />
                            Làm mới
                          </Button>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-12">
                          <div className=" ">
                            <table className="table table-bordered table-hover align-items-center justify-content-center mb-0">
                              <thead className="bg-table">
                                <tr>
                                  <th className="text-secondary opacity-7 text-white py-3 text-center">
                                    <strong>STT</strong>
                                  </th>
                                  <th className="text-secondary opacity-7 ps-2 text-white py-3">
                                    <strong> Thông tin ứng viên</strong>
                                  </th>
                                  <th className="text-secondary opacity-7 ps-2 text-white py-3">
                                    <strong>Tin tuyển dụng</strong>
                                  </th>
                                  <th className="text-secondary text-center opacity-7 ps-2 text-center text-white py-3">
                                    <strong> Trạng thái</strong>
                                  </th>
                                  <th className="text-secondary opacity-7 ps-2 text-center text-white py-3">
                                    <strong>Thao tác</strong>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {recruitments.map((item, index) => {
                                  const {
                                    ungTuyenVien,
                                    tinTuyenDung,
                                    trangThai,
                                    tiemNang,
                                  } = item?.donTuyenDung;
                                  return (
                                    <tr key={index}>
                                      <td className="align-middle">
                                        <p className="text-sm font-weight-bold mb-0 text-center">
                                          {index + 1}
                                        </p>
                                      </td>
                                      <td>
                                        <span>
                                          {" "}
                                          {tiemNang && (
                                            <Badge.Ribbon
                                              text="Tiềm năng"
                                              color="red"
                                            ></Badge.Ribbon>
                                          )}{" "}
                                        </span>
                                        <p className="text-sm fw-bold mb-0">
                                          {ungTuyenVien?.ten}
                                        </p>
                                        <p className="text-sm mb-0">
                                          {ungTuyenVien?.sdt}
                                        </p>
                                        <p className="text-sm mb-0">
                                          {ungTuyenVien?.taiKhoan?.email}
                                        </p>
                                        <p className="address">
                                          <span className="created">
                                            Ngày nộp:{" "}
                                            {TimeUtils.formatDateTime(
                                              item?.ngayUngTuyen,
                                              "DD-MM-YYYY"
                                            )}
                                          </span>
                                        </p>
                                        <p>
                                          <span
                                            className="text-success pointer"
                                            onClick={() => {
                                              handleAddButtonClickProfile(item);
                                            }}
                                          >
                                            Xem thông tin ứng tuyến viên
                                          </span>
                                        </p>
                                      </td>
                                      <td className="">
                                        <p className="text-sm fw-bold mb-0">
                                          {tinTuyenDung?.tieuDe}
                                        </p>
                                        <p className="text-sm mb-0">
                                          Số lượng tuyển :{" "}
                                          {tinTuyenDung?.soLuongTuyen}
                                        </p>
                                        <p className="text-sm mb-0">
                                          Số lượng đã tuyển:{" "}
                                          {tinTuyenDung?.soLuongDaTuyen}
                                        </p>

                                        <p className="text-sm mb-0">
                                          Khu vực:{" "}
                                          {tinTuyenDung?.diaDiem?.tinhThanhPho +
                                            "-" +
                                            tinTuyenDung?.diaDiem?.quanHuyen}
                                        </p>
                                        <p className="text-sm mb-0">
                                          Ngày hết hạn:{" "}
                                          {TimeUtils.formatDateTime(
                                            tinTuyenDung?.ngayHetHan,
                                            "DD-MM-YYYY"
                                          )}{" "}
                                        </p>
                                      </td>
                                      <td className="text-center align-middle">
                                        <span>{trangThai}</span>
                                      </td>
                                      <td
                                        className=" cursor-pointer pointer align-middle"
                                        // onClick={(e) => {
                                        //   console.log("e", e);
                                        // }}
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
                                                handleAddButtonClickProfile(
                                                  item
                                                );
                                              }}
                                            >
                                              <span class="dropdown-item">
                                                Xem
                                              </span>
                                            </li>
                                            <li
                                              onClick={() => {
                                                handleAddButtonClickTalent(
                                                  item?.donTuyenDung._id
                                                );
                                              }}
                                            >
                                              <>
                                                {trangThai ==
                                                "Thất bại" ? null : !tiemNang ? (
                                                  <span className="dropdown-item">
                                                    Ứng viên tiềm năng
                                                  </span>
                                                ) : (
                                                  <span className="dropdown-item">
                                                    Xóa ứng viên tiềm năng
                                                  </span>
                                                )}
                                              </>
                                            </li>
                                            <li>
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
                        <div className="col-12">
                          {recruitments.length !== 0 && (
                            <Pagination
                              onPageChange={handlePageChange}
                              pagination={pagination}
                            />
                          )}
                        </div>
                      </div>
                    </TabPane>
                    <TabPane
                      tab={`Đã ứng tuyển (${totalDaUT ? totalDaUT : 0})`}
                      key="2"
                    >
                      <div className="row">
                        <div className="col-2">
                          <PostFiltersForm onSubmit={handleFiltersChange} />
                        </div>
                        <div className="col-1 ms-3">
                          <Button
                            className="d-flex align-items-center justify-content-center"
                            type="primary"
                            // icon={<GrFormRefresh />}
                            onClick={() => {
                              window.location.reload();
                            }}
                          >
                            <RiRefreshLine />
                            Làm mới
                          </Button>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-12">
                          <div className=" ">
                            <table className="table table-bordered table-hover align-items-center justify-content-center mb-0">
                              <thead className="bg-table">
                                <tr>
                                  <th className="text-secondary opacity-7 text-white py-3 text-center">
                                    <strong>STT</strong>
                                  </th>
                                  <th className="text-secondary opacity-7 ps-2 text-white py-3">
                                    <strong> Thông tin ứng viên</strong>
                                  </th>
                                  <th className="text-secondary opacity-7 ps-2 text-white py-3">
                                    <strong>Tin tuyển dụng</strong>
                                  </th>
                                  <th className="text-secondary text-center opacity-7 ps-2 text-center text-white py-3">
                                    <strong> Trạng thái</strong>
                                  </th>
                                  <th className="text-secondary opacity-7 ps-2 text-center text-white py-3">
                                    <strong>Thao tác</strong>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {recruitments.map((item, index) => {
                                  const {
                                    ungTuyenVien,
                                    tinTuyenDung,
                                    trangThai,
                                    tiemNang,
                                  } = item?.donTuyenDung;
                                  return (
                                    <tr key={index}>
                                      <td className="align-middle">
                                        <p className="text-sm font-weight-bold mb-0 text-center">
                                          {index + 1}
                                        </p>
                                      </td>
                                      <td>
                                        <span>
                                          {" "}
                                          {tiemNang && (
                                            <Badge.Ribbon
                                              text="Tiềm năng"
                                              color="red"
                                            ></Badge.Ribbon>
                                          )}{" "}
                                        </span>
                                        <p className="text-sm fw-bold mb-0">
                                          {ungTuyenVien?.ten}
                                        </p>
                                        <p className="text-sm mb-0">
                                          {ungTuyenVien?.sdt}
                                        </p>
                                        <p className="text-sm mb-0">
                                          {ungTuyenVien?.taiKhoan?.email}
                                        </p>
                                        <p className="address">
                                          <span className="created">
                                            Ngày nộp:{" "}
                                            {TimeUtils.formatDateTime(
                                              item?.ngayUngTuyen,
                                              "DD-MM-YYYY"
                                            )}
                                          </span>
                                        </p>
                                        <p>
                                          <span
                                            className="text-success pointer"
                                            onClick={() => {
                                              handleAddButtonClickProfile(item);
                                            }}
                                          >
                                            Xem thông tin ứng tuyến viên
                                          </span>
                                        </p>
                                      </td>
                                      <td className="">
                                        <p className="text-sm fw-bold mb-0">
                                          {tinTuyenDung?.tieuDe}
                                        </p>
                                        <p className="text-sm mb-0">
                                          Số lượng tuyển :{" "}
                                          {tinTuyenDung?.soLuongTuyen}
                                        </p>
                                        <p className="text-sm mb-0">
                                          Số lượng đã tuyển:{" "}
                                          {tinTuyenDung?.soLuongDaTuyen}
                                        </p>

                                        <p className="text-sm mb-0">
                                          Khu vực:{" "}
                                          {tinTuyenDung?.diaDiem?.tinhThanhPho +
                                            "-" +
                                            tinTuyenDung?.diaDiem?.quanHuyen}
                                        </p>
                                        <p className="text-sm mb-0">
                                          Ngày hết hạn:{" "}
                                          {TimeUtils.formatDateTime(
                                            tinTuyenDung?.ngayHetHan,
                                            "DD-MM-YYYY"
                                          )}{" "}
                                        </p>
                                      </td>
                                      <td className="text-center align-middle">
                                        <span>{trangThai}</span>
                                      </td>
                                      <td
                                        className=" cursor-pointer pointer align-middle"
                                        // onClick={(e) => {
                                        //   console.log("e", e);
                                        // }}
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
                                                handleAddButtonClickProfile(
                                                  item
                                                );
                                              }}
                                            >
                                              <span class="dropdown-item">
                                                Xem
                                              </span>
                                            </li>
                                            <li
                                              onClick={() => {
                                                handleAddButtonClickTalent(
                                                  item?.donTuyenDung._id
                                                );
                                              }}
                                            >
                                              <>
                                                {trangThai ==
                                                "Thất bại" ? null : !tiemNang ? (
                                                  <span className="dropdown-item">
                                                    Ứng viên tiềm năng
                                                  </span>
                                                ) : (
                                                  <span className="dropdown-item">
                                                    Xóa ứng viên tiềm năng
                                                  </span>
                                                )}
                                              </>
                                            </li>
                                            <li>
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
                        <div className="col-12">
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
            {renderModalProfile}
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
export default AllProfilePage;
