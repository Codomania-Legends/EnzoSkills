import React from 'react';
import "./Utility/global.css";
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router';
import MainHomePage from './Components/MainHome/MainHomePage';
import Home from './Components/Dashboard/Home/Home';
import AboutPage from './Components/AboutUS/AboutPage';
import Courses from './Components/Dashboard/Courses/Courses';
import Dash_Layout from './layout/Dash_Layout';
import Library from './Components/Dashboard/Library/Library';
import Project from './Components/Dashboard/Project/Project';
import Room from './Components/Dashboard/Room/Room';
import AI from './Components/Dashboard/AI/AI';
import Records from './Components/Dashboard/Records/Records';

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
        <Route element={<Dash_Layout />}>
          <Route path="/dashboard/home" element={<Home />} />
          <Route path="/dashboard/courses" element={<Courses />} />
          <Route path="/dashboard/library" element={<Library />} />
          <Route path="/dashboard/project" element={<Project />} />
          <Route path="/dashboard/room" element={<Room />} />
          <Route path="/dashboard/AI" element={<AI />} />
          <Route path="/dashboard/records" element={<Records />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;