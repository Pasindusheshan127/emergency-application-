const pool = require("../models/db");

// Insert a new record
const createEmergency = async (req, res) => {
  const { name, phone, locationX, locationY } = req.body;
  // console.log(req.body);

  const time = new Date();

  try {
    const result = await pool.query(
      "INSERT INTO emergency (name, phone, locationX, locationY, created_time) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, phone, locationX, locationY, time]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to insert data" });
  }
};

// Fetch all records
const getEmergencies = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM emergency ORDER BY created_time DESC"
    );
    res.status(200).json(result.rows); // Ensure 'timer' is part of this response
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

// Fetch records for dashboardA
const getDashboardAData = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM emergency WHERE dashboard = 'dashboardA' ORDER BY created_time DESC"
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch dashboardA data" });
  }
};

// Fetch records for dashboardB
const getDashboardBData = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM emergency WHERE dashboard = 'dashboardB' ORDER BY created_time DESC"
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch dashboardB data" });
  }
};

// Delete a record
const deleteEmergency = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM emergency WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Record not found" });
    }
    res.status(200).json({ message: "Record deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to delete data" });
  }
};

// Update a record's dashboard
const updateEmergencyDashboard = async (req, res) => {
  const { id } = req.params;
  const { dashboard } = req.body;
  const updatedTime = new Date();

  try {
    const result = await pool.query(
      "UPDATE emergency SET dashboard = $1, updated_time = $2 WHERE id = $3 RETURNING *",
      [dashboard, updatedTime, id]
    );

    res
      .status(200)
      .json({ message: "Record updated successfully", data: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to update data" });
  }
};

// Update a record with officer_id
const updateOfficerId = async (req, res) => {
  const { id } = req.params;
  const { officer_id } = req.body;

  try {
    const result = await pool.query(
      "UPDATE emergency SET officer_id = $1 WHERE id = $2 RETURNING *",
      [officer_id, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Record not found" });
    }

    res
      .status(200)
      .json({ message: "Officer assigned successfully", data: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to assign officer" });
  }
};

module.exports = {
  createEmergency,
  getEmergencies,
  deleteEmergency,
  updateEmergencyDashboard,
  getDashboardAData,
  getDashboardBData,
  updateOfficerId,
};
