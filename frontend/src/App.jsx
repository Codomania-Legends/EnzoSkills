import React from 'react';
import "./Utility/global.css";
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router';
import MainHomePage from './Components/MainHome/MainHomePage';
import Home from './Components/Dashboard/Home/Home';
import AboutPage from './Components/AboutUS/AboutPage';
import MoreAboutUS from './Components/AboutUS/MoreAboutUS';
const HomeLayout = () => (
  <div className='home-main-container'>
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
          <Route path="/about/more" element={<MoreAboutUS />} />
        </Route>
        <Route path="/dashboard/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;