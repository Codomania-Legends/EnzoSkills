<div align="center">

# 🎨 EnzoSkills — Frontend Client

**A High-Performance, Animated learning Deck & Collaboration Client**

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://gsap.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer-motion&logoColor=white)](https://www.framer.com/motion/)
[![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)](https://www.chartjs.org/)

<p align="center">
  This is the frontend client module for the <strong>EnzoSkills</strong> platform. It is built with React and Vite, featuring rich visual feedback, GSAP-driven micro-animations, fluid layout scaling, and responsive analytical displays.
</p>

</div>

---

## 📂 Source Code Structure

The client application's source is organized into semantic modular subdirectories:

```text
frontend/
├── public/                 # Static public assets (images, background vectors)
└── src/
    ├── Hero/               # Public landing pages & Auth routing
    │   ├── Home/           # Hero section and splash screen
    │   ├── AboutUS/        # Project declarations & team information
    │   ├── Features/       # Detailed platform features showcase
    │   └── Login_Signup/   # Auth forms & onboarding layouts
    ├── Dashboard/          # Core authenticated user panels
    │   ├── Home/           # User dashboard landing page
    │   ├── Courses/        # Course catalog list & enrollment handlers
    │   ├── CourseDetails/  # Interactive day-wise content reader
    │   ├── Room/           # Socket.io chat room panel
    │   ├── AI/             # Chat interface with AI tutor
    │   ├── Library/        # Study guides, PDFs & videos center
    │   └── History/        # Action audit trails
    ├── Components/         # Modular, reusable presentation widgets
    │   ├── Dashboard/      # Custom widgets, sidebars & headers
    │   └── Profile/        # Student detail editing forms
    ├── Utility/            # State contexts, helpers & static overlays
    │   ├── Course.jsx      # Global context API providing course states
    │   ├── Animations/     # GreenSock animation hooks & configs
    │   └── Roadmap/        # Visual canvas roadmap components
    ├── App.jsx             # Client router entry & global router outlets
    ├── main.jsx            # DOM renderer & script initiator
    └── index.css           # Global stylesheet containing Tailwind directives
```

---

## ⚡ Key Client-Side Features

- **🌐 State-Driven Course Context:** Uses React Context (`CourseProvider`) to share live course, syllabus, and module states seamlessly across deep UI trees.
- **✨ Premium UI & Micro-interactions:** Leverages GreenSock (GSAP) & Framer Motion to create smooth dashboard panels, magnetic buttons, slide-ins, and animated loading screens.
- **📊 Graphical Statistics:** Renders canvas-based, responsive charts (via `react-chartjs-2`) mapping course progress, scores, and track statistics.
- **⚡ WebSockets Sync:** Interfaces with the Socket.io-client library to manage direct chat synchronization, participant lists, and room events.
- **📱 Fully Responsive:** Styled using mobile-first Tailwind CSS classes to deliver seamless scaling across phones, tablets, and desktop resolutions.

---

## 🛠️ Installation & Setup

Ensure you have [Node.js](https://nodejs.org/) (v18.x or higher) installed on your machine.

1. Navigate to this directory:
   ```bash
   cd frontend
   ```
2. Install frontend packages:
   ```bash
   npm install
   ```
3. Run the development server (runs with hot-reloading at `http://localhost:5173/` by default):
   ```bash
   npm run dev
   ```

---

## ⚙️ Available Scripts

In the project directory, you can run:

| Command | Action |
| :--- | :--- |
| **`npm run dev`** | Launches the Vite developer server on host interface. |
| **`npm run build`**| Compiles and optimizes assets into the production folder (`dist/`). |
| **`npm run preview`**| Previews the locally built production build for debugging. |
| **`npm run lint`** | Runs ESLint rules checking code styling and safety guidelines. |

---

<div align="center">
  Developed with ❤️ by Team Codomania-Legends
</div>
