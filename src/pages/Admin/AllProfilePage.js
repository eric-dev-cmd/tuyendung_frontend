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
  const [filters, setFilters] = useState({
    page: 1,
    limit: 5,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    totalProducts: 1,
  });

  const [recruitments, setRecruitments] = useState([]);

  const [value, setValue] = useState(0);
  useEffect(() => {
    const paramsString = queryString.stringify(filters);
    console.log("paramsString", paramsString);
  }, [filters]);
  //HANDLE PAGINATION
  const handlePageChange = (newPage) => {
    setFilters({
      ...filters,
      page: newPage.selected + 1,
    });
  };

  const getDataListFilters = async () => {
    const paramsString = queryString.stringify(filters);
    try {
      const response = await RecruitmentApi.getListProfile(paramsString);
      const a = recruitments.find((yeuCauDoTuoi) => (yeuCauDoTuoi = true));
      setRecruitments(response.data);
      setPagination(response.pagination);
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
  }, [filters]);

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
      tieuDe: newFilters.searchTerm,
    });
  };

  const [userProfile, setUserProfile] = useState();
  const [isShowModalProfile, setIsShowModalProfile] = useState(false);
  const handleAddButtonClickProfile = (item) => {
    setUserProfile(item);
    // e.preventDefault();
    setIsShowModalProfile(true);
  };
  const handleSubmitModalProfile = () => {
    console.log("Submit modal profile");
  };
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
      let total = 0;
      const requestUrl = `http://localhost:4000/donUngTuyens/demDonUngTuyenTheoTrangThai`;
      try {
        const response = await axiosClient.get(requestUrl).then((res) => {
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

  // ứng viêm tiềm năng
  const handleAddButtonClickTalent = async (id) => {
    try {
      const requestUrl = `http://localhost:4000/donUngTuyens/themDonUngTuyenTiemNang/${id}`;
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

  // Modal confirm don ung tuyen
  const confirmDeleteProfile = (id) =>
    Modal.confirm({
      title: `Bạn chắc chắn muốn xóa đơn ứng tuyển này?`,
      // content: "first",
      onOk: async () => {
        try {
          const requestUrl = `http://localhost:4000/donUngTuyens/${id}`;
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

  useEffect(() => {
    getDataListFilters();
  }, [isSubmit]);

  return (
    <Fragment>
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
              <Breadcrumb.Item>Tất cả đơn ứng tuyển</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background bg-white"
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              <strong>Tất cả đơn ứng tuyển</strong>
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
                                    thongTinLienHe,
                                    tiemNang,
                                    ngayUngTuyen
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
                                          {thongTinLienHe?.ten}
                                        </p>
                                        <p className="text-sm mb-0">
                                          {thongTinLienHe?.sdt}
                                        </p>
                                        <p className="text-sm mb-0">
                                          {thongTinLienHe?.email}
                                        </p>
                                        <p className="address">
                                          <span className="created">
                                            Ngày nộp:{" "}
                                            {TimeUtils.formatDateTime(
                                              ngayUngTuyen,
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
                                        <>
                                          {trangThai == "Thất bại" ? (
                                            <span>Từ chối</span>
                                          ) : trangThai == "Đã ứng tuyển" ? (
                                            <span>Chấp nhận</span>
                                          ) : (
                                            <span>{trangThai}</span>
                                          )}
                                        </>
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
                                                  item?.donTuyenDung?._id
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
                        <div className="col-2">
                          <Select
                            style={{ width: "100%" }}
                            showSearch
                            placeholder="Thời gian nộp đơn"
                            optionFilterProp="children"
                            onChange={(value) => {
                              console.log("Value", value);
                            }}
                            onSearch={(value) => {
                              console.log("Value search", value);
                            }}
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            <Option value="jack">Jack</Option>
                          </Select>
                        </div>
                        <div className="col-2">
                          <Select
                            style={{ width: "100%" }}
                            defaultValue="lucy"
                            onChange={(value) => {
                              console.log("Value", value);
                            }}
                          >
                            <Option value="jack">Đăng gần nhất</Option>
                            <Option value="lucy">Đăng cũ nhất</Option>
                          </Select>
                        </div>
                        {/* <div className="col-1 me-3">
                          <Button
                            style={{ width: "120px" }}
                            className="d-flex align-items-center justify-content-center"
                            type="primary"
                            icon={<SearchOutlined />}
                          >
                            Tìm kiếm
                          </Button>
                        </div> */}
                        <div className="col-1 ms-3">
                          <Button
                            className="d-flex align-items-center justify-content-center"
                            type="primary"
                            // icon={<GrFormRefresh />}
                            onClick={() => {
                              window.location.reload();
                            }}
                          >
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
                                              <span class="dropdown-item">
                                                Ứng viên tiềm năng
                                              </span>
                                            </li>
                                            <li
                                              onClick={() => {
                                                confirmDeleteProfile(
                                                  item?.donTuyenDung?._id
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
                      tab={`Chấp nhận (${totalDaUT ? totalDaUT : 0})`}
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
                                        {trangThai == "Đã ứng tuyển" && (
                                          <span>Chấp nhận</span>
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
                                              <span class="dropdown-item">
                                                Ứng viên tiềm năng
                                              </span>
                                            </li>
                                            <li
                                              onClick={() => {
                                                confirmDeleteProfile(
                                                  item?.donTuyenDung?._id
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
                      tab={`Từ chối(${totalTuChoi ? totalTuChoi : 0})`}
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
                                        <>
                                          {trangThai == "Thất bại" && (
                                            <span>Từ chối</span>
                                          )}
                                        </>
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
                                                confirmDeleteProfile(
                                                  item?.donTuyenDung?._id
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
