import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import MainNavigation from "../components/Layout/MainNavigation";
import { Breadcrumb, Layout, Menu } from "antd";
const { Header, Footer, Sider, Content } = Layout;
const ProfilePage = () => {
  const currentUser = useSelector((state) => state.userLogin.userInfor);
  console.log("currentUser", currentUser);

  return (
    <Fragment>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={new Array(15).fill(null).map((_, index) => {
              const key = index + 1;
              return {
                key,
                label: `nav ${key}`,
              };
            })}
          />
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-content">Content</div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Fragment>
  );
};

export default ProfilePage;
