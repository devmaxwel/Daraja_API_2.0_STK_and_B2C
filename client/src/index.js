import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Confirm from "./components/pages/confirm";
import Cancel from "./components/pages/cancel";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route element={<App />} path="/" />
        <Route element={<Confirm />} path="/success" />
        <Route element={<Cancel />} path="/cancel" />
      </Routes>
    </Router>
  </React.StrictMode>
);
