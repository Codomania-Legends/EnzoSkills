<div align="center">

# 🚀 EnzoSkills

**An Advanced Skill-Tracking & Real-Time Collaborative Learning Platform**

[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://gsap.com/)
<br>
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io/)

<p align="center">
  <strong>EnzoSkills</strong> is a modern, structured learning path dashboard designed to help users track coding skills, monitor academic progress, and visualize technical growth. Built as a centralized hub for guided learning and skill management, it features fluid animations, real-time study rooms, gamified streaks, and detailed analytics.
</p>

---

[Key Features](#-key-features) • [Interface Tour](#-interface-tour) • [System Architecture](#-system-architecture--design) • [Database Design](#-database-schema-architecture) • [Real-Time Collaboration](#-real-time-collaboration) • [Getting Started](#-installation--getting-started)

</div>

---

## 📸 Interface Tour

### 🖥️ Main Dashboard Overview
*A comprehensive, multi-module dashboard showcasing overall progress, user details, ongoing courses, and learning stats.*
<br/>
<div align="center">
  <img width="1917" height="996" alt="Main Dashboard Preview" src="https://github.com/user-attachments/assets/9b36b6e8-0efc-428a-bbbf-b43a53244991" style="border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.15);" />
</div>

<br/>

### 🗺️ Learning Path Trackers
*The interactive syllabus tracker where students navigate sequentially through daily learning content, modules, and code resources.*
<br/>
<div align="center">
  <img width="1918" height="996" alt="Learning Path Tracker" src="https://github.com/user-attachments/assets/5429974a-4fd9-42b9-8b08-31491ed0874c" style="border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.15);" />
</div>

<br/>

### 📊 Analytical Insights
*Dynamic data visualization displaying student exam scores, progress breakdowns, completion rates, and historical logs.*
<br/>
<div align="center">
  <img width="805" height="481" alt="Analytics View" src="https://github.com/user-attachments/assets/15ffb77a-7876-443a-8ca5-6112d3621757" style="border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.15);" />
</div>

---

## ✨ Key Features

- **🗺️ Interactive Learning Roadmaps:** Clear, structured pathways outlining week-by-week progress milestones, core skills, and day-wise technical reading material.
- **⏱️ Gamified Streak Systems:** Promotes daily learning habits with real-time streak trackers and awarded achievement badges.
- **💬 Real-Time Study Rooms:** Collaborative spaces driven by Socket.io enabling peer learning, active user listings, and instantaneous group chats.
- **🤖 Dedicated AI doubt-solver:** Persistent AI-assisted interface allowing users to clear conceptual blockages without leaving the learning deck.
- **📁 Portfolio & Project Showcase:** Integrated personal profile component for developer project tracking, including repository linkages and deployment status.
- **📚 Digital Library:** Media center stocking essential textbook resources (PDFs) and video tutorials for self-paced studies.

---

## 🛠️ Tech Stack & Architecture

### Frontend Architecture
- **React.js & Vite:** Multi-page react routing using `react-router` v7, bundled via Vite for lightning-fast Hot Module Replacement (HMR).
- **Tailwind CSS & PostCSS:** Adaptive utility-first styling ensuring pixel-perfect layout responsiveness across all viewports (`sm`, `md`, `lg`, `xl`).
- **GSAP (GreenSock Animation Platform) & Framer Motion:** Powering high-performance interface transitions, fluid micro-interactions, and scroll-driven entry animations.
- **Chart.js:** Rendering crisp, clean, Canvas-based canvas charts tracking progress stats and user scorecard metrics.
- **Socket.io Client:** Subscribing to real-time events for instant message broadcasts and room sync.

### Backend Infrastructure
- **Node.js & Express.js:** Fast, minimalist server infrastructure handling RESTful API routing, query parameters, and controller logic.
- **Socket.io Server:** WebSockets provider running on a dedicated server port (4000) to orchestrate concurrent study room sessions.
- **Mongoose (NoSQL ODM):** Mapping schema definitions, validation guidelines, and relationship lookups between collections.

---

## 📊 System Architecture & Design

### Component & Data Flow
*High-level system design outlining frontend request handlers, socket connections, controller layers, and database collections.*
<br/>
<div align="center">
  <img width="1097" height="1636" alt="System Flow Architecture Diagram" src="https://github.com/user-attachments/assets/b0336158-f978-4f7f-bd04-7b88b08f1519" style="border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.15);" />
</div>

---

## 🗄️ Database Schema Architecture

The MongoDB backend database (`EnzoSkills`) contains 6 core collections, managed through robust Mongoose schemas:

| Collection | Key Fields & Structures | Purpose / Role |
| :--- | :--- | :--- |
| **`User`** | `user_id`, `user_name`, `password`, `email`, `education`, `projects`, `badges`, `streak` | Maintains student credentials, education history, personal developer portfolio, streaks, and achievements. |
| **`Courses`** | `course_id`, `course_name`, `roadmap` (nested levels), `daywise_material`, `weekwise_assessment`, `final_assessment` | Stores course details, sequential syllabus structures, day-to-day reading text, and diagnostic quiz questions. |
| **`Library`** | `books` (name, img, pdf URL), `videos` (name, img, video URL) | Houses global digital references, textbook PDFs, and video links accessible to all users. |
| **`Records`** | `course_id`, `course_name`, `day_num`, `badge`, `score`, `reviews` | Logs student quiz performances, scored results, and qualitative course feedback. |
| **`History`** | `user_id`, `action_title`, `action_description`, `timestamp` | Tracks an audit trail of user activities (e.g., enrolled, finished topic, logged in). |
| **`AI`** | `user_id`, `chats` (serialized JSON history string) | Stores persistent conversation histories and query records for the built-in AI tutor. |

---

## 🔄 Real-Time Collaboration

Collaborative study rooms are powered by **Socket.io** over a dedicated WebSocket server:
```
  +------------------+                    +--------------------+                    +------------------+
  |  Student A (Web) |                    |  Socket.io Server  |                    |  Student B (Web) |
  +--------+---------+                    +---------+----------+                    +--------+---------+
           |                                        |                                        |
           | ----- join_room(roomID, username) ---->|                                        |
           |                                        | ----- update_members(activeList) ----->|
           |                                        |                                        |
           | ----- send_message(messageData) ------>|                                        |
           |                                        | ===== recieve-msg(messageData) =======>|
           |                                        |                                        |
           | <---- [on disconnect] ---------------- | (removes member, updates list)         |
```
1. **Join Room (`join_room`):** Users enter a room ID. The client registers its socket with the specific room, pushes its metadata to active lists, and broadcasts updated active membership.
2. **Instant Message (`send_message`):** Broadcasts chat payloads instantly to other clients connected to the same room namespace.
3. **Graceful Disconnect (`disconnect`):** On tab closure or exit, the socket server cleans up active lists, deletes empty rooms, and updates the remaining room members.

---

## ⚙️ Installation & Getting Started

Follow these steps to run EnzoSkills locally on your system:

### Prerequisites
- **Node.js** (v18.x or higher recommended)
- **MongoDB** (Local instance running on `mongodb://localhost:27017` or a Mongo Atlas URI string)

---

### 1. Server Configuration & Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install server-side dependencies:
   ```bash
   npm install
   ```
3. The server connects to your local MongoDB instance at `mongodb://localhost:27017/EnzoSkills` by default. You can adjust port allocations and endpoint paths directly in [backend/index.js](file:///d:/Developer_V/EnzoSkills/backend/index.js) and [backend/Controllers/Room.js](file:///d:/Developer_V/EnzoSkills/backend/Controllers/Room.js).
4. Run the main Express API server (runs on Port 3000):
   ```bash
   npm start
   ```
5. Run the Socket.io collaboration room server in a separate terminal (runs on Port 4000):
   ```bash
   npm run socket
   ```

---

### 2. Client Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite React development server (runs on Port 5173 by default):
   ```bash
   npm run dev
   ```
4. Access the web app in your browser at `http://localhost:5173/`.

---

<div align="center">
  Made with ❤️ by Team Codomania-Legends
</div>
