# WebPisi

WebPisi is a beginner-friendly full-stack web application built using Node.js, Express, and MongoDB.  
It focuses on backend fundamentals such as authentication, session management, and database operations, with a simple frontend for interaction.

## 🌐 Live Demo
The application is deployed and accessible here:  
👉 https://webpisi.onrender.com/

## 🚀 Features
  - User registration and login
  - Password hashing using bcrypt
  - Session-based authentication using  express-session
  - Redis-backed session storage for production reliability
  - Secure HTTP-only cookies with SameSite protection
  - Environment-based configuration for development and production
  - Protected routes for authenticated users
  - MongoDB integration using Mongoose
  - Sensor-style data generation and storage
  - Dashboard API returning current and historical data

## 🛠️ Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- Redis (Upstash)
- connect-redis
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

### Session-Based Authentication

WebPisi uses server-side session authentication instead of JWT.
This approach was chosen to:

- Emphasize backend fundamentals

- Demonstrate server-managed authentication

- Keep logout and session invalidation straightforward

Sessions are stored in Redis in production to ensure persistence across restarts.

### Backend-First Architecture

The frontend is intentionally minimal.
The focus of this project is:

- Authentication flow

- Database modeling with Mongoose

- Secure session handling

- API-driven dashboard updates

### Lightweight Deployment

The frontend is served as static files from Express to maintain a simple deployment model and avoid unnecessary complexity.


## Architecture Diagram 

  Client
   ↓
  Render (Express Server)
  ↓
  MongoDB Atlas (Database)
  ↓
  Upstash Redis (Session Store)
