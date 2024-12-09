const express = require("express");
const {
  createEmergency,
  getEmergencies,
  deleteEmergency,
  updateEmergencyDashboard,
  getDashboardAData,
  getDashboardBData,
} = require("../controllers/userController");

const router = express.Router();

// POST: Insert a new record
router.post("/data", createEmergency);

// GET: Fetch all records
router.get("/data", getEmergencies);

// Routes for specific dashboards
router.get("/data/dashboardA", getDashboardAData);
router.get("/data/dashboardB", getDashboardBData);

// DELETE: Remove a record
router.delete("/data/:id", deleteEmergency);

// PUT: Update the dashboard column
router.put("/data/:id", updateEmergencyDashboard);

module.exports = router;
