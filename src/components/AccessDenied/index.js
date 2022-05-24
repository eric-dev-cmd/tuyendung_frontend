import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

const AccessDenied = (props) => {
  return (
    <Fragment>
      <>
        <Helmet>
          <title>403 Access Denied</title>
        </Helmet>
        <div className="login-wrapper d-flex justify-content-center py-4 my-5">
          <div className="bg-login mt-3" style={{ width: "35%" }}>
            <div
              className="card text-white mb-3"
              style={{ maxWidth: "100%", background: "#d4edda" }}
            >
              <div className="card-body">
                <p
                  className="card-text text-center"
                  style={{ color: "danger" }}
                >
                  403 - Bạn không có quyền truy cập vào trang này
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    </Fragment>
  );
};

AccessDenied.propTypes = {};

export default AccessDenied;
