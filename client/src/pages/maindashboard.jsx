import React from "react";
import { useNavigate } from "react-router-dom";

const Maindashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-10">Main Dashboard</h2>
      <div className="flex flex-wrap gap-4 justify-center max-w-screen-lg mx-auto">
        {/* Button to navigate to General Dashboard */}
        <button
          className="w-1/2 px-6 py-3 text-lg bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={() => navigate("/dashboard-general")}
        >
          Emergency trigger Dashboard
        </button>
        {/* Button to navigate to Station-Wise Dashboard */}
        <button
          className="w-1/2 px-6 py-3 text-lg bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={() => navigate("/dashboard-stationWise")}
        >
          Station-Wise Dashboard
        </button>
        {/* Button to navigate to Emergency Station Assessing */}
        <button
          className="w-1/2 px-6 py-3 text-lg bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={() => navigate("/dashboard-stationAccessing")}
        >
          Emergency Station Assigning
        </button>
        {/* Button to navigate to Station Officer Assessing */}
        <button
          className="w-1/2 px-6 py-3 text-lg bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={() => navigate("/dashboard-officerAccessing")}
        >
          Station Officer Assigning
        </button>
      </div>
    </div>
  );
};

export default Maindashboard;
