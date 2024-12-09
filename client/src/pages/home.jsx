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
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Home Page</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ margin: "10px", padding: "10px", width: "200px" }}
      />
      <br />
      <input
        type="text"
        placeholder="Enter your phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ margin: "10px", padding: "10px", width: "200px" }}
      />
      <br />
      <button onClick={handleEmergency} style={{ padding: "10px 20px" }}>
        Emergency
      </button>
    </div>
  );
};

export default HomePage;
