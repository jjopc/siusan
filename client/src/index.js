import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./state/store";
import { PersistGate } from "redux-persist/integration/react";
import axios from "axios";

import App from "./App";
import Landing from "./components/Landing";
import LogIn from "./features/auth/components/Login";
import "./App.css";

import "bootswatch/dist/sandstone/bootstrap.css";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route index element={<Landing />} />
            <Route path="login" element={<LogIn />} />
          </Routes>
        </PersistGate>
      </Provider>
    </HashRouter>
  </React.StrictMode>
);
