import axios from "axios";
import React, { useEffect, useState } from "react";

const StationOfficerAssign = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async (req, res) => {
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

  return (
    <div>
      <h1 className="text-2xl text-center mt-2 mb-20">
        Station Officer Assign
      </h1>
      <div className="">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Incident Id</th>
              <th className="px-6 py-3 text-left">User Id</th>
              {/* stay wich station , when the user update the emergency */}
              <th className="px-6 py-3 text-left">Station Id</th>
              <th className="px-6 py-3 text-left">Date and Time</th>
              {/* office who assign for emergency */}
              <th className="px-6 py-3 text-left">officer</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data) => (
              <tr key={data.emergency_id}>
                <td className="px-6 py-4">{data.id}</td>
                <td className="px-6 py-4">{data.user_id}</td>
                <td className="px-6 py-4">{/*station id*/}</td>
                <td className="px-6 py-4">{data.created_time}</td>
                {/* office who assign for emergency */}
                <td className="px-6 py-4">{data.officer_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StationOfficerAssign;
