import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const NavbarAdmin = props => {
  return (
    <Frag>
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
          <Menu.SubMenu title="Hồ sơ ứng tuyển" icon={<TeamOutlined />} key="3">
            <Link to="/employer/job/apply-job/all" />
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
    </Frag>
  );
}

NavbarAdmin.propTypes = {}

export default NavbarAdmin