import React, { useEffect, useMemo, useState } from 'react';
import "./Utility/global.css";
import "./index.css"
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router';

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
import { Toaster } from 'sileo';
import AddCourses from './Dashboard/Courses/AddCourses';
import AddMaterial from './Dashboard/Courses/AddMaterial';
import SignUpForm from './Hero/Login_Signup/SignUpForm';
import Overview from './Dashboard/CourseDetails/Overview';
import Doubts from './Dashboard/CourseDetails/Doubts';
import Learning from './Dashboard/CourseDetails/Learning';
import Roadmap from "./Dashboard/CourseDetails/Roadmap"
import { CourseProvider } from './Utility/Course';
import Signup from './Hero/Login_Signup/Signup';
import TopicAssessment from './Dashboard/CourseDetails/Assessment/TopicAssessment';
import FinalAssessment from './Dashboard/CourseDetails/Assessment/FinalAssessment';
import Assessment from './Dashboard/CourseDetails/Assessment';
import Calender from './Utility/Calender';
import AddProjectForm from './Dashboard/Project/AddProjectForm';
import LoadImages from './Utility/Loading/LoadImages';

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
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const images = [
    "/Dashboard/projectImg.svg",
  ]

  useMemo(() => {
    let loadedImages = LoadImages({ images });
    setImagesLoaded(loadedImages);
  }, []);

  return (
    <>
      <Toaster position='top-center' />
      <Router>
        <Routes>
          <Route path='/' element={<Loading />} />
          <Route element={<HomeLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/about/more" element={<MoreAboutUS />} />
            <Route path="/features" element={<Features />} />
          </Route>
          <Route element={<Dash_Layout />}>
            <Route path="/dashboard/home" element={<DashHome />} />
            <Route path="/dashboard/library" element={<Library />} />
            <Route path="/dashboard/project" element={<Project />} />
            <Route path="/dashboard/room" element={<Room />} />
            <Route path="/dashboard/AI" element={<AI />} />
            <Route path="/dashboard/records" element={<Records />} />
            <Route path="/dashboard/room/:id" element={<Main_RoomPage />} />

            <Route path="/dashboard/courses" element={
              <CourseProvider>
                <Outlet />
              </CourseProvider>
            } >
              <Route index element={<Courses />} />
              <Route path="overview/:id" element={<Overview />} />
              <Route path="learning/:id" element={<Learning />} />
              <Route path="assessment/:id" element={<Assessment />} />
              <Route path="assessment/topic/:id" element={<TopicAssessment />} />
              <Route path="assessment/final/:id" element={<FinalAssessment />} />
              <Route path="roadmap/:id" element={<Roadmap />} />
              <Route path="doubts/:id" element={<Doubts />} />
            </Route>
          </Route>
          <Route path='/dashload' element={<DashLoad />} />
          <Route path='/login' element={<Login />} />
          <Route path='/login-page' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signform' element={<SignUpForm />} />
          <Route path='/spin' element={<Spin />} />
          <Route path='/addcourses' element={<AddCourses />} />
          <Route path='/addmaterial' element={<AddMaterial />} />
          <Route path='/calender' element={<Calender />} />
          <Route path='/add-project' element={<AddProjectForm />} />

          {/* <Route path="*" element={<Navigate to="/home" replace />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;