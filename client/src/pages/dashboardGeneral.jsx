import React, { useEffect, useState } from "react";
import axios from "axios";

const GeneralDashboard = () => {
  const [data, setData] = useState([]);

  const calculateElapsedTime = (createdTime) => {
    const total = Date.parse(new Date()) - Date.parse(createdTime);
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return { total, hours, minutes, seconds };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/data");
        if (response.status === 200) {
          const filterData = response.data.filter(
            (row) => row.dashboard === "" || row.dashboard === null
          );
          setData(filterData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to load data. Please try again.");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) =>
        prevData.map((row) => {
          const { total, hours, minutes, seconds } = calculateElapsedTime(
            row.created_time
          );

          if (total <= 0) {
            return { ...row, timer: "Expired" };
          }

          return {
            ...row,
            timer: `${hours > 9 ? hours : "0" + hours}:${
              minutes > 9 ? minutes : "0" + minutes
            }:${seconds > 9 ? seconds : "0" + seconds}`,
          };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleDropdownChange = (id, value) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, dashboard: value } : row
      )
    );
  };

  const handleUpdate = async (row) => {
    console.log(row.dashboard);
    if (!row.dashboard) {
      alert("Please select a dashboard.");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/data/${row.id}`, {
        dashboard: row.dashboard,
      });

      setData((prevData) => prevData.filter((item) => item.id !== row.id));
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Failed to update dashboard. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-3xl font-semibold text-center mb-6">
        General Dashboard
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Timer</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Location</th>
              <th className="px-6 py-3 text-left">Phone Number</th>
              <th className="px-6 py-3 text-left">Time</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map((row) => (
              <tr key={row.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4">{row.timer || "Calculating..."}</td>
                <td className="px-6 py-4">{row.name}</td>
                <td className="px-6 py-4">
                  {row.locationx}, {row.locationy}
                </td>
                <td className="px-6 py-4">{row.phone}</td>
                <td className="px-6 py-4">
                  {new Date(row.created_time).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <select
                    value=""
                    onChange={(e) =>
                      handleDropdownChange(row.id, e.target.value)
                    }
                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="dashboardA">Dashboard A</option>
                    <option value="dashboardB">Dashboard B</option>
                  </select>
                  <button
                    onClick={() => handleUpdate(row)}
                    className="ml-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GeneralDashboard;
