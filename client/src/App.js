import "./App.css";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import GeneralDashboard from "./pages/dashboardGeneral";
import DashboardA from "./pages/dashboardA";
import DashboardB from "./pages/dashboardB";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard-general" element={<GeneralDashboard />} />
        <Route path="/dashboardA" element={<DashboardA />} />
        <Route path="/dashboardB" element={<DashboardB />} />
      </Routes>
    </Router>
  );
}

export default App;
