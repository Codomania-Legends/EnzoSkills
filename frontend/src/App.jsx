import React, { useEffect, useState } from 'react';
import "./Utility/global.css";
import "./index.css";
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
import History from './Dashboard/History/History';
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
import { CourseProvider } from './Utility/Course';
import Signup from './Hero/Login_Signup/Signup';
import TopicAssessment from './Dashboard/CourseDetails/Assessment/TopicAssessment';
import FinalAssessment from './Dashboard/CourseDetails/Assessment/FinalAssessment';
import Assessment from './Dashboard/CourseDetails/Assessment';
import Calender from './Utility/Calender';
import AddProjectForm from './Dashboard/Project/AddProjectForm';
import LoadImages from './Utility/Loading/LoadImages';
import ScoreCard from './Dashboard/CourseDetails/ScoreCard';
import Roadmap from './Dashboard/CourseDetails/Roadmap';
import Learning from './Dashboard/CourseDetails/Learning/Learning';
import { UserProvider } from './Utility/UserDetails';

const HomeLayout = () => (
  <div className='home-main-container'>
    <img src="/HomeImg/HomeBG.svg" alt="Background" className='bgImg fade-in' />
    <div className="navbar flex justify-center items-center h-1/10">
      <Navbar />
    </div>
    <Outlet />
  </div>
);

// ✅ Single Dashboard Wrapper to preserve User & Course context across all dashboard sub-routes
const DashboardLayoutWrapper = () => (
  <UserProvider>
    <CourseProvider>
      <Dash_Layout />
    </CourseProvider>
  </UserProvider>
);

function App() {
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);

  const preloadImageUrls = [
    "/Dashboard/projectImg.svg",
    "/HomeImg/HomeCenterImg.svg",
    "/HomeImg/HomeBG.svg"
  ];

  useEffect(() => {
    const fetchImages = async () => {
      const result = await LoadImages({ images: preloadImageUrls });
      setIsImagesLoaded(result);
    };

    fetchImages();
  }, []);

  return (
    <>
      <Toaster position='top-center' theme='dark' options={{
        fill: "#171717",
        styles: { description: "text-white/75!" },
      }} />
      <Router>
        <Routes>
          <Route path='/' element={<Loading />} />
          
          {/* Public / Landing Routes */}
          <Route element={<HomeLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/about/more" element={<MoreAboutUS />} />
            <Route path="/features" element={<Features />} />
          </Route>

          {/* Dashboard Routes with Persistent State & Single Context Providers */}
          <Route element={<DashboardLayoutWrapper />}>
            <Route path="/dashboard/home" element={<DashHome />} />
            <Route path="/dashboard/library" element={<Library />} />
            <Route path="/dashboard/project" element={<Project />} />
            <Route path="/dashboard/room" element={<Room />} />
            <Route path="/dashboard/AI" element={<AI />} />
            <Route path="/dashboard/records" element={<Records />} />
            <Route path="/dashboard/history" element={<History />} />
            <Route path="/dashboard/room/:id" element={<Main_RoomPage />} />

            {/* Courses & Course Details Sub-routes */}
            <Route path="/dashboard/courses" element={<Courses />} />
            <Route path="/dashboard/courses/overview/:id" element={<Overview />} />
            <Route path="/dashboard/courses/learning/:id" element={<Learning />} />
            <Route path="/dashboard/courses/assessment/:id" element={<Assessment />} />
            <Route path="/dashboard/courses/assessment/topic/:id" element={<TopicAssessment />} />
            <Route path="/dashboard/courses/assessment/final/:id" element={<FinalAssessment />} />
            <Route path="/dashboard/courses/scorecard/:id" element={<ScoreCard />} />
            <Route path="/dashboard/courses/doubts/:id" element={<Doubts />} />
            <Route path="/dashboard/courses/roadmap/:id" element={<Roadmap />} />
          </Route>

          {/* Auth & Utility Routes */}
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
        </Routes>
      </Router>
    </>
  );
}

export default App;