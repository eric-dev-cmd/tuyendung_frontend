import { Layout, Menu, Breadcrumb, Input, Tooltip, Button } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { FaListUl, FaUserPlus } from "react-icons/fa";
import { GoSignOut } from "react-icons/go";
import { Link } from "react-router-dom";
import { Tabs } from "antd";
import { Select } from "antd";
import { GrFormRefresh } from "react-icons/gr";
import { FaEllipsisV } from "react-icons/fa";
import RecruitmentApi from "../../services/recruitmentApi";
import TimeUtils from "../../utils/timeUtils";
import ReactPaginate from "react-paginate";
import Pagination from "../../components/Pagination/Pagination";
import PostFiltersForm from "../../components/Admin/PostFiltersForm";
import queryString from "query-string";
import axios from "axios";

const { Option } = Select;

const { TabPane } = Tabs;
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const DashBoardQTV = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 15,
  });

  const [recruitments, setRecruitments] = useState([]);
  const paramsString = queryString.stringify(filters);
  console.log("paramsString", paramsString);
  const [type, setType] = useState();
  const onHandleChangeType = (value) => {
    setType(value);
  };
  const [value, setValue] = useState(0);

  useEffect(() => {
    let mounted = true;
    const getDataListFilters = async () => {
      const requestUrl = `http://localhost:4000/tinTuyenDungs/soLuongDanhGiaTheoTin?${paramsString}`;
      try {
        const response = await axios.get(requestUrl);
        console.log("...soLuongDanhGiaTheoTin [vinh]", response.data.data);
        console.log("Aaaaaaaaaaaa", response.data);
        setRecruitments(response.data.data);
        setTotalCount(response?.data?.pagination?.total);
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

  // const prevPage = async () => {
  //   const pg = page === 1 ? 1 : page - 1;
  //    getListData(pg);
  //   setPage(pg);
  // };
  // const nextPage = async () => {
  //   const pg = page < Math.ceil(totalCount / pageSize) ? page + 1 : page;
  //   // getListData(pg);
  //   setPage(pg);
  // };
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

  return (
    <Fragment>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={() => setCollapsed(!collapsed)}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item icon={<DesktopOutlined />} key="1">
              Trang chủ
              <Link to="/admin/dashboard" />
            </Menu.Item>
            <Menu.Item icon={<DesktopOutlined />} key="2">
              Quản lý tin tuyển dụng
              <Link to="/admin/dashboard" />
            </Menu.Item>
            <Menu.Item icon={<GoSignOut />} key="3">
              Đăng xuất
              <Link to="/logout" />
            </Menu.Item>
          </Menu>
        </Sider>
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
                      setIsGetRecruitmentReviewLeast(false);

                      if (e == 9) {
                        setIsGetRecruitmentReviewLeast(true);
                      }
                    }}
                  >
                    <TabPane tab={`Tất cả (${0})`} key="6">
                      <div className="row">
                        <div className="col-2">
                          <PostFiltersForm onSubmit={handleFiltersChange} />
                        </div>
                        <div className="col-2">
                          <Select
                            style={{ width: "100%" }}
                            showSearch
                            placeholder="Thời gian tạo"
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
                            <Option value="lucy">Lucy</Option>
                            <Option value="tom">Tom</Option>
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
                          <div className="card mb-4">
                            <div className="card-body px-0 pt-0 pb-2">
                              <div className="table-responsive p-0">
                                <table className="table align-items-center justify-content-center mb-0">
                                  <thead className="bg-dark">
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
                                      <th className="text-secondary opacity-7 ps-2 text-center text-white py-3">
                                        <strong>Áp dụng dịch vụ</strong>
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
                                            <p className="text-sm mb-0">
                                              {item?.soLuotDanhGia == 0 ? (
                                                <span className="fst-italic">
                                                  Không có lượt đánh giá nào
                                                </span>
                                              ) : (
                                                <>
                                                  <span>
                                                    Số lượt đánh giá:{" "}
                                                  </span>
                                                  {item?.soLuotDanhGia}
                                                </>
                                              )}
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
                                            <span className="text-xs font-weight-bold d-flex align-items-center  text-center">
                                              <FaUserPlus className="text-danger" />{" "}
                                              &nbsp; 1 hồ sơ mới
                                            </span>
                                          </td>
                                          <td className="text-center align-middle">
                                            <span>{item?.trangThai}</span>
                                          </td>
                                          <td
                                            className="text-center cursor-pointer align-middle pointer"
                                            onClick={(e) => {
                                              console.log("e", e);
                                            }}
                                          >
                                            <span className="text-xs font-weight-bold pointer">
                                              <FaEllipsisV />
                                            </span>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            </div>
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
                        {/* <div className="col-12">
                          Showing {totalCount === 0 ? 0 : offset + 1} to{" "}
                          {offset + 10 > totalCount
                            ? totalCount
                            : offset + pageSize}{" "}
                          of {totalCount}
                        </div> */}
                        <div className="col-12">
                          <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-center">
                              <li
                                className={`page-item ${
                                  page <= 1 ? "disabled drop" : ""
                                }`}
                              >
                                <button
                                  type="button"
                                  className="page-link"
                                  disabled={page <= 1}
                                  onClick={() => {
                                    // prevPage();
                                  }}
                                >
                                  Trang truớc
                                </button>
                              </li>
                              <li
                                className={`page-item ${
                                  page >= totalCount ? "disabled drop" : ""
                                }`}
                              >
                                <button
                                  className="page-link"
                                  type="button"
                                  disabled={page >= totalCount}
                                  onClick={() => {
                                    // nextPage();
                                  }}
                                >
                                  Trang sau
                                </button>
                              </li>
                            </ul>
                          </nav>
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
                        <div className="col-2">
                          <Select
                            style={{ width: "100%" }}
                            showSearch
                            placeholder="Thời gian tạo"
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
                            <Option value="lucy">Lucy</Option>
                            <Option value="tom">Tom</Option>
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
                          <div className="card mb-4">
                            <div className="card-body px-0 pt-0 pb-2">
                              <div className="table-responsive p-0">
                                <table className="table align-items-center justify-content-center mb-0">
                                  <thead className="bg-dark">
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
                                      <th className="text-secondary opacity-7 ps-2 text-center text-white py-3">
                                        <strong>Áp dụng dịch vụ</strong>
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {recruitments.map((item, index) => {
                                      return (
                                        <tr key={index + 1}>
                                          <td className="align-middle">
                                            <p className="text-sm font-weight-bold mb-0 text-center">
                                              {index}
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
                                            <span className="text-xs font-weight-bold d-flex align-items-center  text-center">
                                              <FaUserPlus className="text-danger" />{" "}
                                              &nbsp; 1 hồ sơ mới
                                            </span>
                                          </td>
                                          <td className="text-center align-middle">
                                            <span>{item?.trangThai}</span>
                                          </td>
                                          <td
                                            className="text-center cursor-pointer align-middle pointer"
                                            onClick={(e) => {
                                              console.log("e", e);
                                            }}
                                          >
                                            <span className="text-xs font-weight-bold pointer">
                                              <FaEllipsisV />
                                            </span>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            </div>
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
                        {/* <div className="col-12">
                          Showing {totalCount === 0 ? 0 : offset + 1} to{" "}
                          {offset + 10 > totalCount
                            ? totalCount
                            : offset + pageSize}{" "}
                          of {totalCount}
                        </div> */}
                        <div className="col-12">
                          <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-center">
                              <li
                                className={`page-item ${
                                  page <= 1 ? "disabled drop" : ""
                                }`}
                              >
                                <button
                                  type="button"
                                  className="page-link"
                                  disabled={page <= 1}
                                  onClick={() => {
                                    // prevPage();
                                  }}
                                >
                                  Trang truớc
                                </button>
                              </li>
                              <li
                                className={`page-item ${
                                  page >= totalCount ? "disabled drop" : ""
                                }`}
                              >
                                <button
                                  className="page-link"
                                  type="button"
                                  disabled={page >= totalCount}
                                  onClick={() => {
                                    // nextPage();
                                  }}
                                >
                                  Trang sau
                                </button>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                    </TabPane>
                    <TabPane
                      tab={`Đã duyệt (${totalDaDuyet ? totalDaDuyet : 0})`}
                      key="2"
                    >
                      <div className="row">
                        <div className="col-2">
                          <PostFiltersForm onSubmit={handleFiltersChange} />
                        </div>
                        <div className="col-2">
                          <Select
                            style={{ width: "100%" }}
                            showSearch
                            placeholder="Thời gian tạo"
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
                            <Option value="lucy">Lucy</Option>
                            <Option value="tom">Tom</Option>
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
                          <div className="card mb-4">
                            <div className="card-body px-0 pt-0 pb-2">
                              <div className="table-responsive p-0">
                                <table className="table align-items-center justify-content-center mb-0">
                                  <thead className="bg-dark">
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
                                      <th className="text-secondary opacity-7 ps-2 text-center text-white py-3">
                                        <strong>Áp dụng dịch vụ</strong>
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {recruitments.map((item, index) => {
                                      return (
                                        <tr key={index + 1}>
                                          <td className="align-middle">
                                            <p className="text-sm font-weight-bold mb-0 text-center">
                                              {index}
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
                                            <p className="text-sm mb-0">
                                              {item?.soLuotDanhGia == 0 ? (
                                                <span className="fst-italic">
                                                  Không có lượt đánh giá nào
                                                </span>
                                              ) : (
                                                <>
                                                  <span>
                                                    Số lượt đánh giá:{" "}
                                                  </span>
                                                  {item?.soLuotDanhGia}
                                                </>
                                              )}
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
                                            <span className="text-xs font-weight-bold d-flex align-items-center  text-center">
                                              <FaUserPlus className="text-danger" />{" "}
                                              &nbsp; 1 hồ sơ mới
                                            </span>
                                          </td>
                                          <td className="text-center align-middle">
                                            <span>{item?.trangThai}</span>
                                          </td>
                                          <td
                                            className="text-center cursor-pointer align-middle pointer"
                                            onClick={(e) => {
                                              console.log("e", e);
                                            }}
                                          >
                                            <span className="text-xs font-weight-bold pointer">
                                              <FaEllipsisV />
                                            </span>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            </div>
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
                        {/* <div className="col-12">
                          Showing {totalCount === 0 ? 0 : offset + 1} to{" "}
                          {offset + 10 > totalCount
                            ? totalCount
                            : offset + pageSize}{" "}
                          of {totalCount}
                        </div> */}
                        <div className="col-12">
                          <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-center">
                              <li
                                className={`page-item ${
                                  page <= 1 ? "disabled drop" : ""
                                }`}
                              >
                                <button
                                  type="button"
                                  className="page-link"
                                  disabled={page <= 1}
                                  onClick={() => {
                                    // prevPage();
                                  }}
                                >
                                  Trang truớc
                                </button>
                              </li>
                              <li
                                className={`page-item ${
                                  page >= totalCount ? "disabled drop" : ""
                                }`}
                              >
                                <button
                                  className="page-link"
                                  type="button"
                                  disabled={page >= totalCount}
                                  onClick={() => {
                                    // nextPage();
                                  }}
                                >
                                  Trang sau
                                </button>
                              </li>
                            </ul>
                          </nav>
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
                        <div className="col-2">
                          <Select
                            style={{ width: "100%" }}
                            showSearch
                            placeholder="Thời gian tạo"
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
                            <Option value="lucy">Lucy</Option>
                            <Option value="tom">Tom</Option>
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
                          <div className="card mb-4">
                            <div className="card-body px-0 pt-0 pb-2">
                              <div className="table-responsive p-0">
                                <table className="table align-items-center justify-content-center mb-0">
                                  <thead className="bg-dark">
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
                                      <th className="text-secondary opacity-7 ps-2 text-center text-white py-3">
                                        <strong>Áp dụng dịch vụ</strong>
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {recruitments.map((item, index) => {
                                      return (
                                        <tr key={index + 1}>
                                          <td className="align-middle">
                                            <p className="text-sm font-weight-bold mb-0 text-center">
                                              {index}
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
                                            <p className="text-sm mb-0">
                                              {item?.soLuotDanhGia == 0 ? (
                                                <span className="fst-italic">
                                                  Không có lượt đánh giá nào
                                                </span>
                                              ) : (
                                                <>
                                                  <span>
                                                    Số lượt đánh giá:{" "}
                                                  </span>
                                                  {item?.soLuotDanhGia}
                                                </>
                                              )}
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
                                            <span className="text-xs font-weight-bold d-flex align-items-center  text-center">
                                              <FaUserPlus className="text-danger" />{" "}
                                              &nbsp; 1 hồ sơ mới
                                            </span>
                                          </td>
                                          <td className="text-center align-middle">
                                            <span>{item?.trangThai}</span>
                                          </td>
                                          <td
                                            className="text-center cursor-pointer align-middle pointer"
                                            onClick={(e) => {
                                              console.log("e", e);
                                            }}
                                          >
                                            <span className="text-xs font-weight-bold pointer">
                                              <FaEllipsisV />
                                            </span>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            </div>
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
                        {/* <div className="col-12">
                          Showing {totalCount === 0 ? 0 : offset + 1} to{" "}
                          {offset + 10 > totalCount
                            ? totalCount
                            : offset + pageSize}{" "}
                          of {totalCount}
                        </div> */}
                        <div className="col-12">
                          <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-center">
                              <li
                                className={`page-item ${
                                  page <= 1 ? "disabled drop" : ""
                                }`}
                              >
                                <button
                                  type="button"
                                  className="page-link"
                                  disabled={page <= 1}
                                  onClick={() => {
                                    // prevPage();
                                  }}
                                >
                                  Trang truớc
                                </button>
                              </li>
                              <li
                                className={`page-item ${
                                  page >= totalCount ? "disabled drop" : ""
                                }`}
                              >
                                <button
                                  className="page-link"
                                  type="button"
                                  disabled={page >= totalCount}
                                  onClick={() => {
                                    // nextPage();
                                  }}
                                >
                                  Trang sau
                                </button>
                              </li>
                            </ul>
                          </nav>
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
                        <div className="col-2">
                          <Select
                            style={{ width: "100%" }}
                            showSearch
                            placeholder="Thời gian tạo"
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
                            <Option value="lucy">Lucy</Option>
                            <Option value="tom">Tom</Option>
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
                          <div className="card mb-4">
                            <div className="card-body px-0 pt-0 pb-2">
                              <div className="table-responsive p-0">
                                <table className="table align-items-center justify-content-center mb-0">
                                  <thead className="bg-dark">
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
                                      <th className="text-secondary opacity-7 ps-2 text-center text-white py-3">
                                        <strong>Áp dụng dịch vụ</strong>
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {recruitments.map((item, index) => {
                                      return (
                                        <tr key={index + 1}>
                                          <td className="align-middle">
                                            <p className="text-sm font-weight-bold mb-0 text-center">
                                              {index}
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
                                            <p className="text-sm mb-0">
                                              {item?.soLuotDanhGia == 0 ? (
                                                <span className="fst-italic">
                                                  Không có lượt đánh giá nào
                                                </span>
                                              ) : (
                                                <>
                                                  <span>
                                                    Số lượt đánh giá:{" "}
                                                  </span>
                                                  {item?.soLuotDanhGia}
                                                </>
                                              )}
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
                                            <span className="text-xs font-weight-bold d-flex align-items-center  text-center">
                                              <FaUserPlus className="text-danger" />{" "}
                                              &nbsp; 1 hồ sơ mới
                                            </span>
                                          </td>
                                          <td className="text-center align-middle">
                                            <span>{item?.trangThai}</span>
                                          </td>
                                          <td
                                            className="text-center cursor-pointer align-middle pointer"
                                            onClick={(e) => {
                                              console.log("e", e);
                                            }}
                                          >
                                            <span className="text-xs font-weight-bold pointer">
                                              <FaEllipsisV />
                                            </span>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            </div>
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
                        {/* <div className="col-12">
                          Showing {totalCount === 0 ? 0 : offset + 1} to{" "}
                          {offset + 10 > totalCount
                            ? totalCount
                            : offset + pageSize}{" "}
                          of {totalCount}
                        </div> */}
                        <div className="col-12">
                          <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-center">
                              <li
                                className={`page-item ${
                                  page <= 1 ? "disabled drop" : ""
                                }`}
                              >
                                <button
                                  type="button"
                                  className="page-link"
                                  disabled={page <= 1}
                                  onClick={() => {
                                    // prevPage();
                                  }}
                                >
                                  Trang truớc
                                </button>
                              </li>
                              <li
                                className={`page-item ${
                                  page >= totalCount ? "disabled drop" : ""
                                }`}
                              >
                                <button
                                  className="page-link"
                                  type="button"
                                  disabled={page >= totalCount}
                                  onClick={() => {
                                    // nextPage();
                                  }}
                                >
                                  Trang sau
                                </button>
                              </li>
                            </ul>
                          </nav>
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
                        <div className="col-2">
                          <Select
                            style={{ width: "100%" }}
                            showSearch
                            placeholder="Thời gian tạo"
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
                            <Option value="lucy">Lucy</Option>
                            <Option value="tom">Tom</Option>
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
                          <div className="card mb-4">
                            <div className="card-body px-0 pt-0 pb-2">
                              <div className="table-responsive p-0">
                                <table className="table align-items-center justify-content-center mb-0">
                                  <thead className="bg-dark">
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
                                      <th className="text-secondary opacity-7 ps-2 text-center text-white py-3">
                                        <strong>Áp dụng dịch vụ</strong>
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {recruitments.map((item, index) => {
                                      return (
                                        <tr key={index + 1}>
                                          <td className="align-middle">
                                            <p className="text-sm font-weight-bold mb-0 text-center">
                                              {index}
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
                                            <p className="text-sm mb-0">
                                              {item?.soLuotDanhGia == 0 ? (
                                                <span className="fst-italic">
                                                  Không có lượt đánh giá nào
                                                </span>
                                              ) : (
                                                <>
                                                  <span>
                                                    Số lượt đánh giá:{" "}
                                                  </span>
                                                  {item?.soLuotDanhGia}
                                                </>
                                              )}
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
                                            <span className="text-xs font-weight-bold d-flex align-items-center  text-center">
                                              <FaUserPlus className="text-danger" />{" "}
                                              &nbsp; 1 hồ sơ mới
                                            </span>
                                          </td>
                                          <td className="text-center align-middle">
                                            <span>{item?.trangThai}</span>
                                          </td>
                                          <td
                                            className="text-center cursor-pointer align-middle pointer"
                                            onClick={(e) => {
                                              console.log("e", e);
                                            }}
                                          >
                                            <span className="text-xs font-weight-bold pointer">
                                              <FaEllipsisV />
                                            </span>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            </div>
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
                        {/* <div className="col-12">
                          Showing {totalCount === 0 ? 0 : offset + 1} to{" "}
                          {offset + 10 > totalCount
                            ? totalCount
                            : offset + pageSize}{" "}
                          of {totalCount}
                        </div> */}
                        <div className="col-12">
                          <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-center">
                              <li
                                className={`page-item ${
                                  page <= 1 ? "disabled drop" : ""
                                }`}
                              >
                                <button
                                  type="button"
                                  className="page-link"
                                  disabled={page <= 1}
                                  onClick={() => {
                                    // prevPage();
                                  }}
                                >
                                  Trang truớc
                                </button>
                              </li>
                              <li
                                className={`page-item ${
                                  page >= totalCount ? "disabled drop" : ""
                                }`}
                              >
                                <button
                                  className="page-link"
                                  type="button"
                                  disabled={page >= totalCount}
                                  onClick={() => {
                                    // nextPage();
                                  }}
                                >
                                  Trang sau
                                </button>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                    </TabPane>
                    <TabPane tab={`Đánh giá kém`} key="9">
                      <div className="row">
                        <div className="col-10">
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
                            Làm mới
                          </Button>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-12">
                          <div className="card mb-4">
                            <div className="card-body px-0 pt-0 pb-2">
                              <div className="table-responsive p-0">
                                <table className="table align-items-center justify-content-center mb-0">
                                  <thead className="bg-dark">
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
                                      <th className="text-secondary opacity-7 ps-2 text-center text-white py-3">
                                        <strong>Áp dụng dịch vụ</strong>
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {recruitmentReviewLeast.map(
                                      (item, index) => {
                                        return (
                                          <tr key={index + 1}>
                                            <td className="align-middle">
                                              <p className="text-sm font-weight-bold mb-0 text-center">
                                                {index}
                                              </p>
                                            </td>
                                            <td>
                                              <p className="text-sm fw-bold mb-0">
                                                {item?.tinTuyenDung?.tieuDe}
                                              </p>
                                              <p className="text-sm mb-0">
                                                {
                                                  item?.tinTuyenDung?.diaDiem
                                                    ?.tinhThanhPho
                                                }{" "}
                                                :{" "}
                                                {
                                                  item?.tinTuyenDung?.diaDiem
                                                    ?.quanHuyen
                                                }
                                              </p>
                                              <p className="address">
                                                <span className="created">
                                                  Ngày tạo:{" "}
                                                  {TimeUtils.formatDateTime(
                                                    item?.tinTuyenDung?.ngayTao,
                                                    "DD-MM-YYYY"
                                                  )}
                                                </span>
                                                &nbsp;
                                                <span className="apply-date">
                                                  Hạn nộp:{" "}
                                                  {TimeUtils.formatDateTime(
                                                    item?.tinTuyenDung
                                                      ?.ngayHetHan,
                                                    "DD-MM-YYYY"
                                                  )}
                                                </span>
                                              </p>
                                              <p className="text-sm mb-0">
                                                {item?.soLuotDanhGia == 0 ? (
                                                  <span className="fst-italic">
                                                    Không có lượt đánh giá nào
                                                  </span>
                                                ) : (
                                                  <>
                                                    <span>
                                                      Số lượt đánh giá:{" "}
                                                    </span>
                                                    {item?.soLuotDanhGia}
                                                  </>
                                                )}
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
                                              <span className="text-xs font-weight-bold d-flex align-items-center  text-center">
                                                <FaUserPlus className="text-danger" />{" "}
                                                &nbsp; 1 hồ sơ mới
                                              </span>
                                            </td>
                                            <td className="text-center align-middle">
                                              <span>
                                                {item?.tinTuyenDung?.trangThai}
                                              </span>
                                            </td>
                                            <td
                                              className="text-center cursor-pointer align-middle pointer"
                                              onClick={(e) => {
                                                console.log("e", e);
                                              }}
                                            >
                                              <span className="text-xs font-weight-bold pointer">
                                                <FaEllipsisV />
                                              </span>
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
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
                        {/* <div className="col-12">
                          Showing {totalCount === 0 ? 0 : offset + 1} to{" "}
                          {offset + 10 > totalCount
                            ? totalCount
                            : offset + pageSize}{" "}
                          of {totalCount}
                        </div> */}
                        <div className="col-12">
                          <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-center">
                              <li
                                className={`page-item ${
                                  page <= 1 ? "disabled drop" : ""
                                }`}
                              >
                                <button
                                  type="button"
                                  className="page-link"
                                  disabled={page <= 1}
                                  onClick={() => {
                                    // prevPage();
                                  }}
                                >
                                  Trang truớc
                                </button>
                              </li>
                              <li
                                className={`page-item ${
                                  page >= totalCount ? "disabled drop" : ""
                                }`}
                              >
                                <button
                                  className="page-link"
                                  type="button"
                                  disabled={page >= totalCount}
                                  onClick={() => {
                                    // nextPage();
                                  }}
                                >
                                  Trang sau
                                </button>
                              </li>
                            </ul>
                          </nav>
                        </div>
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
    </Fragment>
  );
};
export default DashBoardQTV;
