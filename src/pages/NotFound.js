import React, { Fragment } from "react";
import MainNavigation from "../components/layout/MainNavigation";
import NotFoundPage from "../components/notFoundPage/NotFoundPage";

const NotFound = () => {
  return (
    <Fragment>
            <MainNavigation />

      <NotFoundPage />
    </Fragment>
  );
};

export default NotFound;
