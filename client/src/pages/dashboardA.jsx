import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const DashboardA = () => {
  const [data, setData] = useState([]);
  const [selectedOfficerId, setSelectedOfficerId] = useState("");
  const [isAlertVisible, setAlertVisible] = useState(false);
  const audio = useRef(new Audio("/alert.mp3"));
  const previousDataCount = useRef(0);
  const previousData = useRef([]);

  const calculateElapsedTime = (updatedTime) => {
    const total = Date.parse(new Date()) - Date.parse(updatedTime);
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return { total, hours, minutes, seconds };
  };

  // Fetch data and handle logic for new rows
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/data");
      if (response.status === 200) {
        // Filter for only records that belong to DashboardA
        const dashboardAData = response.data.filter(
          (row) =>
            row.dashboard === "dashboardA" &&
            (row.officer_id === "" || row.officer_id === null)
        );
        setData(dashboardAData);

        // Check for new rows
        if (dashboardAData.length > previousDataCount.current) {
          // New rows detected
          audio.current.play().catch((error) => {
            console.error("Audio playback error: ", error);
          });
          if (!isAlertVisible) {
            // Ensure the alert only shows when it's not already visible
            setAlertVisible(true); // Show alert/modal
          }

          // Update previous data count only if the new rows have been processed
          previousDataCount.current = dashboardAData.length;
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to load data. Please try again.");
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch

    const interval = setInterval(() => {
      fetchData(); // Fetch again every 30 seconds
    }, 30000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []); // Empty dependency array ensures this effect only runs once

  useEffect(() => {
    if (isAlertVisible) {
      // Automatically hide the alert after 5 seconds
      const timer = setTimeout(() => {
        setAlertVisible(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isAlertVisible]);

  const handleAlertClose = () => {
    audio.current.pause();
    audio.current.currentTime = 0;
    setAlertVisible(false);
  };

  const handleAssignOfficer = async (id) => {
    if (!selectedOfficerId) {
      alert("Please select an officer.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/data/assign-officer/${id}`,
        { officer_id: selectedOfficerId }
      );

      if (response.status === 200) {
        setData((prevData) =>
          prevData.map((row) =>
            row.id === id ? { ...row, officer_id: selectedOfficerId } : row
          )
        );

        alert("Officer assigned successfully.");
        window.location.reload();
      }
    } catch (error) {
      console.log("Error assigning officer:", error);
      alert("Failed to assign officer.");
    }
  };

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
      <h1 className="text-3xl font-bold text-center mb-8">Dashboard A</h1>

      {isAlertVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">New Record Added!</h2>
            <p className="mb-6">A new row has been added to the table.</p>
            <button
              onClick={handleAlertClose}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-separate border-spacing-0">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Timer</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Location</th>
              <th className="px-6 py-3 text-left">Phone Number</th>
              <th className="px-6 py-3 text-left">Updated Time</th>
              <th className="px-6 py-3 text-left">Assign Officer</th>
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
                <td className="px-6 py-4">
                  <input
                    type="text"
                    placeholder="Enter officer_id"
                    onChange={(e) => setSelectedOfficerId(e.target.value)}
                  />
                  <button
                    className="border border-black px-2 rounded-lg"
                    onClick={() => handleAssignOfficer(row.id)}
                  >
                    Assign
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

export default DashboardA;
