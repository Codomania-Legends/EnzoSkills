import React from 'react';
import "./Utility/global.css";
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router';
import MainHomePage from './Components/MainHome/MainHomePage';
import AboutPage from './Components/AboutUS/AboutPage';
import Dash_Navbar from './layout/Dash_Navbar';

const HomeLayout = () => (
  <div className='main-container'>
    <img src="/HomeImg/HomeBG.svg" alt="Background" className='bgImg' />
    <Outlet />
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<MainHomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>
        <Route path="/dashboard" element={<Dash_Navbar />} />
      </Routes>
    </Router>
  );
}

export default App;