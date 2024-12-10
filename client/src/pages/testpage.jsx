import React, { useState } from "react";

const TestPage = () => {
  // Dummy data without section values
  const [data, setData] = useState([
    { id: 1, name: "John Doe", phone: "123-456-7890" },
    { id: 2, name: "Jane Smith", phone: "987-654-3210" },
    { id: 3, name: "Alice Johnson", phone: "555-666-7777" },
  ]);

  const sections = ["A", "B", "C", "D"]; // Options for the dropdown

  // Handle the update button click
  const handleUpdate = (id, selectedSection) => {
    alert(`Updated ID ${id} to section ${selectedSection}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        React Table with Dropdown
      </h1>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Phone
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Section
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{item.id}</td>
              <td className="border border-gray-300 px-4 py-2">{item.name}</td>
              <td className="border border-gray-300 px-4 py-2">{item.phone}</td>
              <td className="border border-gray-300 px-4 py-2">
                <select
                  onChange={(e) =>
                    setData((prevData) =>
                      prevData.map((row) =>
                        row.id === item.id
                          ? { ...row, section: e.target.value }
                          : row
                      )
                    )
                  }
                  defaultValue=""
                  className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="" disabled>
                    Select Section
                  </option>
                  {sections.map((sec) => (
                    <option key={sec} value={sec}>
                      {sec}
                    </option>
                  ))}
                </select>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() =>
                    handleUpdate(
                      item.id,
                      data.find((row) => row.id === item.id)?.section ||
                        "Not Selected"
                    )
                  }
                  className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
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

export default TestPage;
