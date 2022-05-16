import { Layout, Menu, Breadcrumb, Input, Tooltip, Button } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import React, { Fragment } from "react";
import { FaListUl, FaUserPlus } from "react-icons/fa";
import { GoSignOut } from "react-icons/go";
import { Link } from "react-router-dom";
import { Tabs } from "antd";
import { Select } from "antd";
import { GrFormRefresh } from "react-icons/gr";
import { FaEllipsisV } from "react-icons/fa";
import { Pagination } from "antd";

const { Option } = Select;

const { TabPane } = Tabs;
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const MainNavigationAdmin = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

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
              <Menu.Item key="2sub1">
                Quản lý tin
                <Link to="/employer/jobs" />
              </Menu.Item>
              <Menu.Item key="2sub2">
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
              <Menu.Item key="3sub1">
                Tất cả hồ sơ
                <Link to="/employer/job/apply-job/all" />
              </Menu.Item>
              <Menu.Item key="3sub2">
                Hồ sơ tiềm năng
                <Link to="/employer/job/apply-job/talent" />
              </Menu.Item>
              <Menu.Item key="3sub3">
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
                    defaultActiveKey="1"
                    onChange={(e) => {
                      console.log("key", e);
                    }}
                  >
                    <TabPane tab="Tất cả (1)" key="1">
                      <div className="row">
                        <div className="col-2">
                          <Input
                            className="form-control"
                            placeholder="Tên công việc"
                          />
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
                        <div className="col-1 me-3">
                          <Button
                            style={{ width: "120px" }}
                            className="d-flex align-items-center justify-content-center"
                            type="primary"
                            icon={<SearchOutlined />}
                          >
                            Tìm kiếm
                          </Button>
                        </div>
                        <div className="col-1 ms-3">
                          <Button
                            className="d-flex align-items-center justify-content-center"
                            type="primary"
                            // icon={<GrFormRefresh />}
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
                                  <thead>
                                    <tr>
                                      <th className="text-secondary opacity-7">
                                        <strong> ID</strong>
                                      </th>
                                      <th className="text-secondary opacity-7 ps-2">
                                        <strong> Tin tuyển dụng</strong>
                                      </th>
                                      <th className="text-secondary opacity-7 ps-2">
                                        <strong>Hồ sơ</strong>
                                      </th>
                                      <th className="text-secondary text-center opacity-7 ps-2 text-center">
                                        <strong> Trạng thái</strong>
                                      </th>
                                      <th className="text-secondary opacity-7 ps-2 text-center">
                                        <strong>Áp dụng dịch vụ</strong>
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>
                                        <p className="text-sm font-weight-bold mb-0">
                                          1
                                        </p>
                                      </td>
                                      <td>
                                        <p className="text-sm fw-bold mb-0">
                                          Nhân viên kinh doanh
                                        </p>
                                        <p className="text-sm mb-0">
                                          Hà Nội: Hoàn Kiếm, Ba Đình
                                        </p>
                                        <p className="address">
                                          <span className="created">
                                            Ngày tạo: 04-05-2022 23:17:44
                                          </span>
                                          &nbsp;
                                          <span className="apply-date">
                                            Hạn nộp: 04-05-2022
                                          </span>
                                        </p>
                                        <p>
                                          <Link to="job-detail/:slug">
                                            Xem tin đăng trên website
                                          </Link>
                                        </p>
                                      </td>
                                      <td>
                                        <span className="text-xs font-weight-bold d-flex align-items-center">
                                          <FaUserPlus className="text-danger" />{" "}
                                          &nbsp; 1 hồ sơ mới
                                        </span>
                                      </td>
                                      <td className="text-center">
                                        <Select
                                          defaultValue="Tuyển dụng"
                                          style={{ width: 120 }}
                                          onChange={(value) => {
                                            console.log("value", value);
                                          }}
                                        >
                                          <Option value="jack">
                                            Tuyển dụng
                                          </Option>
                                          <Option value="lucy">
                                            Dừng tuyển
                                          </Option>
                                          <Option value="Yiminghe">Xóa</Option>
                                        </Select>
                                      </td>
                                      <td
                                        className="text-center cursor-pointer"
                                        onClick={(e) => {
                                          console.log("e", e);
                                        }}
                                      >
                                        <span className="text-xs font-weight-bold">
                                          <FaEllipsisV />
                                        </span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <p className="text-sm font-weight-bold mb-0">
                                          1
                                        </p>
                                      </td>
                                      <td>
                                        <p className="text-sm fw-bold mb-0">
                                          Nhân viên kinh doanh
                                        </p>
                                        <p className="text-sm mb-0">
                                          Hà Nội: Hoàn Kiếm, Ba Đình
                                        </p>
                                        <p className="address">
                                          <span className="created">
                                            Ngày tạo: 04-05-2022 23:17:44
                                          </span>
                                          &nbsp;
                                          <span className="apply-date">
                                            Hạn nộp: 04-05-2022
                                          </span>
                                        </p>
                                        <p>
                                          <Link to="job-detail/:slug">
                                            Xem tin đăng trên website
                                          </Link>
                                        </p>
                                      </td>
                                      <td>
                                        <span className="text-xs font-weight-bold d-flex align-items-center">
                                          <FaUserPlus className="text-danger" />{" "}
                                          &nbsp; 1 hồ sơ mới
                                        </span>
                                      </td>
                                      <td className="text-center">
                                        <Select
                                          defaultValue="Tuyển dụng"
                                          style={{ width: 120 }}
                                          onChange={(value) => {
                                            console.log("value", value);
                                          }}
                                        >
                                          <Option value="jack">
                                            Tuyển dụng
                                          </Option>
                                          <Option value="lucy">
                                            Dừng tuyển
                                          </Option>
                                          <Option value="Yiminghe">Xóa</Option>
                                        </Select>
                                      </td>
                                      <td
                                        className="text-center cursor-pointer"
                                        onClick={(e) => {
                                          console.log("e", e);
                                        }}
                                      >
                                        <span className="text-xs font-weight-bold">
                                          <FaEllipsisV />
                                        </span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-12">
                          <Pagination
                            className="text-center"
                            defaultCurrent={1}
                            total={50}
                          />
                          ;
                        </div>
                      </div>
                    </TabPane>
                    <TabPane tab="Đang tuyển (2)" key="2">
                      Content of Tab Pane 2
                    </TabPane>
                    <TabPane tab="Chờ duyệt (3)" key="3">
                      Content of Tab Pane 3
                    </TabPane>
                    <TabPane tab="Dừng tuyển (4)" key="4">
                      Content of Tab Pane 3
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
export default MainNavigationAdmin;
