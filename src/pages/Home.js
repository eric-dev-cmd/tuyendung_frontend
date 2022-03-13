import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.userLogin.userInfor);
  const dispatch = useDispatch();
  return (
    <Fragment>
      <Helmet>
        <title>Trang chủ | 123job.org</title>
      </Helmet>
      <div>
        <h1 className="text-danger">Trang chủ ứng tuyển viên</h1>
      </div>
    </Fragment>
  );
};

export default Home;
