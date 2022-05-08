import "antd/dist/antd.min.css";
import { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Route, Switch, useHistory, withRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ProductDetail from "./features/Product/pages/ProductDetail";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/ProfilePage";
import AccountSetupPage from "./pages/User/AccountSetupPage";
import ChangePasswordPage from "./pages/User/ChangePasswordPage";
import { FogotPasswordPage } from "./pages/User/FogotPasswordPage";
import JobDetailPage from "./pages/User/JobDetailPage";
import ResetPasswordPage from "./pages/User/ResetPasswordPage";
import ProtectedRoute from "./routes/ProtectedRoute";

function App(props) {
  return (
    <Fragment>
      <Helmet>
        <title>
          123job.org - Tuyển dụng, việc làm 24h từ 50.000+ công ty uy tín hàng
          đầu tại Việt Nam
        </title>
      </Helmet>

      <Switch>
        <Route path="/" component={Home} exact />
        <Route exact path="/login" component={Login} />
        <Route exact path="/sign-up" component={Register} />
        <Route exact path="/forgot-password" component={FogotPasswordPage} />
        <Route exact path="/jobboard/:jobId" component={JobDetailPage} />
        <Route exact path="/:slug" component={ProductDetail} />

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
        <ProtectedRoute exact path="/user/profile" component={ProfilePage} />
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      {/* </section> */}
      {/* </Layout> */}
      <ToastContainer autoClose={1000} hideProgressBar={true} />
      {/* Footer */}
    </Fragment>
  );
}

export default withRouter(App);
