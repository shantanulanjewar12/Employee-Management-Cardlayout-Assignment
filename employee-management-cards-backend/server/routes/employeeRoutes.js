const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {  getEmployees,  getEmployeeById,  updateEmployee,  deleteEmployee,} = require("../controllers/employeeController");



// admin routes
router.get("/", authMiddleware, getEmployees);

router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteEmployee);



// both users routes
router.get("/:id", authMiddleware, getEmployeeById);

// UPDATE employee 
router.put("/:id", authMiddleware, updateEmployee);

module.exports = router;
