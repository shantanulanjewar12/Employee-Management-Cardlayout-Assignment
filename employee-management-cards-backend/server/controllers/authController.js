const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
       {

      return res.status(400).json({ message: "Email and password required" });
    }

    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );


    if (rows.length === 0) 
      {
      return res.status(400).json({ message: "User not found" });
    }


    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);


    if (!isMatch) 
      {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );


    delete user.password;

    res.json({
      message: "Login successful",
      token,
      user,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};