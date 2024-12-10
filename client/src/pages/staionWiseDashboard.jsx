import React from "react";
import { useNavigate } from "react-router-dom";

const StaionWiseDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="">
      <h1 className="text-center text-2xl text-blue-900 mb-20">
        Station Wise Dashboard
      </h1>
      <div className="flex flex-wrap gap-4 justify-center">
        {/* Button to navigate to Station(dashboard) A */}
        <button
          className="w-1/4 border text-center border-black"
          onClick={() => navigate("/dashboardA")}
        >
          Dashboard A
        </button>
        {/* Button to navigate to Station(dashboard) B */}
        <button
          className="w-1/4 border border-black"
          onClick={() => navigate("/dashboardB")}
        >
          Dashboard b
        </button>
      </div>
    </div>
  );
};

export default StaionWiseDashboard;
