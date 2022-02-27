import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...restOfProps }) => {
  const user = useSelector((state) => state.userLogin.userInfo);
  const user1 = useSelector((state) => state.userLogin);
  return (
    <Route
      //   {...restOfProps}
      //   render={(props) =>
      //     user ? <Component {...props} /> : <Redirect to="/dang-nhap" />
      //   }
      {...restOfProps}
      render={(props) => {
        if (!localStorage.getItem("user")) {
          // not logged in so redirect to login page with the return url
          return <Redirect to={{ pathname: "/dang-nhap" }} />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default ProtectedRoute;
