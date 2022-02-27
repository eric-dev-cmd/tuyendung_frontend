import { Fragment } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Layout from "./components/layout/layout";
import NotFound from "./pages/notFound";
import Home from "./pages/home";
import "./App.css";
// import Home from "./components/home/home";
import Login from "./components/auth/Login";
import Footer from "./components/footer/footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import authService from "./services/authService";
import { getUserByToken } from "./redux/actions/authActions";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProfilePage from "./pages/profilePage";
import Register from "./components/auth/Register";
import "antd/dist/antd.css";

function App() {
  return (
    <Fragment>
      <Layout>
        <section className="container my-3">
          <Switch>
            <Route path="/" component={Home} exact></Route>
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
            <Route path="/dang-ky" component={Register} exact></Route>
            <Route path="/dang-nhap" component={Login} exact></Route>
            <ProtectedRoute path="/ho-so" component={ProfilePage} />
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </section>
      </Layout>
      <ToastContainer autoClose={2000} hideProgressBar={true} />
      {/* Footer */}
      <Footer />
    </Fragment>
  );
}

export default App;
