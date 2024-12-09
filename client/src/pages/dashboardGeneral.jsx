import React, { useEffect, useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

const GeneralDashboard = () => {
  const [data, setData] = useState([]);
  const [selectedDashboard, setSelectedDashboard] = useState({});
  // const navigate = useNavigate();

  // Calculate elapsed time based on current time and created_time
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
          setData(response.data);
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
            row.time
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

  const handleDashboardSelection = (id, dashboard) => {
    setSelectedDashboard((prev) => ({ ...prev, [id]: dashboard }));
  };

  const handleUpdate = async (row) => {
    const targetDashboard = selectedDashboard[row.id];

    if (!targetDashboard) {
      alert("Please select a dashboard.");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/data/${row.id}`, {
        dashboard: targetDashboard,
      });

      setData((prevData) => prevData.filter((item) => item.id !== row.id));
      // navigate(`/${targetDashboard.toLowerCase()}`);
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Failed to update dashboard. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>General Dashboard</h1>
      <table border="1" style={{ width: "100%", textAlign: "center" }}>
        <thead>
          <tr>
            <th>Timer</th>
            <th>Name</th>
            <th>Location</th>
            <th>Phone Number</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.timer || "Calculating..."}</td>
              <td>{row.name}</td>
              <td>
                {row.locationx}, {row.locationy}
              </td>
              <td>{row.phone}</td>
              <td>{new Date(row.created_time).toLocaleString()}</td>
              <td>
                <select
                  value={selectedDashboard[row.id] || ""}
                  onChange={(e) =>
                    handleDashboardSelection(row.id, e.target.value)
                  }
                >
                  <option value="">Select</option>
                  <option value="dashboardA">Dashboard A</option>
                  <option value="dashboardB">Dashboard B</option>
                </select>
                <button
                  onClick={() => handleUpdate(row)}
                  style={{ marginLeft: "10px" }}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GeneralDashboard;
