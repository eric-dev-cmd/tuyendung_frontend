import { Breadcrumb, Button, Layout, Menu, Modal, Select, Tabs } from "antd";
import axios from "axios";
import queryString from "query-string";
import React, { Fragment, useEffect, useState, useRef, useMemo } from "react";
import { Helmet } from "react-helmet";
import { FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import PostFiltersForm from "../../components/Admin/PostFiltersForm";
import axiosClient from "../../services/axiosClient";
import RecruitmentApi from "../../services/recruitmentApi";
import TimeUtils from "../../utils/timeUtils";
import NavbarAdmin from "./components/navbar/NavbarAdmin";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import Pagination from "../../components/Pagination/Pagination";
import { RiRefreshLine } from "react-icons/ri";
import io from "socket.io-client";
import { AiFillEye } from "react-icons/ai";
import ModalNewDetail from "./components/modals/ModalNewDetail";

const { Option } = Select;

const { TabPane } = Tabs;
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const MainNavigationAdmin = () => {
  const [socket, setSocket] = useState(null);
  useEffect(async () => {
    if (!socket) {
      const st = io.connect("https://web-tuyen-dung-be.herokuapp.com");
      setSocket(st);
    }
  }, [socket]);

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
  const onHandleChangeType = (value) => {
    setType(value);
  };
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

  const getListData = async (pg = page, pgSize = pageSize) => {
    try {
      const params = {
        page: pg,
        limit: 15,
        // tieuDe: "",
        // trangThai: "",
      };

      const response =
        await RecruitmentApi.getListRecruitmentByEmployerFilterParams(params);
      console.log("response:::", response);
      setRecruitments(response.data);
      setIsSubmit(false);
      setTotalCount(response.pagination.total);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getDataListFilters = async () => {
    const requestUrl = `https://web-tuyen-dung-be.herokuapp.com/tinTuyenDungs/timKiemTheoNhaTuyenDung?${paramsString}`;
    try {
      const response = await axiosClient.get(requestUrl);
      console.log("responseresponse", response.data);
      setRecruitments(response.data);
      setTotalCount(response.pagination.total);
      setPagination(response.pagination);
      setIsSubmit(false);
      socket.on("res-duyet-tin-tuyen-dung", (data) => {
        getDataListFilters();
      });
      console.log("socket", socket);
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
  }, [filters]);

  // useEffect(() => {
  //   getListData();
  // }, [page]);

  const handleFiltersStatusChange = (newFilters) => {
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
      tieuDe: newFilters.searchTerm,
    });
  };
  // Modal confirm delete
  const confirmDeleteStop = (id) =>
    Modal.confirm({
      title: "Bạn chắc chắn muốn dừng tin tuyển dụng này?",
      // content: "first",
      onOk: async () => {
        try {
          console.log("item id", id);
          console.log("Clicked confirm");
          const requestUrl = `https://web-tuyen-dung-be.herokuapp.com/tinTuyenDungs/dungTuyen/${id}`;
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
          Modal.error({
            title: "error",
            content: error.message,
          });
        }
      },
    });
  const confirmDeleteDrop = (id) =>
    Modal.confirm({
      title: "Bạn chắc chắn muốn xóa tin tuyển dụng này?",
      // content: "first",
      onOk: async () => {
        try {
          const requestUrl = `https://web-tuyen-dung-be.herokuapp.com/tinTuyenDungs/${id}`;
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
  const [totalStatus, setTotalStatus] = useState();
  const [totalDungTuyen, setTotalDungTuyen] = useState();
  const [totalChoDuyet, setTotalChoDuyet] = useState();
  const [totalKhoa, setTotalKhoa] = useState();
  const [totalDaDuyet, setTotalDaDuyet] = useState();
  const [totalTuChoi, setTotalTuChoi] = useState();
  const [totalAll, setTotalAll] = useState();

  const getTotalStatus = async () => {
    const requestUrl = `https://web-tuyen-dung-be.herokuapp.com/tinTuyenDungs/tongSoTinTheoTrangThaiNhaTuyenDung`;
    try {
      const response = await axiosClient.get(requestUrl).then((res) => {
        let total = 0;
        res.data.map((item) => {
          if (item.trangThai == "Dừng tuyển") setTotalDungTuyen(item.tong);
          if (item.trangThai == "Chờ duyệt") setTotalChoDuyet(item.tong);
          if (item.trangThai == "Khóa") setTotalKhoa(item.tong);
          if (item.trangThai == "Đã duyệt") setTotalDaDuyet(item.tong);
          if (item.trangThai == "Từ chối") setTotalTuChoi(item.tong);
          total = total + item.tong;
          setTotalAll(total);
          setIsSubmit(false);
        });
      });
      socket.on("res-duyet-tin-tuyen-dung", (data) => {
        getTotalStatus();
        console.log("sau sokcet", totalChoDuyet);
      });
      setTotalStatus(response.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getTotalStatus();
  }, []);

  useEffect(() => {
    // getListData();
    getTotalStatus();
    getDataListFilters();
  }, [isSubmit]);
  const [isShowModalDetail, setIsShowModalDetail] = useState(false);
  const [detail, setDetail] = useState(false);
  const handleAddButtonClickDetail = (item) => {
    // setUserProfile(item);
    // e.preventDefault();
    console.log("item", item);
    setDetail(item);
    setIsShowModalDetail(true);
  };
  const renderModalDetail = useMemo(() => {
    if (!isShowModalDetail) return null;

    return (
      <ModalNewDetail
        showModal={isShowModalDetail}
        // showModal={true}
        onCloseModal={() => {
          setIsShowModalDetail(false);
          // clearErrors();
        }}
        detail={detail}
        // onSubmit={handleSubmitModalProfile}
      />
    );
  }, [isShowModalDetail]);

  return (
    <Fragment>
      <Helmet>
        <title>[Employer] - Trang chủ nhà tuyển dụng</title>
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
              <Breadcrumb.Item>Quản lý tin đăng</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background bg-white"
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              <strong>Tất cả tin tuyển dụng</strong>
              <div className="row">
                <div className="col-12">
                  <Tabs
                    defaultActiveKey="6"
                    value={value}
                    onChange={(e) => {
                      setValue(e);
                      handleFiltersStatusChange(e);
                      console.log("key ABC", e);
                    }}
                  >
                    <TabPane
                      tab={`Tất cả (${totalAll ? totalAll : 0})`}
                      key="6"
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
                            <RiRefreshLine className="me-2" /> Làm mới
                          </Button>
                        </div>
                      </div>

                      <div className="row mt-3">
                        <div className="col-12">
                          <div className="">
                            <table className="table table-bordered table-hover align-items-center justify-content-center mb-0">
                              <thead className="bg-table">
                                <tr>
                                  <th className="text-secondary opacity-7 text-white py-3 text-center">
                                    <strong>STT</strong>
                                  </th>
                                  <th className="text-secondary opacity-7 ps-2 text-white py-3">
                                    <strong> Tin tuyển dụng</strong>
                                  </th>
                                  <th className="text-secondary opacity-7 ps-2 text-white py-3 text-center">
                                    <strong>Hồ sơ</strong>
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
                                  return (
                                    <tr key={index + 1}>
                                      <td className="align-middle">
                                        <p className="text-sm font-weight-bold mb-0 text-center">
                                          {index + 1}
                                        </p>
                                      </td>
                                      <td>
                                        <p className="text-sm fw-bold mb-0">
                                          {item?.tieuDe}
                                        </p>
                                        <p className="text-sm mb-0">
                                          {item?.diaDiem?.tinhThanhPho} :{" "}
                                          {item?.diaDiem?.quanHuyen}
                                        </p>
                                        <p className="address">
                                          <span className="created">
                                            Ngày tạo:{" "}
                                            {TimeUtils.formatDateTime(
                                              item?.ngayTao,
                                              "DD-MM-YYYY"
                                            )}
                                          </span>
                                          &nbsp;
                                          <span className="apply-date">
                                            Hạn nộp:{" "}
                                            {TimeUtils.formatDateTime(
                                              item?.ngayHetHan,
                                              "DD-MM-YYYY"
                                            )}
                                          </span>
                                        </p>
                                        <p>
                                          <Link
                                            to={`/job-detail/${item._id}`}
                                            target="_blank"
                                          >
                                            Xem tin đăng trên website
                                          </Link>
                                        </p>
                                      </td>
                                      <td className="align-middle text-center">
                                        <Link
                                          to={`/employer/job/detail/${item?._id}`}
                                        >
                                          <span className="font-weight-bold align-items-center text-center">
                                            <FaUserPlus className="text-danger" />{" "}
                                            &nbsp; Xem hồ sơ của tin
                                          </span>
                                        </Link>
                                      </td>
                                      <td className="text-center align-middle">
                                        <>
                                          {item?.trangThai == "Đã duyệt" ? (
                                            <span>Đang tuyển dụng</span>
                                          ) : (
                                            item?.trangThai
                                          )}
                                        </>
                                      </td>
                                      <td
                                        colspan="3"
                                        className="text-center cursor-pointer align-middle pointer"
                                      >
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
                                                handleAddButtonClickDetail(
                                                  item
                                                );
                                              }}
                                            >
                                              <span class="dropdown-item">
                                                Xem tin tuyển dụng
                                              </span>
                                            </li>
                                            <>
                                              {item?.trangThai == "Đã duyệt" ? (
                                                <>
                                                  <li
                                                    onClick={() => {
                                                      // confirmDeleteStop(item?._id)

                                                      confirmDeleteStop(
                                                        item?._id
                                                      );
                                                    }}
                                                  >
                                                    <span class="dropdown-item">
                                                      Dừng tuyển dụng
                                                    </span>
                                                  </li>
                                                </>
                                              ) : null}
                                            </>
                                            <li
                                              onClick={() => {
                                                // handleAddButtonClickDetailDelete(
                                                //   item?._id
                                                // );
                                                // confirmDeleteDrop(item?._id);
                                              }}
                                            >
                                              <Link
                                                to={`/employer/job/update/${item?._id}`}
                                              >
                                                <span class="dropdown-item">
                                                  Cập nhật tin tuyển dụng
                                                </span>
                                              </Link>
                                            </li>
                                            <li
                                              onClick={() => {
                                                // handleAddButtonClickDetailDelete(
                                                //   item?._id
                                                // );
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
                      tab={`Chờ duyệt (${totalChoDuyet ? totalChoDuyet : 0})`}
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
                            <RiRefreshLine className="me-2" /> Làm mới
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
                                    <strong> Tin tuyển dụng</strong>
                                  </th>
                                  <th className="text-secondary opacity-7 ps-2 text-white py-3">
                                    <strong>Hồ sơ</strong>
                                  </th>
                                  <th className="text-secondary text-center opacity-7 ps-2 text-center text-white py-3">
                                    <strong> Trạng thái</strong>
                                  </th>
                                  <th
                                    colspan="3"
                                    className="text-secondary opacity-7 ps-2 text-center text-white py-3"
                                  >
                                    <strong>Thao tác</strong>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {recruitments.map((item, index) => {
                                  return (
                                    <tr key={index + 1}>
                                      <td className="align-middle">
                                        <p className="text-sm font-weight-bold mb-0 text-center">
                                          {index + 1}
                                        </p>
                                      </td>
                                      <td>
                                        <p className="text-sm fw-bold mb-0">
                                          {item?.tieuDe}
                                        </p>
                                        <p className="text-sm mb-0">
                                          {item?.diaDiem?.tinhThanhPho} :{" "}
                                          {item?.diaDiem?.quanHuyen}
                                        </p>
                                        <p className="address">
                                          <span className="created">
                                            Ngày tạo:{" "}
                                            {TimeUtils.formatDateTime(
                                              item?.ngayTao,
                                              "DD-MM-YYYY"
                                            )}
                                          </span>
                                          &nbsp;
                                          <span className="apply-date">
                                            Hạn nộp:{" "}
                                            {TimeUtils.formatDateTime(
                                              item?.ngayHetHan,
                                              "DD-MM-YYYY"
                                            )}
                                          </span>
                                        </p>
                                        <p>
                                          <Link
                                            to={`/job-detail/${item._id}`}
                                            target="_blank"
                                          >
                                            Xem tin đăng trên website
                                          </Link>
                                        </p>
                                      </td>
                                      <td className="align-middle text-center">
                                        <Link
                                          to={`/employer/job/detail/${item?._id}`}
                                        >
                                          <span className="font-weight-bold align-items-center text-center">
                                            <FaUserPlus className="text-danger" />{" "}
                                            &nbsp; Xem hồ sơ của tin
                                          </span>
                                        </Link>
                                      </td>
                                      <td className="text-center align-middle">
                                        <span>{item?.trangThai}</span>
                                      </td>
                                      <td
                                        colspan="3"
                                        className="text-center cursor-pointer align-middle pointer"
                                      >
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
                                                handleAddButtonClickDetail(
                                                  item
                                                );
                                              }}
                                            >
                                              <span class="dropdown-item">
                                                Xem tin tuyển dụng
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
                      tab={`Đang tuyển dụng (${
                        totalDaDuyet ? totalDaDuyet : 0
                      })`}
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
                            <RiRefreshLine className="me-2" /> Làm mới
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
                                    <strong> Tin tuyển dụng</strong>
                                  </th>
                                  <th className="text-secondary opacity-7 ps-2 text-white py-3">
                                    <strong>Hồ sơ</strong>
                                  </th>
                                  <th className="text-secondary text-center opacity-7 ps-2 text-center text-white py-3">
                                    <strong> Trạng thái</strong>
                                  </th>
                                  <th
                                    colspan="3"
                                    className="text-secondary opacity-7 ps-2 text-center text-white py-3"
                                  >
                                    <strong>Thao tác</strong>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {recruitments.map((item, index) => {
                                  return (
                                    <tr key={index + 1}>
                                      <td className="align-middle">
                                        <p className="text-sm font-weight-bold mb-0 text-center">
                                          {index + 1}
                                        </p>
                                      </td>
                                      <td>
                                        <p className="text-sm fw-bold mb-0">
                                          {item?.tieuDe}
                                        </p>
                                        <p className="text-sm mb-0">
                                          {item?.diaDiem?.tinhThanhPho} :{" "}
                                          {item?.diaDiem?.quanHuyen}
                                        </p>
                                        <p className="address">
                                          <span className="created">
                                            Ngày tạo:{" "}
                                            {TimeUtils.formatDateTime(
                                              item?.ngayTao,
                                              "DD-MM-YYYY"
                                            )}
                                          </span>
                                          &nbsp;
                                          <span className="apply-date">
                                            Hạn nộp:{" "}
                                            {TimeUtils.formatDateTime(
                                              item?.ngayHetHan,
                                              "DD-MM-YYYY"
                                            )}
                                          </span>
                                        </p>
                                        <p>
                                          <Link
                                            to={`/job-detail/${item._id}`}
                                            target="_blank"
                                          >
                                            Xem tin đăng trên website
                                          </Link>
                                        </p>
                                      </td>
                                      <td className="align-middle">
                                        <Link
                                          to={`/employer/job/detail/${item?._id}`}
                                        >
                                          <span className="font-weight-bold align-items-center text-center">
                                            <FaUserPlus className="text-danger" />{" "}
                                            &nbsp; Xem hồ sơ của tin
                                          </span>
                                        </Link>
                                      </td>
                                      <td className="text-center align-middle">
                                        <>
                                          {item?.trangThai == "Đã duyệt" && (
                                            <span>Đang tuyển dụng</span>
                                          )}
                                        </>
                                      </td>
                                      <td
                                        colspan="3"
                                        className="text-center cursor-pointer align-middle pointer"
                                      >
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
                                                handleAddButtonClickDetail(
                                                  item
                                                );
                                              }}
                                            >
                                              <span class="dropdown-item">
                                                Xem tin tuyển dụng
                                              </span>
                                            </li>
                                            <li
                                              onClick={() => {
                                                confirmDeleteStop(item?._id);
                                              }}
                                            >
                                              <span class="dropdown-item">
                                                Dừng tuyển dụng
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
                      tab={`Dừng tuyển(${totalDungTuyen ? totalDungTuyen : 0})`}
                      key="3"
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
                            <RiRefreshLine className="me-2" /> Làm mới
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
                                    <strong> Tin tuyển dụng</strong>
                                  </th>
                                  <th className="text-secondary opacity-7 ps-2 text-white py-3">
                                    <strong>Hồ sơ</strong>
                                  </th>
                                  <th className="text-secondary text-center opacity-7 ps-2 text-center text-white py-3">
                                    <strong> Trạng thái</strong>
                                  </th>
                                  <th
                                    colspan="3"
                                    className="text-secondary opacity-7 ps-2 text-center text-white py-3"
                                  >
                                    <strong>Thao tác</strong>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {recruitments.map((item, index) => {
                                  return (
                                    <tr key={index + 1}>
                                      <td className="align-middle">
                                        <p className="text-sm font-weight-bold mb-0 text-center">
                                          {index + 1}
                                        </p>
                                      </td>
                                      <td>
                                        <p className="text-sm fw-bold mb-0">
                                          {item?.tieuDe}
                                        </p>
                                        <p className="text-sm mb-0">
                                          {item?.diaDiem?.tinhThanhPho} :{" "}
                                          {item?.diaDiem?.quanHuyen}
                                        </p>
                                        <p className="address">
                                          <span className="created">
                                            Ngày tạo:{" "}
                                            {TimeUtils.formatDateTime(
                                              item?.ngayTao,
                                              "DD-MM-YYYY"
                                            )}
                                          </span>
                                          &nbsp;
                                          <span className="apply-date">
                                            Hạn nộp:{" "}
                                            {TimeUtils.formatDateTime(
                                              item?.ngayHetHan,
                                              "DD-MM-YYYY"
                                            )}
                                          </span>
                                        </p>
                                        <p>
                                          <Link
                                            to={`/job-detail/${item._id}`}
                                            target="_blank"
                                          >
                                            Xem tin đăng trên website
                                          </Link>
                                        </p>
                                      </td>
                                      <td className="align-middle text-center">
                                        <Link
                                          to={`/employer/job/detail/${item?._id}`}
                                        >
                                          <span className="font-weight-bold align-items-center text-center">
                                            <FaUserPlus className="text-danger" />{" "}
                                            &nbsp; Xem hồ sơ của tin
                                          </span>
                                        </Link>
                                      </td>
                                      <td className="text-center align-middle">
                                        <span>{item?.trangThai}</span>
                                      </td>
                                      <td
                                        colspan="3"
                                        className="text-center cursor-pointer align-middle pointer"
                                      >
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
                                                handleAddButtonClickDetail(
                                                  item
                                                );
                                              }}
                                            >
                                              <span class="dropdown-item">
                                                Xem tin tuyển dụng
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
                      tab={`Khóa (${totalKhoa ? totalKhoa : 0})`}
                      key="0"
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
                                    <strong> Tin tuyển dụng</strong>
                                  </th>
                                  <th className="text-secondary opacity-7 ps-2 text-white py-3">
                                    <strong>Hồ sơ</strong>
                                  </th>
                                  <th className="text-secondary text-center opacity-7 ps-2 text-center text-white py-3">
                                    <strong> Trạng thái</strong>
                                  </th>
                                  <th
                                    colspan="3"
                                    className="text-secondary opacity-7 ps-2 text-center text-white py-3"
                                  >
                                    <strong>Thao tác</strong>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {recruitments.map((item, index) => {
                                  return (
                                    <tr key={index + 1}>
                                      <td className="align-middle">
                                        <p className="text-sm font-weight-bold mb-0 text-center">
                                          {index + 1}
                                        </p>
                                      </td>
                                      <td>
                                        <p className="text-sm fw-bold mb-0">
                                          {item?.tieuDe}
                                        </p>
                                        <p className="text-sm mb-0">
                                          {item?.diaDiem?.tinhThanhPho} :{" "}
                                          {item?.diaDiem?.quanHuyen}
                                        </p>
                                        <p className="address">
                                          <span className="created">
                                            Ngày tạo:{" "}
                                            {TimeUtils.formatDateTime(
                                              item?.ngayTao,
                                              "DD-MM-YYYY"
                                            )}
                                          </span>
                                          &nbsp;
                                          <span className="apply-date">
                                            Hạn nộp:{" "}
                                            {TimeUtils.formatDateTime(
                                              item?.ngayHetHan,
                                              "DD-MM-YYYY"
                                            )}
                                          </span>
                                        </p>
                                        <p>
                                          <Link
                                            to={`/job-detail/${item._id}`}
                                            target="_blank"
                                          >
                                            Xem tin đăng trên website
                                          </Link>
                                        </p>
                                      </td>
                                      <td className="align-middle text-center">
                                        <Link
                                          to={`/employer/job/detail/${item?._id}`}
                                        >
                                          <span className="font-weight-bold align-items-center text-center">
                                            <FaUserPlus className="text-danger" />{" "}
                                            &nbsp; Xem hồ sơ của tin
                                          </span>
                                        </Link>
                                      </td>
                                      <td className="text-center align-middle">
                                        <span>{item?.trangThai}</span>
                                      </td>
                                      <td
                                        colspan="3"
                                        className="text-center cursor-pointer align-middle pointer"
                                      >
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
                                                handleAddButtonClickDetail(
                                                  item
                                                );
                                              }}
                                            >
                                              <span class="dropdown-item">
                                                Xem tin tuyển dụng
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
                      tab={`Từ chối (${totalTuChoi ? totalTuChoi : 0})`}
                      key="4"
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
                            <RiRefreshLine className="me-2" /> Làm mới
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
                                    <strong> Tin tuyển dụng</strong>
                                  </th>
                                  <th className="text-secondary opacity-7 ps-2 text-white py-3">
                                    <strong>Hồ sơ</strong>
                                  </th>
                                  <th className="text-secondary text-center opacity-7 ps-2 text-center text-white py-3">
                                    <strong> Trạng thái</strong>
                                  </th>
                                  <th
                                    colspan="3"
                                    className="text-secondary opacity-7 ps-2 text-center text-white py-3"
                                  >
                                    <strong>Thao tác</strong>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {recruitments.map((item, index) => {
                                  return (
                                    <tr key={index + 1}>
                                      <td className="align-middle">
                                        <p className="text-sm font-weight-bold mb-0 text-center">
                                          {index + 1}
                                        </p>
                                      </td>
                                      <td>
                                        <p className="text-sm fw-bold mb-0">
                                          {item?.tieuDe}
                                        </p>
                                        <p className="text-sm mb-0">
                                          {item?.diaDiem?.tinhThanhPho} :{" "}
                                          {item?.diaDiem?.quanHuyen}
                                        </p>
                                        <p className="address">
                                          <span className="created">
                                            Ngày tạo:{" "}
                                            {TimeUtils.formatDateTime(
                                              item?.ngayTao,
                                              "DD-MM-YYYY"
                                            )}
                                          </span>
                                          &nbsp;
                                          <span className="apply-date">
                                            Hạn nộp:{" "}
                                            {TimeUtils.formatDateTime(
                                              item?.ngayHetHan,
                                              "DD-MM-YYYY"
                                            )}
                                          </span>
                                        </p>
                                        <p>
                                          <Link
                                            to={`/job-detail/${item._id}`}
                                            target="_blank"
                                          >
                                            Xem tin đăng trên website
                                          </Link>
                                        </p>
                                      </td>
                                      <td className="align-middle text-center">
                                        <Link
                                          to={`/employer/job/detail/${item?._id}`}
                                        >
                                          <span className="font-weight-bold align-items-center text-center">
                                            <FaUserPlus className="text-danger" />{" "}
                                            &nbsp; Xem hồ sơ của tin
                                          </span>
                                        </Link>
                                      </td>
                                      <td className="text-center align-middle">
                                        <span>{item?.trangThai}</span>
                                      </td>
                                      <td
                                        colspan="3"
                                        className="text-center cursor-pointer align-middle pointer"
                                      >
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
                                                handleAddButtonClickDetail(
                                                  item
                                                );
                                              }}
                                            >
                                              <span class="dropdown-item">
                                                Xem tin tuyển dụng
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

                        <div className="col-12">
                          {recruitments.length !== 0 && (
                            <Pagination
                              onPageChange={handlePageChange}
                              pagination={pagination}
                            />
                          )}
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
                      </div>
                    </TabPane>
                  </Tabs>
                </div>
              </div>
            </div>
            <div></div>
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
      {renderModalDetail}
    </Fragment>
  );
};
export default MainNavigationAdmin;
