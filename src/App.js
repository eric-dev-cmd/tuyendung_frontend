import { Fragment } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";
import NotFound from "./pages/NotFound";
import "./App.css";
import Home from "./components/home/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
function App() {
  return (
    <Fragment>
      <Layout>
        <Route path="/" exact>
          <Redirect to="/" />
        </Route>
        <Route exact path="/" component={Home}></Route>
        <section className="container my-3">
          <Switch>
            <Route path="/ho-so" component={Home} exact>
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
            <Route path="/dang-nhap" component={Login} exact></Route>
            <Route path="/dang-ky" component={Register} exact></Route>
            <Route path="/nha-tuyen-dung-dang-tin" component={Home} exact>
              <h1>Nhà tuyển dụng đăng tin</h1>
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </section>
      </Layout>
    </Fragment>
  );
}

export default App;
