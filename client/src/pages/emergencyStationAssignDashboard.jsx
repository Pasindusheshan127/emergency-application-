import axios from "axios";
import React, { useEffect, useState } from "react";

const EmergencyStationAssingDashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/data");
        if (response.status === 200) {
          const filteredData = response.data.filter(
            (item) => item.dashboard !== "" && item.dashboard !== null
          );
          setData(filteredData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to load data. Please try again.");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="">
        <h1 className="text-2xl text-center mt-2 mb-20">
          Emergency Station Assigning
        </h1>
        <div className="">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Incident Id</th>
                <th className="px-6 py-3 text-left">User Id</th>
                <th className="px-6 py-3 text-left">Date and Time</th>
                {/* which police station is assign for emergency */}
                <th className="px-6 py-3 text-left">Dashboard</th>
              </tr>
            </thead>
            <tbody className="">
              {data.map((row) => (
                <tr key={row.id}>
                  <td className="px-6 py-4 ">{row.id}</td>
                  <td className="px-6 py-4 ">{row.user_id}</td>
                  <td className="px-6 py-4 ">{row.updated_time}</td>
                  <td className="px-6 py-4 ">{row.dashboard}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmergencyStationAssingDashboard;
