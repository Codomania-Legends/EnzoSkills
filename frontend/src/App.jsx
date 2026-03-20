import React from 'react';
import "./Utility/global.css";
import "./index.css"
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router';

import Home from './Hero/Home/Home';
import AboutPage from './Hero/AboutUS/AboutPage';
import MoreAboutUS from './Hero/AboutUS/MoreAboutUS';
import Dash_Layout from './Dashboard/layout/Dash_Layout';
import Courses from './Dashboard/Courses/Courses';
import Library from './Dashboard/Library/Library';
import Project from './Dashboard/Project/Project';
import Room from './Dashboard/Room/Room';
import Main_RoomPage from './Dashboard/Room/Main_RoomPage';
import AI from './Dashboard/AI/AI';
import Records from './Dashboard/Records/Records';
import DashHome from './Dashboard/Home/DashHome';
import Loading from './Utility/Loading/Loading';
import DashLoad from './Utility/DashLoad/DashLoad';
import Login from './Hero/Login_Signup/Login';
import Features from './Hero/Features/Features';
import Navbar from './Hero/Navbar/Navbar';
import { Spin } from './Spin';

const HomeLayout = () => (
  <div className='home-main-container'>
    <img src="/HomeImg/HomeBG.svg" alt="Background" className='bgImg' />
    <div className="navbar flex justify-center items-center h-1/10">
      <Navbar />
    </div>
    <Outlet />
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Loading/>} />
        <Route element={<HomeLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/about/more" element={<MoreAboutUS />} />
          <Route path="/features" element={<Features />} />
        </Route>
        <Route element={<Dash_Layout />}>
          <Route path="/dashboard/home" element={<DashHome />} />
          <Route path="/dashboard/courses" element={<Courses />} />
          <Route path="/dashboard/library" element={<Library />} />
          <Route path="/dashboard/project" element={<Project />} />
          <Route path="/dashboard/room" element={<Room />} />
          <Route path="/dashboard/AI" element={<AI />} />
          <Route path="/dashboard/records" element={<Records />} />
          <Route path="/dashboard/room/:id" element={<Main_RoomPage />} />
        </Route>
        <Route path='/dashload' element={<DashLoad/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/spin' element={<Spin/>}/>
      </Routes>
    </Router>
  );
}

export default App;