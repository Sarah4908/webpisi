# WebPisi

WebPisi is a beginner-friendly full-stack web application built using Node.js, Express, and MongoDB.  
It focuses on backend fundamentals such as authentication, session management, and database operations, with a simple frontend for interaction.

## 🌐 Live Demo
The application is deployed and accessible here:  
👉 https://webpisi.onrender.com/

## 🚀 Features
- User registration and login
- Password hashing using bcrypt
- Session-based authentication using express-session
- Protected routes for authenticated users
- MongoDB integration using Mongoose
- Sensor-style data generation and storage
- Dashboard API returning current and historical data

## 🛠️ Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- HTML, CSS, JavaScript

## 📂 Project Structure
- `config/db.js` – MongoDB connection logic  
- `models/` – Mongoose schemas (`User`, `SensorData`)  
- `public/` – Frontend files (HTML, CSS, JS)  
- `server.js` – Express server and route definitions  

## ▶️ How to Run Locally
1. Clone the repository
    ```bash
   git clone https://github.com/Sarah4908/webpisi.git
2. Navigate into the project directory
    ```bash
      cd webpisi
3. Install dependencies
    ```bash
      npm install
4. Create a .env file in the root directory
    ```env
      PORT=3000
      MONGO_URI=your_mongodb_connection_string
      SESSION_SECRET=your_secret_key
5. Start the server
    ```bash
   npm start
6. Open the application in your browser
     ```arduino
   http://localhost:3000

## 🧠 Design Decisions

### Why session-based authentication?
This project uses **session-based authentication** (`express-session`) instead of JWT to focus on backend fundamentals such as:
- server-side session handling
- protected routes
- authentication flow using cookies

Session-based auth is well-suited for dashboard-style applications where the server maintains user state.

### Why a minimal frontend?
The frontend is intentionally kept simple to highlight backend logic rather than UI complexity.
The focus is on:
- authentication and authorization
- MongoDB data modelling and queries
- periodic data fetching for the dashboard

The dashboard is responsive and mobile-friendly, but avoids unnecessary UI features.

### Project structure choice
The frontend is served using **Express static files (`public/`)** to keep the architecture lightweight and easy to deploy.
An initial experiment with a separate Next.js frontend was removed to simplify the project and maintain a clear backend-first focus.
