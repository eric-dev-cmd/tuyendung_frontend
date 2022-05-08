import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import MainNavigation from "../components/Layout/MainNavigation";
import { Breadcrumb, Layout, Menu } from "antd";
import { Helmet } from "react-helmet";
const { Header, Footer, Sider, Content } = Layout;
const ProfilePage = () => {
  const currentUser = useSelector((state) => state.userLogin.userInfor);
  console.log("currentUser", currentUser);

  return (
    <Fragment>
      <Helmet>
        <title>Hồ sơ của tôi| 123job.org</title>
      </Helmet>
      <MainNavigation />
    </Fragment>
  );
};

export default ProfilePage;
