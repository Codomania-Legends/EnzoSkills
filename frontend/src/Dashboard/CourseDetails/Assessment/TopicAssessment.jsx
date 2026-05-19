import React, { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

function TopicAssessment() {
    const [clickedCircle, setClickedCircle] = useState(null);
  
    const totalCircles = 20;
    const spheres = Array.from({ length: totalCircles });

    const handleCircleClick = (index) => {
        setClickedCircle(index);
        console.log(`Circle ${index + 1} clicked!`);
        // Add your custom logic here (e.g., open a modal, trigger an API, etc.)
    };
  return (
    <div className="container h-full mx-auto px-4 mt-5" >
        <div className="flex justify-evenly items-center w-2/10 mb-5">
            <img src="/Dashboard/Courses/Back.svg" alt="Back" className="h-4 w-4" />
            <h1 className="text-2xl h-[10%] font-bold">Topic Assessment</h1>
        </div>
        <div className="flex h-[90%] justify-between relative items-center">
            <div className="flex h-[90%] small-box-shadow rounded-4xl white w-[25%]  justify-center items-start ">
                <div className='w-full  grid grid-cols-5 gap-4  py-8 px-8'>
                   {spheres.map((_, index) => (
                    <button
                    key={index}
                    onClick={() => handleCircleClick(index)}
                    className={`w-10 h-10 rounded-full  cursor-pointer transition-transform duration-150 active:scale-95 focus:outline-none`}
                    style={{
                        background: clickedCircle === index ? '#534DB4' : 'radial-gradient(circle at 35% 35%, #ffffff 0%, #e2e8f0 70%, #94a3b8 100%)',
                        boxShadow: `
                            5px 5px 20px 0px rgba(58, 62, 108, 0.25),
                            inset 0px 5px 10px 0px rgba(255, 255, 255, 0.5),
                            inset -5px -5px 10px 0px rgba(58, 62, 108, 0.6)
                        `
                    }}
                    aria-label={`Circle ${index + 1}`}
                    />
                ))}
                </div>
            </div>
            <div className="flex h-full w-[70%] bg-blue justify-center items-center">
                <div className="test-container w-full h-full ">
                    <div className="flex justify-between font-bold mb-5 ">
                        <div className="flex justify-center items-center w-[30%] h-[10%]">Test 1 - JS Basics</div>
                        <div className="flex justify-center items-center w-[10%] h-[10%]">0:00</div>
                    </div>
                    <div className="test-heading font-[Syne]  flex justify-center items-center  mb-5">
                        <h1 className="text-2xl h-[10%] font-[900]">Topic Assessment</h1>
                    </div>
                    <div className="flex justify-center flex-col items-center w-full h-[90%] ">
                        {/* question div */}
                        <div className="question-container mb-5 relative w-full h-[20%] max-w-2xl items-center flex justify-center">
                            {/* question number */}
                            <div className="question-number small-box-shadow white w-10 h-10 rounded-full flex items-center justify-center font-bold text-black text-lg shrink-0 absolute left-12 z-40 ">
                                1
                            </div>
                            {/* question */}
                            <div className="flex items-center small-box-shadow rounded-4xl p-4 blue text-black px-6 py-4 w-[80%] h-[60%] relative"
                                >
                                <p className="font-semibold text-lg pl-4">What is the Event Loop?</p>
                            </div>
                        </div>

                        {/* optins div */}
                        <div className="grid grid-cols-2 gap-x-[20%] gap-y-10 w-full h-[60%] max-w-4xl p-8">
    
                            {/* Option A (Correct/Green State Example) */}
                            <div className="flex justify-center items-center relative pt-4">
                            <div 
                                className="w-10 h-10 rounded-full small-box-shadow green flex items-center justify-center font-bold text-black absolute top-4 left-1/2 -translate-x-1/2 z-10"
                            >
                                A
                            </div>
                            <button className="w-[70%] small-box-shadow green text-black font-medium py-5 px-6 rounded-2xl border-b-4 border-[#22993b] text-center active:scale-98 transition-transform small-box-shadow">
                                Me nahi bataungaa
                            </button>
                            </div>

                            {/* Option B (Incorrect/Red State Example) */}
                            <div className="flex justify-center items-center relative pt-4">
                            <div 
                                className="w-10 h-10 rounded-full small-box-shadow red flex items-center justify-center font-bold text-black absolute top-4 left-1/2 -translate-x-1/2 z-10"
                                
                            >
                                B
                            </div>
                            <button className="w-[70%] small-box-shadow red text-black font-medium py-5 px-6 rounded-2xl border-b-4 border-[#cc5347] text-center active:scale-98 transition-transform small-box-shadow">
                                Me nahi bataungaa
                            </button>
                            </div>

                            {/* Option C (Default/White State) */}
                            <div className="flex justify-center items-center relative pt-4">
                            <div 
                                className="w-10 h-10 rounded-full small-box-shadow purple2 flex items-center justify-center font-bold text-white absolute top-4 left-1/2 -translate-x-1/2 z-10"
                                
                            >
                                C
                            </div>
                            <button className="w-[70%] small-box-shadow white text-black font-medium py-5 px-6 rounded-2xl border-b-4 border-gray-200 text-center active:scale-98 transition-transform small-box-shadow">
                                Me nahi bataungaa
                            </button>
                            </div>

                            {/* Option D (Default/White State) */}
                            <div className="flex justify-center items-center relative pt-4">
                            <div 
                                className="w-10 h-10 rounded-full small-box-shadow blue flex items-center justify-center font-bold text-white absolute top-4 left-1/2 -translate-x-1/2 z-10"
                                
                            >
                                D
                            </div>
                            <button className="w-[70%] small-box-shadow white text-black font-medium py-5 px-6 rounded-2xl border-b-4 border-gray-200 text-center active:scale-98 transition-transform small-box-shadow">
                                Me nahi bataungaa
                            </button>
                            </div>

                        </div>

                        {/* next button div */}
                        {/* Bottom Navigation Buttons Container */}
                        <div className="w-full h-[10%] flex justify-between items-center px-8 mb-8">
                        
                            {/* LEFT BUTTON: Previous / Back (Gray 3D Sphere) */}
                            <button 
                                className="w-10 h-10 rounded-full flex items-center justify-center text-white/80 cursor-pointer transition-all duration-150 active:scale-95 focus:outline-none small-box-shadow gray "
                                
                                aria-label="Previous Question"
                            >
                                {/* Double Arrow Left Icon (using inline SVG) */}
                                <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                                </svg>
                            </button>

                            {/* RIGHT BUTTON: Next (Purple 3D Sphere) */}
                            <button 
                                className="w-10 h-10 rounded-full flex items-center justify-center text-white cursor-pointer transition-all duration-150 active:scale-95 focus:outline-none small-box-shadow blue"
                                
                                aria-label="Next Question"
                            >
                                {/* Double Arrow Right Icon (using inline SVG) */}
                                <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TopicAssessment