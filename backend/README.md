<div align="center">

# ⚙️ EnzoSkills — Backend API & Socket Server

**The Core API Engine, Mongoose Data Layer, and Real-Time Socket Gateway**

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io/)
[![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=white)](https://nodemon.io/)

<p align="center">
  This is the backend server module for the <strong>EnzoSkills</strong> platform. It provides the RESTful API endpoints for the learning path application, manages data storage with MongoDB, and hosts a dedicated WebSocket gateway for collaborative study rooms.
</p>

</div>

---

## 📂 Backend Architecture

The server codebase is structured around MVC design patterns:

```text
backend/
├── Controllers/       # Logic for routing handlers & Room socket gateway
│   └── Room.js        # Standalone Socket.io server logic (Port 4000)
├── Models/            # MongoDB schema definitions using Mongoose
│   ├── User.js        # Student profiles, projects portfolio & streaks
│   ├── Courses.js     # Syllabus, day-wise text, and exams schema
│   ├── Library.js     # Global PDF & video assets collections
│   ├── Records.js     # Scorecard entries & student feedback logs
│   ├── History.js     # User action auditing records
│   └── AI.js          # Persistent AI-tutor conversation logs
├── Routes/            # HTTP endpoint path registrations
│   ├── User.js        # /user router
│   ├── Course.js      # /courses router
│   ├── Library.js     # /library router
│   ├── Records.js     # /records router
│   └── History.js     # /history router
├── index.js           # Main Express application entry (Port 3000)
├── test_db.js         # Connection testing script
└── package.json       # Dependencies list & launch script bindings
```

---

## 📡 RESTful API Endpoints

The API is served at `http://localhost:3000/`. Below is a breakdown of the primary routing hubs:

### 👤 User Services (`/user`)
- **Authentication:** Login and Signup handling.
- **Profiles:** Read and write academic history, personal developer portfolio, streaks, and awards.

### 📚 Course Management (`/courses`)
- **Syllabus details:** Retrieve enrolled course roadmaps, day-wise study paragraphs, and quiz materials.
- **Assessments:** Fetch topic assessments and final examinations.

### 🏛️ Digital Library (`/library`)
- **Reading Room:** Get shared access to textbook PDF links and media study lists.

### 📝 Grade Records (`/records`)
- **Grades:** Post quiz attempts, track overall badge awards, and log course reviews.

### 🕒 Activity logs (`/history`)
- **Audit Trails:** Save and fetch timestamped audit entries tracking completed modules.

---

## ⚡ WebSocket Study Rooms

A separate server processes real-time interactions on Port `4000` via **Socket.io**:

- **Join Rooms (`join_room`):** Maps student sockets to unique workspace room identifiers (`roomID`). It updates the active user list and broadcasts it to all peers.
- **Peer Chat (`send_message`):** Standardizes low-latency chat exchange, transmitting messages instantly through the room namespace.
- **Resource Cleanup (`disconnect`):** Handles client timeouts or closures, purges disconnected sockets from active tables, and automatically deletes inactive rooms.

---

## 🛠️ Local Setup & Configuration

Ensure you have [Node.js](https://nodejs.org/) and a local **MongoDB** database instance running.

1. Navigate to this directory:
   ```bash
   cd backend
   ```
2. Install server-side dependencies:
   ```bash
   npm install
   ```
3. Establish local MongoDB server connection (runs on default port `27017`).
4. Run the Express HTTP REST server (runs on Port 3000):
   ```bash
   npm start
   ```
5. Run the Socket.io collaboration server in a new terminal (runs on Port 4000):
   ```bash
   npm run socket
   ```

---

<div align="center">
  Developed with ❤️ by Team Codomania-Legends
</div>
