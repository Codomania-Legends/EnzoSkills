import React, { useEffect } from 'react'
import { useCourse } from '../../Utility/Course'
import { useNavigate } from 'react-router';


function ScoreCard() {
    const { currentCourse } = useCourse();
    const navigate = useNavigate();

    const testDetails = [
        {
            name: "Test 1",
            score: 80,
            total: 100,
            status: "pass",
            timeTaken: "20:00",
            date: "2022-01-01",
            day: "Monday"
        },
        {
            name: "Test 2",
            score: 70,
            total: 100,
            status: "pass",
            timeTaken: "20:00",
            date: "2022-01-01",
            day: "Tuesday"
        },
        {
            name: "Test 3",
            score: 60,
            total: 100,
            status: "pass",
            timeTaken: "20:00",
            date: "2022-01-01",
            day: "Wednesday"
        }
    ]

    const insights = [
        "Reflection: Your frontend architecture is good, but your foundational concepts are not fully clear yet. You need to focus more on the basics."
    ];

    const studyPlan = [
        "Week 1: Review core HTML semantics, accessibility, and DOM manipulation.",
        "Week 2: Master CSS fundamentals, including the Box Model, Flexbox, and CSS Grid.",
        "Week 3: Deep dive into JavaScript basics (Variables, Closures, Promises, and the Event Loop).",
        "Week 4: Build a small, functional web application using only Vanilla JS to solidify your foundational knowledge."
    ];

    const recommendations = [
        "• Build at least two small projects without using any frontend frameworks (Vanilla JS only).",
        "• Dedicate 30 minutes daily to reading MDN Web Docs on core JavaScript concepts.",
        "• Practice solving basic algorithmic problems to strengthen your logical problem-solving skills.",
        "• Refactor one of your older projects to apply the new basic concepts you've learned."
    ];

    const notes = [
        "Progress Note: Great job grasping the macro-level architecture! 🚀 Once you bridge the gaps in the micro-level basics, your overall development skills will be incredibly strong."
    ];

    return (
        <div className="container h-full mx-auto px-4 mt-5 flex flex-col items-center">

            <div className="flex justify-start w-[90%] mb-5 cursor-pointer" onClick={() => navigate("/dashboard/courses")}>
                <div className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <img src="/Dashboard/Courses/Back.svg" alt="Back" className="h-3 w-3" />
                    <h1 className="text-lg font-black">Performance Overview - {currentCourse?.course_name}</h1>
                </div>
            </div>

            <div className='flex flex justify-between items-center w-full h-full gap-10'>
                <AssessmentCard testDetails={testDetails[Math.floor(Math.random() * testDetails.length)]} />

                <div className='flex flex-col justify-evenly items-center h-full'>
                    <AiInsights insights={insights} />
                    <Recommendations recommendations={recommendations} />
                </div>

                <div className='flex flex-col justify-evenly items-center h-full'>
                    <StudyPlan studyPlan={studyPlan} />
                    <Notes notes={notes} />
                </div>

            </div>
        </div>
    )
}

function AssessmentCard({ testDetails }) {
    return (
        <div className="white medium-box-shadow flex justify-evenly w-full rounded-3xl py-4 px-2 items-center h-1/2">
            <div className='score-chart'>
                <h1 className='text-center font-bold'>Overall Performance</h1>
                <div className="chart-container" style={{ width: '200px', height: '200px' }}>
                    <div className='m-3 rounded-full purplish small-box-shadow flex justify-center items-center aspect-square' >
                        <div style={{ boxShadow: "inset rgba(0, 0, 0, 0.2) 8px 12px 4px" }} className='bg-white rounded-full aspect-square flex justify-center items-center p-8 text-2xl font-bold '>
                            {testDetails.score}%
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col justify-between h-full gap-2 h-full'>
                <p className='flex-1 text-right'><span className='font-bold'>Name:</span> {testDetails.name}</p>
                <p className='flex-1 text-right'><span className='font-bold'>Date:</span> {testDetails.date}</p>
                <p className='flex-1 text-right'><span className='font-bold'>Day:</span> {testDetails.day}</p>
                <p className='flex-1 text-right'><span className='font-bold'>Score:</span> {testDetails.score} / {testDetails.total}</p>
                <p className='flex-1 text-right'><span className='font-bold'>Time Taken:</span> {testDetails.timeTaken}</p>
                <p className='flex-1 text-right'><span className='font-bold'>Status:</span> <span className={`${testDetails.status === "pass" ? "green" : "red"} ml-2`}>{testDetails.status}</span></p>
            </div>
        </div>
    )
}

function AiInsights({ insights }) {
    return (
        <div className="white medium-box-shadow flex flex-col justify-evenly w-full rounded-3xl p-4 items-center">
            <h1 className='text-lg font-bold mb-3'>Ai Insights</h1>
            {insights.map((insight, index) => (
                <p className='text-sm' key={index}>{insight}</p>
            ))}
        </div>
    )
}

function Recommendations({ recommendations }) {
    return (
        <div className="white medium-box-shadow flex flex-col justify-evenly w-full rounded-3xl p-4 items-center">
            <h1 className='text-lg font-bold mb-3'>Recommendations</h1>
            {recommendations.map((recommendation, index) => (
                <p className='text-sm' key={index}>{recommendation}</p>
            ))}
        </div>
    )
}

function StudyPlan({ studyPlan }) {
    return (
        <div className="white medium-box-shadow flex flex-col justify-evenly w-full rounded-3xl p-4 items-center">
            <h1 className='text-lg font-bold mb-3'>Study Plan</h1>
            {studyPlan.map((plan, index) => (
                <p className='text-sm mb-2' key={index}>{plan}</p>
            ))}
        </div>
    )
}

function Notes({ notes }) {
    return (
        <div className="white medium-box-shadow flex flex-col justify-evenly w-full rounded-3xl p-4 items-center">
            <h1 className='text-lg font-bold mb-3'>Notes</h1>
            {notes.map((note, index) => (
                <p className='text-sm' key={index}>{note}</p>
            ))}
        </div>
    )
}

export default ScoreCard