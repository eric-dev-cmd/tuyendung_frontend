import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { GoSignOut } from "react-icons/go";
import { FaListUl } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../../../../redux/actions/authActions";
import { toast } from "react-toastify";
const { Header, Content, Footer, Sider } = Layout;

const NavbarQTV = (props) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.reload();
    toast.success("Đăng xuất thành công", {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <Fragment>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline">
          <Menu.Item
            icon={<DesktopOutlined />}
            defaultSelectedKeys={["1"]}
            key="1"
          >
            Trang chủ
            <Link to="/admin/dashboard" />
          </Menu.Item>
          <Menu.Item icon={<DesktopOutlined />} key="2">
            Quản lý tin đăng tuyển
            <Link to="/admin/dashboard" />
          </Menu.Item>

          <Menu.SubMenu
            title="Quản lý tài khoản"
            icon={<TeamOutlined />}
            key="sub2"
          >
            <Menu.Item icon={<DesktopOutlined />} key="3">
              Nhà tuyển dụng
              <Link to="/admin/employers" />
            </Menu.Item>
            <Menu.Item icon={<DesktopOutlined />} key="4">
              Ứng tuyển viên
              <Link to="/admin/candidates" />
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item icon={<DesktopOutlined />} key="5">
            Quản lý ngành nghề
            <Link to="/admin/management-career" />
          </Menu.Item>
          <Menu.Item icon={<DesktopOutlined />} key="6">
            Quản lý lĩnh vực
            <Link to="/admin/management-field" />
          </Menu.Item>
          <Menu.Item icon={<GoSignOut />} key="7" onClick={logoutHandler}>
            Đăng xuất
            <Link to="/" />
          </Menu.Item>
        </Menu>
      </Sider>
    </Fragment>
  );
};

NavbarQTV.propTypes = {};

export default NavbarQTV;
