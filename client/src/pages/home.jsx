import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  // Function to get the user's location
  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location = {
              x: position.coords.latitude,
              y: position.coords.longitude,
            };
            resolve(location);
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error("Geolocation is not supported by this browser"));
      }
    });
  };

  const handleEmergency = async () => {
    if (!name || !phone) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      // Wait for the location to be fetched
      const location = await getUserLocation();

      // Capture the current time as a timestamp
      const time = new Date().toISOString(); // Full timestamp in ISO format

      // Send data to the backend
      const response = await axios.post("http://localhost:5000/api/data", {
        name,
        phone,
        locationX: location.x,
        locationY: location.y,
        time,
      });

      // Check for both 200 and 201 status codes
      if (response.status === 200 || response.status === 201) {
        // Navigate to the General Dashboard after successful submission
        navigate("/dashboard-general");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit emergency data.");
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-2xl mb-6">Emergency Center</h1>
      <div className="flex flex-col items-center w-full">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          className="mb-4 w-1/3 py-2 text-center border border-black rounded-md"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter your phone number"
          value={phone}
          className="mb-6 w-1/3 py-2 text-center border border-black rounded-md"
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <button
        onClick={handleEmergency}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        Emergency
      </button>
    </div>
  );
};

export default HomePage;
