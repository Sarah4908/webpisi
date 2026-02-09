require("dotenv").config();

const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
const bcrypt = require("bcrypt");
const session = require("express-session");
const connectDB = require("./config/db");
const User = require("./models/user");
const SensorData = require("./models/SensorData");


//db
connectDB();

//global middleware
app.use(express.json());

app.set("trust proxy", 1);


//session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

//static files(frontend) served to browser
app.use(express.static(path.join(__dirname, "public")));


//authentication
const requireAuth = (req, res, next) => {
  if (!req.session.userId) return res.redirect("/login");
  next();
};

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
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
    });



  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/register", (req, res) => {
  if (req.session.userId) return res.redirect("/");
  res.sendFile(path.join(__dirname, "public/register.html"));
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //basic validation
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    //db check for user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    //password verification
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    //create session
    req.session.userId = user._id;

    res.json({
      message: "Login successful",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Logged out" });
  });
});


app.get("/login", (req, res) => {
  if (req.session.userId) return res.redirect("/");
  res.sendFile(path.join(__dirname, "public/login.html"));
});

app.get("/", requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});


app.get("/api/dashboard", requireAuth, async (req, res) => {
  try {
    //Generate sensor data
    const data = {
      ph: Number((Math.random() * 2 + 6).toFixed(2)),
      temperature: Number((Math.random() * 15 + 20).toFixed(1)),
      waterLevel: Math.floor(Math.random() * 60 + 20),
    };

    //Save to database
    await SensorData.create({
      userId: req.session.userId,
      ...data,
    });

    //Get last 10 records
    const history = await SensorData.find({ userId: req.session.userId })
      .sort({ createdAt: -1 })
      .limit(10);

    //Send response
    res.json({
      current: data,
      history: history.reverse(), // oldest → newest
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Dashboard error" });
  }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
