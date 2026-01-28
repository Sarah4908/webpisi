const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

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
