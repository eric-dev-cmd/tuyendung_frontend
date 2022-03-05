import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...restOfProps }) => {
  const isAuthenticated = useSelector(
    (state) => state.userLogin.isAuthenticated
  );
  console.log("isAuthenticated::", isAuthenticated);
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/dang-nhap" />
        )
      }
    />
  );
};

export default ProtectedRoute;
