import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import axios from 'axios';
import "./profile.css";

import { WHITE_BOX, Bluish_Box, Project_Box } from './Boxes';
import { skills, education, experience, projects } from './DummyData';
import { useUser } from '../../../Utility/UserDetails';

function Profile({ showProfile }) {
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const { userDetails } = useUser();

  const [educationIndex, setEducationIndex] = useState(0);
  const [experienceIndex, setExperienceIndex] = useState(0);
  const [projectIndex, setProjectIndex] = useState(0);
  const [theme, setTheme] = useState("light");

  const handleSignOut = () => {
    Cookies.remove("user_id");
    Cookies.remove("username");
    navigate("/login");
  };

  // 1. Process Skills 
  const currentSkills = userDetails?.skills_occupied?.map((s) => s.skills) || skills;

  // 2. Process Experience 
  const currentExperience = userDetails?.experience
    ? [{ role: "Experience", institute: "Work", date: "Present", description: userDetails.experience }]
    : experience;

  // 3. Process Education 
  const currentEducation = userDetails?.education ? [
    userDetails.education.degree?.clg_name && { role: "Degree", institute: userDetails.education.degree.clg_name, date: userDetails.education.degree.year, description: `CGPA: ${userDetails.education.degree.marks}` },
    userDetails.education.higher_Edu?.school_name && { role: "12th", institute: userDetails.education.higher_Edu.school_name, date: userDetails.education.higher_Edu.year, description: `Marks: ${userDetails.education.higher_Edu.marks}%` },
    userDetails.education.secondary_Edu?.school_name && { role: "10th", institute: userDetails.education.secondary_Edu.school_name, date: userDetails.education.secondary_Edu.year, description: `Marks: ${userDetails.education.secondary_Edu.marks}%` }
  ].filter(Boolean) : education;

  // 4. Process Projects neatly (Now Dynamic!)
  const currentProjects = userDetails?.projects?.length > 0
    ? userDetails.projects.map((p) => ({
      name: p.project_name, description: p.description, repo: p.project_repo, demo: p.deployed_link
    }))
    : projects;

  // Click Handlers now use the processed dynamic lengths with meaningful names!
  const handleNextEducation = () => setEducationIndex((prev) => prev === currentEducation.length - 1 ? 0 : prev + 1);
  const handleNextExperience = () => setExperienceIndex((prev) => prev === currentExperience.length - 1 ? 0 : prev + 1);
  const handleNextProject = () => setProjectIndex((prev) => prev === currentProjects.length - 1 ? 0 : prev + 1);

  return (
    <div ref={profileRef} className={`profile-container blue medium-box-shadow w-full md:w-[50%] lg:w-[35%] absolute top-15 z-50 rounded-l-[3rem] right-0 transition-all duration-300 ease-in-out ${showProfile ? 'translate-x-0 opacity-100 pointer-events-auto' : 'translate-x-[110%] opacity-0 pointer-events-none'}`}>
      <div className='flex flex-col items-center w-full h-full relative'>

        {/* TOP HALF - Info & Skills */}
        <div className='flex flex-col justify-evenly items-center relative -top-15 md:top-0 w-full h-[40%]'>
          <div className='flex flex-col-reverse md:flex-row justify-between items-center w-[85%] pb-2 pt-5'>
            <div className='flex gap-1 text-white flex-col justify-evenly items-start'>
              <p className='show-profile-text text-2xl text-black font-bold font-[Plus Jakarta Sans]'>{userDetails?.user_name || "User"}</p>
              <p className='show-profile-text text-lg font-bold font-[Manrope]'>{userDetails?.designation || "Full Stack Developer"}</p>
              <p className='show-profile-text text-sm font-[Manrope]'>{userDetails?.email || "email@example.com"}</p>
              <p className='show-profile-text text-sm font-[Manrope]'>{userDetails?.phone_num || "9165872964"}</p>
              <button onClick={() => navigate("/signform")} className="show-profile-text mt-2 text-xs font-bold bg-white text-blue-600 px-3 py-1 rounded-full shadow-sm hover:bg-gray-100 cursor-pointer">
                Edit Profile / Needs
              </button>
            </div>
            <div className='flex h-full justify-center items-center'>
              <img className='show-profile-text w-25 h-25 aspect-square rounded-full' src="/About-us/members/Anshul.png" alt="Profile" />
            </div>
          </div>

          <div className='line-role-profile flex justify-between w-[85%] items-center'>
            <div className='line-profile bg-white h-px w-[75%]' />
            <div className='show-profile-text flex items-center w-[25%] justify-center pl-2'>
              {WHITE_BOX(userDetails?.user_post || "USER", "admin-badge")}
            </div>
          </div>

          <div className='flex justify-evenly flex-col items-start w-[85%] flex-wrap py-2'>
            <h3 className='show-profile-text text-left text-lg font-bold font-[Manrope] pb-2'>Skills</h3>
            <div className='flex flex-wrap gap-2 show-profile-text'>
              {currentSkills.map((skill, index) => WHITE_BOX(skill, `skill-${index}`))}
            </div>
          </div>
        </div>

        {/* BOTTOM HALF - Exp, Edu, & Projects */}
        <div className='flex flex-col justify-evenly items-center w-full h-[50%]'>
          <div className='flex w-[85%] justify-between items-center show-profile-text gap-4'>

            {/* Experience */}
            <div className='flex relative h-full flex-col items-start w-[50%]'>
              <h3 className='show-profile-text text-left text-lg font-bold font-[Manrope] py-2'>Experience</h3>
              <div className='w-full h-35 relative'>
                {currentExperience.length === 0
                  ? Bluish_Box("Fresher", null, null, null, "exp-0", 0, handleNextExperience)
                  : currentExperience.map((exp, index) => Bluish_Box(exp.role, exp.institute, exp.date, exp.description, index, experienceIndex, handleNextExperience))}
              </div>
            </div>

            {/* Education */}
            <div className='flex relative h-full flex-col items-start w-[50%]'>
              <h3 className='show-profile-text text-left text-lg font-bold font-[Manrope] py-2'>Education</h3>
              <div className='w-full h-35 relative'>
                {currentEducation.length === 0
                  ? Bluish_Box("No Education", null, null, null, "edu-0", 0, handleNextEducation)
                  : currentEducation.map((edu, index) => Bluish_Box(edu.role, edu.institute, edu.date, edu.description, index, educationIndex, handleNextEducation))}
              </div>
            </div>
          </div>

          {/* Projects Container */}
          <div className='hidden md:flex justify-evenly flex-col items-center w-[85%] flex-wrap'>
            <h3 className='show-profile-text text-center text-lg font-bold font-[Manrope] py-2'>Projects</h3>
            <div className='w-full h-20 relative show-profile-text md:w-[80%]'>
              {currentProjects.length === 0
                ? Project_Box("No Projects", null, null, null, 0, 0, handleNextProject)
                : currentProjects.map((project, index) => Project_Box(project.name, project.description, project.repo, project.demo, index, projectIndex, handleNextProject))}
            </div>
          </div>
        </div>

        {/* Signout BOTTOM */}
        <div className="show-profile-text signout-bottom-profile flex justify-between items-center w-[85%] py-5">
          <div className='flex justify-center items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity' onClick={handleSignOut}>
            <button className="signout-button text-sm font-[Manrope] text-white cursor-pointer pointer-events-none">Sign Out</button>
            <img src='/Dashboard/signout.svg' alt="sign out" className='h-5 w-5 pointer-events-none' />
          </div>
          <img onClick={() => setTheme((prev) => prev === "light" ? "dark" : "light")} src={theme === "light" ? "/Dashboard/light.svg" : "/Dashboard/dark.svg"} alt="light mode" className='h-7 w-7 cursor-pointer' />
        </div>
      </div>
    </div>
  );
}

export default Profile;