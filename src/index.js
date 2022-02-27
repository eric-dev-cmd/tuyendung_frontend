import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import { ToastProvider } from "react-toast-notifications";
import "react-toastify/dist/ReactToastify.css";
import { AUTO_DISMISS_TIMEOUT } from "./constansts/common";

ReactDOM.render(
  <Provider store={store}>
    <ToastProvider
      // autoDismiss
      // autoDismissTimeout={AUTO_DISMISS_TIMEOUT}
      // placement="top-right"
      // pauseOnFocusLoss
      // draggable
      // pauseOnHover
      // rtl={false}
      // closeOnClick
      // hideProgressBar={true}
      // newestOnTop={false}
      position="top-right"
      autoClose={2000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ToastProvider>
  </Provider>,

  document.getElementById("root")
);
