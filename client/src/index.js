import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Landing from "./components/Landing";
import LogIn from "./features/auth/components/Login";
import "./App.css";

import "bootswatch/dist/sandstone/bootstrap.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route index element={<Landing />} />
        <Route path="login" element={<LogIn />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
