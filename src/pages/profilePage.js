import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import MainNavigation from "../components/Layout/MainNavigation";
import { Layout, Menu } from "antd";
const { Header, Footer, Sider, Content } = Layout;
const ProfilePage = () => {
  const currentUser = useSelector((state) => state.userLogin.userInfor);
  console.log("currentUser", currentUser);
  // const [user, setUser] = useState({});
  // useEffect(() => {
  //   if (currentUser) {
  //     setUser(currentUser.taiKhoan);
  //   }
  // }, [currentUser]);
  // console.log("AAAA", user);
  return (
    <Fragment>
      <MainNavigation />

      {/* <ul>
        <li>{email}</li>
        <li>{tenDangNhap}</li>
        <li>{loaiTaiKhoan}</li>
        <li>{ngayTao}</li>
      </ul> */}
    </Fragment>
  );
};

export default ProfilePage;
