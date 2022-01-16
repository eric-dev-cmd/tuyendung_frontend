import { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
const MainNavigation = () => {
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <i className="fas fa-code"></i> TOPLV
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
            style={{ fontSize: "14px" }}
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/ho-so" className="nav-link" aria-current="page">
                  Hồ sơ
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="tin-tuc" className="nav-link">
                  Tin tức
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/kham-pha" className="nav-link">
                  Khám phá
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  to="viec-lam"
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Việc Làm
                </NavLink>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <NavLink to="/tim-viec-lam" className="dropdown-item">
                      Tìm việc làm
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/viec-lam-ung-tuyen" className="dropdown-item">
                      Việc làm đã ứng tuyển
                    </NavLink>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <NavLink to="/viec-lam-da-luu" className="dropdown-item">
                      Việc làm đã lưu
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  to="/dang-nhap"
                  className="nav-link"
                  aria-current="page"
                >
                  Đăng nhập
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/dang-ky" className="nav-link">
                  Đăng ký
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="nha-tuyen-dung-dang-tin">
                  Nhà tuyển dụng đăng tin
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default MainNavigation;
