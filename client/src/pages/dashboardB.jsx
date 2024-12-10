import React, { useEffect, useState } from "react";
import axios from "axios";

const DashboardB = () => {
  const [data, setData] = useState([]);

  // Calculate the elapsed time between the current time and the updated_time
  const calculateElapsedTime = (updatedTime) => {
    const total = Date.parse(new Date()) - Date.parse(updatedTime);
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return { total, hours, minutes, seconds };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/data/dashboardB"
        );
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) =>
        prevData.map((row) => {
          const { total, hours, minutes, seconds } = calculateElapsedTime(
            row.updated_time
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

  return (
    <div className="p-6 bg-white text-black">
      <h1 className="text-3xl font-bold text-center mb-8">Dashboard B</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-separate border-spacing-0">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left border-b">Timer</th>
              <th className="px-6 py-3 text-left border-b">Name</th>
              <th className="px-6 py-3 text-left border-b">Location</th>
              <th className="px-6 py-3 text-left border-b">Phone Number</th>
              <th className="px-6 py-3 text-left border-b">Updated Time</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="border-t hover:bg-gray-100">
                <td className="px-6 py-4">{row.timer || "Calculating..."}</td>
                <td className="px-6 py-4">{row.name}</td>
                <td className="px-6 py-4">
                  {row.locationx}, {row.locationy}
                </td>
                <td className="px-6 py-4">{row.phone}</td>
                <td className="px-6 py-4">
                  {new Date(row.updated_time).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardB;
