import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from "./components/ErrorBoundary";
import "./i18n";
import GlobalStyles from "./components/GlobalStyles";
import CommonProvider from "./components/Search/context/commonContext";
import ProductProvider from "./features/Product/context/ProductContext";
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ErrorBoundary>
        <GlobalStyles>
          <CommonProvider>
            <ProductProvider>
              <App />
            </ProductProvider>
          </CommonProvider>
        </GlobalStyles>
      </ErrorBoundary>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
