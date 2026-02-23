const db = require("../config/db");

// GET ALL for Admin only)
exports.getEmployees = async (req, res) => {
  try {
    if (req.user.role === "admin") 
      {
      const [rows] = await db.query(
        "SELECT * FROM users WHERE role = 'employee'",
      );
      return res.json(rows);
    }

    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [
      req.user.id,
    ]);

    res.json(rows);

  } catch (error) 
  {
    res.status(500).json({ message: "Server error" });
  }
};


// GET own employee data (self)
exports.getEmployeeById = async (req, res) => {
  try {
    const employeeId = req.params.id;


    if (req.user.role === "employee" && req.user.id != employeeId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const [rows] = await db.query(
      "SELECT id,name,email,role,employee_id,designation,address,phone,image_url,created_at FROM users WHERE id=?",
      [employeeId],
    );

    if (rows.length === 0) 
      {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update only no and addresss
exports.updateEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;

    if (req.user.role === "employee" && req.user.id != employeeId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const { address, phone } = req.body;

    await db.query("UPDATE users SET address=?, phone=? WHERE id=?", [    
      address,
      phone,
      employeeId,
    ]);

    res.json({ message: "Updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete (Admin only)
exports.deleteEmployee = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin only" });
    }

    await db.query("DELETE FROM users WHERE id=?", [req.params.id]);

    res.json({ message: "Deleted successfully" });
    
  } catch (error) 
  {
    res.status(500).json({ message: error.message });
  }
};
