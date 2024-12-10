import "./App.css";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import GeneralDashboard from "./pages/dashboardGeneral";
import DashboardA from "./pages/dashboardA";
import DashboardB from "./pages/dashboardB";
import Maindashboard from "./pages/maindashboard";

import StaionWiseDashboard from "./pages/staionWiseDashboard";
import EmergencyStationAssingDashboard from "./pages/emergencyStationAssignDashboard";
import StationOfficerAssign from "./pages/stationOfficerAssign";
import TestPage from "./pages/testpage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard-general" element={<GeneralDashboard />} />
        <Route path="/dashboardA" element={<DashboardA />} />
        <Route path="/dashboardB" element={<DashboardB />} />
        <Route path="/dashboard-main" element={<Maindashboard />} />
        <Route
          path="/dashboard-stationAccessing"
          element={<EmergencyStationAssingDashboard />}
        />
        <Route
          path="/dashboard-stationWise"
          element={<StaionWiseDashboard />}
        />
        <Route
          path="/dashboard-officerAccessing"
          element={<StationOfficerAssign />}
        />
        <Route path="/testpage" element={<TestPage />} />
      </Routes>
    </Router>
  );
}

export default App;
