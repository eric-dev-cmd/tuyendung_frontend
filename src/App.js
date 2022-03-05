import { Fragment } from "react";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import "./App.css";
import Login from "./components/auth/Login";
import Footer from "./components/footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";
import Register from "./components/auth/Register";
import "antd/dist/antd.min.css";
import { Helmet } from "react-helmet";
import MainNavigation from "./components/layout/MainNavigation";
import { FogotPasswordPage } from "./pages/User/FogotPasswordPage";
import ResetPasswordPage from "./pages/User/ResetPasswordPage";

function App() {
  return (
    <Fragment>
      <Helmet>
        <title>
          123job.org - Tuyển dụng, việc làm 24h từ 50.000+ công ty uy tín hàng
          đầu tại Việt Nam
        </title>
      </Helmet>
      <MainNavigation />
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
        <Route exact path="/dang-nhap" component={Login} />
        <Route exact path="/dang-ky" component={Register} />
        <Route exact path="/quen-mat-khau" component={FogotPasswordPage} />
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
      <Footer />
    </Fragment>
  );
}

export default App;
