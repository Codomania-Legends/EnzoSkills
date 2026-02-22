import React from 'react'
import "./Utility/global.css"
import Sidebar from './layout/Sidebar'
import MainHomePage from './Components/MainHome/MainHomePage'
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Navbar from './Components/Navbar/Navbar';
import AboutPage from './Components/AboutUS/AboutPage';
import Dash_Navbar from './layout/Dash_Navbar';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainHomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/dashboard" element={<Dash_Navbar />} />
          {/* Create an AboutPage component for this to work */}
        </Routes>
      </Router>
      {/* <div className='app-container h-100vh w-100vw'>
      <Sidebar />
    </div> */}
    </>
  )
}

export default App