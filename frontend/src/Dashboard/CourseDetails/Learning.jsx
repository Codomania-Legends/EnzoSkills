import React, { useRef, useState } from 'react';
import { useCourse } from '../../Utility/Course';
import { useNavigate } from 'react-router';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Calender from '../../Utility/Calender';

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
  const container = useRef(null);

  useGSAP(() => {
    gsap.fromTo(container.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
  }, { scope: container });
  const [selectedDayKey, setSelectedDayKey] = useState("Week 1 Day 1");

  const weeks = [
    { "Week 1": ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"] },
    { "Week 2": ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"] },
    { "Week 3": ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"] },
    { "Week 4": ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"] }
  ];

  const courseContentData = {
    "Week 1 Day 1": {
      topic: "Learning & Understanding what JS is?",
      resources: [
        { number: "1", title: "JS Basics" },
        { number: "2", title: "JS Understanding" },
        { number: "3", title: "Data Types Overview" },
      ],
      title: "Introduction to JavaScript",
      content: "Welcome to JavaScript! Today we'll cover the fundamental concepts of JS. You'll learn how it interacts with the browser, basic syntax, and why it's the language of the web. Dive into the resources on the left to get started!"
    },
    "Week 1 Day 2": {
      topic: "Variables & Data Types",
      resources: [
        { number: "1", title: "Let, Const, Var" },
        { number: "2", title: "Primitive Types" },
        { number: "3", title: "Type Conversion" },
      ],
      title: "Mastering Variables",
      content: "Variables are the building blocks of any program. Today we explore how to store data using variables, the differences between let, const, and var, and the various data types JS supports."
    },
    "Week 1 Day 3": {
      topic: "Functions & Scope",
      resources: [
        { number: "1", title: "Function Declarations" },
        { number: "2", title: "Arrow Functions" },
        { number: "3", title: "Scope Chain" },
      ],
      title: "Functions and Logic",
      content: "Time to make our code reusable! Functions allow us to write logic once and use it anywhere. We will also learn about block scope vs global scope."
    },
    "default": {
      topic: "Advanced Topics & Practice",
      resources: [
        { number: "1", title: "Practice Problem 1" },
        { number: "2", title: "Practice Problem 2" },
      ],
      title: "Learning Module",
      content: "Select a day from the calendar to view the specific topics, resources, and materials required for your learning journey."
    }
  };

  const currentDayData = courseContentData[selectedDayKey] || courseContentData["default"];

  return (
    /* Desktop maintains exact absolute positioning; mobile changes to block layout to fit screen */
    <div ref={container} className="h-full w-[95%] md:w-[90%] flex flex-col justify-start md:justify-center items-center relative md:absolute md:left-[10%] p-4 md:p-0 mb-10 md:mb-0">

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
        {/* LEFT SECTION: Learning & Resource Box (Width remains exactly 30% on laptop) */}
        <div className="w-full md:w-[30%] order-2 md:order-1 flex flex-col items-center">

          <div className="w-full flex justify-center mb-4">
            <Calender
              Weeks={weeks}
              onDaySelect={(week, day) => setSelectedDayKey(`${week} ${day}`)}
            />
          </div>

          <div className="w-full flex items-center justify-start md:justify-center font-semibold text-lg mb-2">
            {selectedDayKey}
          </div>

          <div className="mb-[15px] md:mb-[25px] flex items-center justify-start w-full">
            <p className="text-sm md:text-base">• {currentDayData.topic}</p>
          </div>

          {/* Scroll restriction added ONLY for mobile screens so it doesn't trail off forever */}
          <div className="mb-5 max-h-[35vh] md:max-h-none overflow-y-auto pr-2 w-full">
            <h2 className="text-lg md:text-xl mb-3"><b>Resources to Learn</b></h2>
            {currentDayData.resources.map((res, i) => (
              <Resource key={i} number={res.number} title={res.title} />
            ))}
          </div>
        </div>

        {/* RIGHT SECTION: Content Box (Retains exact original properties, sizes, and shadow styling on laptop) */}
        <div className="w-full md:w-[60%] h-auto md:h-[90%] bg-white rounded-[25px] p-5 md:p-[30px] order-1 md:order-2 shadow-[20px_20px_40px_rgba(58,62,108,0.5),_inset_15px_15px_30px_rgba(255,255,255,0.532),_inset_-20px_-20px_30px_rgba(40,43,75,0.6)]">

          {/* 
            .introHeading -> mb-[25px] 
            .introHeading h2 -> text-[28px]
          */}
          <div className="mb-[25px]">
            <h2 className="text-[28px]"><b>{currentDayData.title}</b></h2>
          </div>

          {/* Internal scroll wrapper safely added for text-heavy content on smaller phone layouts */}
          <div className="leading-[26px] md:leading-[30px] text-sm md:text-[16px] max-h-[40vh] md:max-h-[50vh] overflow-y-auto pr-2">
            <p>
              {currentDayData.content}
            </p>
          </div>

          {/* Controls Footer Area */}
          <div className="w-full h-auto md:h-[10vh] flex items-center justify-between md:justify-center mt-6 md:relative md:bottom-[-35%]">
            <img
              className="h-[18px] w-[18px] md:absolute md:bottom-[0%] static"
              src="/scroll-down.svg"
              alt="Down Arrow"
            />

            {/* Laptop maintains exact width (11vw) and absolute positions; mobile shifts cleanly to a padded layout */}
            <button onClick={() => navigate(`/dashboard/courses/roadmap/${currentCourse?.course_id}`)} className="px-2 py-1 md:px-6 md:py-2 border-none rounded-[10px] text-black md:absolute md:right-[8%] md:bottom-[40%] font-semibold small-box-shadow blue text-sm md:text-lg">
              Roadmap
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Learning;