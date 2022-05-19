import {
  Layout,
  Menu,
  Breadcrumb,
  Input,
  Tooltip,
  Button,
  Divider,
  List,
  Typography,
} from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import React, { Fragment, useEffect, useState } from "react";
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
import TextArea from "antd/lib/input/TextArea";
import FormPostNew1 from "./components/forms/FormPostNew1";
import FormPostNew2 from "./components/forms/FormPostNew2";
import FormPostNew3 from "./components/forms/FormPostNew3";

const { Option } = Select;

const { TabPane } = Tabs;
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const NewJob = () => {
  const [isHideForm1, setIsHideForm1] = useState(false);
  const [isHideForm2, setIsHideForm2] = useState(false);
  const [isHideForm3, setIsHideForm3] = useState(false);
  const [isHideForm4, setIsHideForm4] = useState(false);
  const [isHideForm5, setIsHideForm5] = useState(false);
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

  const onHandleHideForm1 = () => {
    console.log(isHideForm1);
    setIsHideForm1(true);
    setIsHideForm2(false);
  };
  const onHandleShowForm1 = () => {
    console.log(isHideForm1);
    setIsHideForm1(false);
  };
  const onHandleHideForm2 = () => {
    console.log(isHideForm1);
    setIsHideForm2(true);
  };
  const onHandleShowForm2 = () => {
    console.log(isHideForm1);
    setIsHideForm2(false);
  };
  const onHandleChangeType = (value) => {
    setType(value);
  };
  const [value, setValue] = useState(0);

  const getListData = async (pg = page, pgSize = pageSize) => {
    try {
      const params = {
        page: pg,
        limit: 5,
      };
      console.log("params", params);

      const response = await RecruitmentApi.getListRecruitmentFilterParams(
        params
      );
      console.log("response:::", response);
      setRecruitments(response.data);
      setTotalCount(response.pagination.total);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    let mounted = true;
    const getDataListFilters = async () => {
      const requestUrl = `http://localhost:4000/tinTuyenDungs/timKiemTheoNhieuTieuChi?${paramsString}`;
      try {
        const response = await axios.get(requestUrl);
        console.log("responseresponse", response.data.data);
        setRecruitments(response.data.data);
        setTotalCount(response.pagination.total);
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

  useEffect(() => {
    getListData();
  }, [page]);

  const prevPage = async () => {
    const pg = page === 1 ? 1 : page - 1;
    getListData(pg);
    setPage(pg);
  };
  const nextPage = async () => {
    const pg = page < Math.ceil(totalCount / pageSize) ? page + 1 : page;
    getListData(pg);
    setPage(pg);
  };
  const handleFiltersChange = (newFilters) => {
    console.log("New filters: ", newFilters);
    setFilters({
      ...filters,
      page: 1,
      tieuDe: newFilters.searchTerm,
    });
  };
  const [isShow, setIsShow] = useState(false);
  const [isHide, setIsHide] = useState(false);
  const [placeWorks, setPLaceWorks] = useState();

  useEffect(() => {
    let mounted = true;
    const getDataListLocation = async () => {
      const requestUrl = `https://provinces.open-api.vn/api/?depth=2`;
      try {
        const response = await axios.get(requestUrl);
        console.log("responseresponse", response.data.data);
        setPLaceWorks(response.data.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    if (mounted) {
      getDataListLocation();
    }
    return () => {
      mounted = false;
      setRecruitments([]);
    };
  }, []);
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
              <Link to="/employer/dashboard" />
            </Menu.Item>
            <Menu.SubMenu title="Tin tuyển dụng" icon={<FaListUl />} key="2">
              <Menu.Item key="21">
                Quản lý tin
                <Link to="/employer/dashboard" />
              </Menu.Item>
              <Menu.Item key="22">
                Thêm mới tin
                <Link to="/employer/job/create" />
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              title="Hồ sơ ứng tuyển"
              icon={<TeamOutlined />}
              key="3"
            >
              <Link to="/employer/job/create" />
              <Menu.Item key="31">
                Tất cả hồ sơ
                <Link to="/employer/job/apply-job/all" />
              </Menu.Item>
              <Menu.Item key="32">
                Hồ sơ tiềm năng
                <Link to="/employer/job/apply-job/talent" />
              </Menu.Item>
              <Menu.Item key="33">
                Mới ứng tuyển
                <Link to="/employer/job/apply-job/new" />
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.Item icon={<DesktopOutlined />} key="4">
              Thông tin công ty
              <Link to="/employer/account/profile" />
            </Menu.Item>
            <Menu.Item icon={<GoSignOut />} key="5">
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
              <Breadcrumb.Item>Thêm mới tin</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background bg-white"
              style={{
                padding: 24,
                minHeight: 560,
              }}
            >
              {/* Tiêu đề tin tuyển dụng */}

              <FormPostNew1
                onHandleHideForm1={onHandleHideForm1}
                onHandleShowForm1={onHandleShowForm1}
              />

              {/* Thông tin công việc */}
              <FormPostNew2 onHandleHideForm1={onHandleHideForm1} />
              {/* Thông tin công việc */}
              <FormPostNew3 />
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
export default NewJob;
