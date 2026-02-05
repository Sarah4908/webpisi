const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

const connectDB = require("./config/db");
const User = require("./models/User");
connectDB();
app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create new user
    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});





// Serve frontend from 'public' folder inside backend
app.use(express.static(path.join(__dirname, "public")));

// API endpoint
app.get("/api/dashboard", (req, res) => {
  const data = {
    ph: { value: (Math.random() * 2 + 6).toFixed(2), status: "Normal" },
    temperature: { value: (Math.random() * 15 + 20).toFixed(1), status: "Normal" },
    waterLevel: { value: Math.floor(Math.random() * 60 + 20), status: "Normal" },
    plantHealth: "Healthy 😊"
  };
  res.json(data);
});

// Serve index.html for the root route only
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
