const express = require("express");
const fs = require("fs").promises;
const path = require("path");

const app = express();
const PORT = 3000;

const USERS_FILE = path.join(__dirname, "users.json");

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // serve frontend

// POST route to save user
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Load existing users
    let users = [];
    try {
      const data = await fs.readFile(USERS_FILE, "utf-8");
      users = JSON.parse(data);
    } catch {
      users = [];
    }

    // Add new user
    users.push({ name, email, password });

    // Save back to file
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));

    res.json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
