import "antd/dist/antd.min.css";
import { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { Route, Switch, useHistory, withRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import MainNavigation from "./components/layout/MainNavigation";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/ProfilePage";
import AccountSetupPage from "./pages/User/AccountSetupPage";
import ChangePasswordPage from "./pages/User/ChangePasswordPage";
import { FogotPasswordPage } from "./pages/User/FogotPasswordPage";
import ResetPasswordPage from "./pages/User/ResetPasswordPage";
import ProtectedRoute from "./routes/ProtectedRoute";

function App(props) {
  const history = useHistory();
  return (
    <Fragment>
      <Helmet>
        <title>
          123job.org - Tuyển dụng, việc làm 24h từ 50.000+ công ty uy tín hàng
          đầu tại Việt Nam
        </title>
      </Helmet>
      {/* {props.history.location.pathname !== "/login" ? : ""} */}
      {/* <section className="container my-3"> */}

      <Switch>
        {/* <Route path="/ho-so" component={Home} exact>
              <h1>Home</h1>
            </Route>
             <Route path="/viec-lam" component={Home} exact>
              <h1>Viec Lam</h1>
            </Route>
            <Route path="/tin-tuc" component={Home} exact>
              <h1>Tin Tuc</h1>
            </Route>
            <Route path="/kham-pha" component={Home} exact>
              <h1>Kham pha</h1>
            </Route>
            <Route path="/nha-tuyen-dung-dang-tin" component={Home} exact>
              <h1>Nhà tuyển dụng đăng tin</h1>
            </Route>*/}
        <Route path="/" component={Home} exact />
        <Route exact path="/login" component={Login} />
        <Route exact path="/sign-up" component={Register} />
        <Route exact path="/forgot-password" component={FogotPasswordPage} />
        <ProtectedRoute
          exact
          path="/user/account/password"
          component={ChangePasswordPage}
        />
        <ProtectedRoute
          exact
          path="/user/account"
          component={AccountSetupPage}
        />
        <Route
          exact
          path="/auth/verified/:token"
          component={ResetPasswordPage}
        />
        <ProtectedRoute exact path="/ho-so" component={ProfilePage} />
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      {/* </section> */}
      {/* </Layout> */}
      <ToastContainer autoClose={2000} hideProgressBar={true} />
      {/* Footer */}
    </Fragment>
  );
}

export default withRouter(App);
