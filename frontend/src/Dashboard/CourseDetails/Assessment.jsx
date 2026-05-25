import React, { useState, useRef } from "react";
import { useCourse } from '../../Utility/Course';
import { useNavigate } from 'react-router';
import Calender from "../../Utility/Calender";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function Assessment() {
  const { currentCourse } = useCourse();
  const navigate = useNavigate();
  const container = useRef(null);

  useGSAP(() => {
    gsap.fromTo(container.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
  }, { scope: container });

  // Selected filter states
  const [selectedWeek, setSelectedWeek] = useState("Week 1");
  const [selectedDay, setSelectedDay] = useState(null);

  const weeksData = [
    { "Week 1": ["Day 1", "Day 2", "Day 3 Test", "Day 4", "Day 5"] },
    { "Week 2": ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5 Test"] },
    { "Week 4": ["Day 1 Test", "Day 2", "Day 3", "Day 4", "Day 5"] },
    { "Week 5": ["Day 1", "Day 2", "Day 3", "Day 4 Test", "Day 5"] },
  ];

  const calenderWeeks = weeksData.map(week => {
    const key = Object.keys(week)[0];
    return {
      [key]: week[key].filter(day => day.includes("Test"))
    };
  });

  const assessmentData = [
    {
      id: 1,
      week: "Week 1",
      day: "Day 3",
      title: "Fundamentals & Core Concepts",
      timeLimit: "45 Mins",
      questions: [
        { question: "What is the virtual DOM?", options: ["A copy of actual DOM", "A CSS framework", "A database"], correctAnswer: "A copy of actual DOM" }
      ]
    },
    {
      id: 2,
      week: "Week 2",
      day: "Day 5",
      title: "Intermediate Applications",
      timeLimit: "60 Mins",
      questions: [
        { question: "Which hook is used for side effects in React?", options: ["useState", "useEffect", "useMemo"], correctAnswer: "useEffect" }
      ]
    },
    {
      id: 3,
      week: "Week 4",
      day: "Day 1",
      title: "Advanced Problem Solving",
      timeLimit: "90 Mins",
      questions: [
        { question: "What is the purpose of Redux?", options: ["Database", "State management", "Routing"], correctAnswer: "State management" }
      ]
    },
    {
      id: 4,
      week: "Week 5",
      day: "Day 4",
      title: "Architecture & Best Practices",
      timeLimit: "60 Mins",
      questions: [
        { question: "What does JWT stand for?", options: ["Java Web Token", "JSON Web Token", "JS Web Token"], correctAnswer: "JSON Web Token" }
      ]
    },
  ];

  // Logic to filter assessments when you click the calendar
  const filteredAssessments = assessmentData.filter(test => {
    if (!selectedDay) return false; // Hide all until a day is clicked
    const cleanDay = selectedDay.replace(" Test", "");
    return test.week === selectedWeek && test.day === cleanDay;
  });

  const handleDaySelect = (weekName, dayName) => {
    setSelectedWeek(weekName);
    setSelectedDay(dayName);
  };

  const courseId = currentCourse?.course_id || currentCourse?.id;
  const completedTests = JSON.parse(localStorage.getItem('completed_assessments') || '{}')[courseId] || [];

  return (
    <div ref={container} className="w-full h-[90vh] p-5">
      <div className="w-full h-[5vh] flex items-center justify-start gap-[10px] text-[25px] mb-[30px] cursor-pointer" onClick={() => navigate(`/dashboard/courses/overview/${courseId}`)}>
        <img src="/Dashboard/Courses/Back.svg" alt="Back" className="h-6 w-6" />
        <b>{currentCourse?.course_name || "Loading..."}</b>
      </div>

      {/* Flex container holding Calendar on Left and Assessments on Right */}
      <div className="w-full flex gap-10">

        {/* Left Side: Calendar (20% width) */}
        <div className="w-[20%]">
          <Calender Weeks={calenderWeeks} onDaySelect={handleDaySelect} />
        </div>

        {/* Right Side: Assessment Details (80% width) */}
        <div className="w-[80%] flex flex-col gap-6 max-h-[70vh] h-full overflow-visible pr-4 custom-scrollbar justify-between items-center">

          {filteredAssessments.length > 0 ? (
            filteredAssessments.map((assessment, index) => {
              const isCompleted = completedTests.includes(assessment.id);

              return (
                <div key={index} className={`w-full bg-white rounded-3xl p-6 flex items-center justify-between medium-box-shadow white border-2 ${isCompleted ? 'border-green-400' : 'border-transparent'}`}>
                  <div className="w-[12%] h-[15vh] rounded-[15px] bg-[#d6d8ff] flex flex-col items-center justify-center font-bold text-gray-700 relative overflow-hidden">
                    {isCompleted && <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] px-2 py-1 rounded-bl-lg">DONE</div>}
                    <span>{assessment.week}</span>
                    <span>{assessment.day}</span>
                  </div>

                  <div className="w-[75%] flex flex-col justify-center">
                    <h2 className="text-2xl font-bold mb-2">Test {assessment.id} : {currentCourse?.course_name || "Assessment"} - {assessment.title}</h2>

                    <div className="flex gap-6 mb-4 text-sm font-semibold text-gray-600">
                      <span className="flex items-center gap-2">
                        <i className="fa-regular fa-clock"></i> Time: {assessment.timeLimit}
                      </span>
                      <span className="flex items-center gap-2">
                        <i className="fa-solid fa-list-check"></i> Questions: {assessment.questions.length}
                      </span>
                    </div>

                    <div className="flex gap-4">
                      <button className="px-6 py-2 border-none rounded-xl bg-[#5ae45a] text-white font-bold small-box-shadow green hover:opacity-90">
                        Learn for Test
                      </button>
                      {isCompleted ? (
                        <button
                          className="px-6 py-2 border-none rounded-xl bg-gray-200 text-gray-600 font-bold small-box-shadow cursor-default"
                        >
                          Completed ✅
                        </button>
                      ) : (
                        <button
                          className="px-6 py-2 border-none rounded-xl bg-[#6c72ff] text-white font-bold small-box-shadow blue hover:opacity-90"
                          onClick={() => navigate(`/dashboard/courses/assessment/topic/${courseId}`, { state: { assessment } })}
                        >
                          Start Test
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <button className="h-12 w-12 border-none rounded-full bg-[#7a7cff] text-white shadow-md hover:scale-105 transition-transform flex items-center justify-center small-box-shadow blue">
                      <i className="fa-solid fa-angles-right"></i>
                    </button>
                  </div>
                </div>
              )
            })
          ) : !selectedDay ? (
            <div className="w-full bg-white rounded-3xl p-10 flex items-center justify-center medium-box-shadow white text-gray-500 font-bold text-xl">
              Please select a test from the calendar to view details 📅
            </div>
          ) : (
            <div className="w-full bg-white rounded-3xl p-10 flex items-center justify-center medium-box-shadow white text-gray-500 font-bold text-xl">
              No assessments scheduled for {selectedWeek} - {selectedDay} 📭
            </div>
          )}

          {/* Restored the original mt-10 style for your motivational text box! */}
          <div className="w-full mt-10 flex justify-between items-center bg-white p-8 rounded-3xl medium-box-shadow white mb-10">
            <div className="finalBox">
              <button className="border-none py-4 px-8 rounded-2xl bg-[#4e53e6] text-white font-bold shadow-md hover:bg-blue-600 transition-colors small-box-shadow blue">
                Final Assessment 🏆
              </button>
            </div>

            <div className="text-right border-r-4 border-[#6c72ff] pr-6">
              <h2 className="text-xl text-gray-600 font-semibold">
                Test is about to challenge how much you have learned.
              </h2>
              <h1 className="text-4xl font-black mt-2 text-gray-800 tracking-wider">
                NOT
              </h1>
              <h2 className="text-xl text-gray-600 font-semibold mt-1">
                to judge your FUTURE.
              </h2>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Assessment;