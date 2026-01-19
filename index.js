const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// In-memory "database"
let users = [];

// Test route
app.get('/hello', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

// GET all users
app.get('/users', (req, res) => {
  res.json(users);
});

// POST a new user
app.post('/users', (req, res) => {
  const user = req.body; // { "name": "Sarah", "age": 19 }
  users.push(user);
  res.json({ message: 'User added!', users });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

