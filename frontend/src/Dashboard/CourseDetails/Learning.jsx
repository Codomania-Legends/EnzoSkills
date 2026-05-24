import React from 'react';
import { useCourse } from '../../Utility/Course';
import { useNavigate } from 'react-router';

function Resource({ number, title }) {
  return (
    /* my-5 preserved for desktop, reduced slightly on mobile to save space */
    <div className="flex items-center gap-[10px] my-3 md:my-5">
      <h2 className="text-[22px] md:text-[28px] font-bold">{number}</h2>
      <p className="text-sm md:text-base">{title}</p>
    </div>
  );
}

function Learning() {
  const { currentCourse } = useCourse();
  const navigate = useNavigate();
  const weeks = [
    { week1: ["Test 1", "Test 2"] },
    { week2: ["Test 3", "Test 4"] },
    { week3: ["Test 5", "Test 6"] },
    { week4: ["Test 7", "Test 8"] }
  ];

  return (
    /* Desktop maintains exact absolute positioning; mobile changes to block layout to fit screen */
    <div className="h-full w-[95%] md:w-[90%] flex flex-col justify-start md:justify-center items-center relative md:absolute md:left-[10%] p-4 md:p-0 mb-10 md:mb-0">
      
      {/* 
        .heading -> w-full h-[5vh] flex items-center justify-start gap-[10px] text-[24px] absolute left-0 top-[5%] 
      */}
      <div className="w-full h-[5vh] flex items-center justify-start gap-[10px] text-[24px] absolute left-0 top-[5%] cursor-pointer" onClick={() => navigate(`/dashboard/courses/overview/${currentCourse?.course_id || currentCourse?.id}`)}>
        <img src="/Dashboard/Courses/Back.svg" alt="Back" className="h-6 w-6" />
        <b>{currentCourse?.course_name || "Loading..."}</b>
      </div>

      {/* Main Container: Original flex layout and gap preserved for laptop (md:) */}
      <div className="w-full h-auto md:h-[80vh] flex flex-col md:flex-row gap-[25px] mt-0 md:mt-5">
        
        {/* LEFT SECTION: Learning & Resource Box (Width remains exactly 30% on laptop) */}
        <div className="w-full md:w-[30%] order-2 md:order-1">
          <div className="w-full h-auto md:h-[15vh] py-3 md:py-0 flex items-center justify-start md:justify-center font-semibold text-lg">
            Week1 Day1
          </div>
          
          <div className="mb-[15px] md:mb-[25px] flex items-center justify-start">
            <p className="text-sm md:text-base">• Learning & Understanding what JS is?</p>
          </div>
          
          {/* Scroll restriction added ONLY for mobile screens so it doesn't trail off forever */}
          <div className="mb-5 max-h-[35vh] md:max-h-none overflow-y-auto pr-2">
            <h2 className="text-lg md:text-xl"><b>Resources to Learn</b></h2>
            <Resource number="1" title="JS Basics" />
            <Resource number="2" title="JS Understanding" />
            <Resource number="3" title="Data Types" />
            <Resource number="4" title="Data Types" />
            <Resource number="5" title="Data Types" />
            <Resource number="6" title="Data Types" />
          </div>
        </div>

        {/* RIGHT SECTION: Content Box (Retains exact original properties, sizes, and shadow styling on laptop) */}
        <div className="w-full md:w-[60%] h-auto md:h-[90%] bg-white rounded-[25px] p-5 md:p-[30px] order-1 md:order-2 shadow-[20px_20px_40px_rgba(58,62,108,0.5),_inset_15px_15px_30px_rgba(255,255,255,0.532),_inset_-20px_-20px_30px_rgba(40,43,75,0.6)]">
          
          {/* 
            .introHeading -> mb-[25px] 
            .introHeading h2 -> text-[28px]
          */}
          <div className="mb-[25px]">
            <h2 className="text-[28px]"><b>Introduction to {currentCourse?.course_name || "Course"}</b></h2>
          </div>
          
          {/* Internal scroll wrapper safely added for text-heavy content on smaller phone layouts */}
          <div className="leading-[26px] md:leading-[30px] text-sm md:text-[16px] max-h-[40vh] md:max-h-[50vh] overflow-y-auto pr-2">
            <p>
              {currentCourse?.longDescription || currentCourse?.description || "Course details will be loaded here. Dive into the modules on the left to start your learning journey!"}
            </p>
          </div>
          
          {/* Controls Footer Area */}
          <div className="w-full h-auto md:h-[10vh] flex items-center justify-between md:justify-center mt-6 md:mt-0 relative">
            <img 
              className="h-[18px] w-[18px] md:absolute md:bottom-[22%] static" 
              src="/Courses/Polygon_3.png" 
              alt="Down Arrow" 
            />
            
            {/* Laptop maintains exact width (11vw) and absolute positions; mobile shifts cleanly to a padded layout */}
            <button className="px-2 py-1 md:px-6 md:py-2 border-none rounded-[10px] text-black md:absolute md:right-[12%] md:bottom-[26.5%] font-semibold small-box-shadow blue text-sm md:text-lg">
              Roadmap
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Learning;