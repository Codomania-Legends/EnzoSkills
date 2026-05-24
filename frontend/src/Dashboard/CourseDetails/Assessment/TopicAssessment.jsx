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
    };

    return (
        /* Laptop h-full preserved. Mobile falls back to clean column flow */
        <div className="container h-full md:h-full mx-auto px-4 mt-5" >
            <div className="flex justify-start md:justify-evenly items-center gap-4 w-full md:w-2/10 mb-5">
                <img src="/Dashboard/Courses/Back.svg" alt="Back" className="h-4 w-4" />
                <h1 className="text-xl md:text-2xl font-bold">Topic Assessment</h1>
            </div>

            {/* Layout flips into vertical column block layout exclusively on mobile viewports */}
            <div className="flex flex-col md:flex-row h-full md:h-[90%] gap-6 md:gap-0 justify-between relative items-center">
                
                {/* LEFT PANEL: Tracker grid (Converts to 10 wide on mobile screen widths) */}
                <div className="flex h-full md:h-[90%] small-box-shadow rounded-4xl white w-full md:w-[25%] justify-center items-start">
                    <div className='w-full grid grid-cols-10 md:grid-cols-5 gap-3 md:gap-4 py-4 md:py-8 px-4 md:px-8 justify-items-center'>
                       {spheres.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleCircleClick(index)}
                            className={`w-8 h-8 md:w-10 md:h-10 rounded-full cursor-pointer transition-transform duration-150 active:scale-95 focus:outline-none`}
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

                {/* RIGHT PANEL: Live Question & Option Interface */}
                <div className="flex h-auto md:h-full w-full md:w-[70%] bg-blue justify-center items-center rounded-4xl md:rounded-none">
                    <div className="test-container w-full h-full p-4 md:p-0">
                        
                        <div className="flex justify-between font-bold mb-5 px-2">
                            <div className="text-sm md:text-base">Test 1 - JS Basics</div>
                            <div className="text-sm md:text-base">0:00</div>
                        </div>
                        
                        <div className="test-heading font-[Syne] flex justify-center items-center mb-5">
                            <h1 className="text-xl md:text-2xl font-[900]">Topic Assessment</h1>
                        </div>

                        <div className="flex justify-center flex-col items-center w-full h-auto md:h-[90%]">
                            
                            {/* Question Container block */}
                            <div className="question-container mb-5 relative w-full h-auto md:h-[20%] max-w-2xl items-center flex justify-center">
                                {/* Fixed badge alignment variables avoid layout bleeding */}
                                <div className="question-number small-box-shadow white w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-black text-sm md:text-lg shrink-0 absolute left-2 md:left-12 z-40">
                                    1
                                </div>
                                <div className="flex items-center small-box-shadow rounded-4xl p-4 blue text-black pl-14 pr-6 py-4 w-[95%] md:w-[80%] min-h-[60px] md:h-[60%] relative">
                                    <p className="font-semibold text-sm md:text-lg">What is the Event Loop?</p>
                                </div>
                            </div>

                            {/* Option Box Layout (Flips to 1 Column on mobile devices) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 md:gap-x-[20%] gap-y-6 md:gap-y-10 w-full h-auto md:h-[60%] max-w-4xl p-4 md:p-8">
        
                                {/* Option A */}
                                <div className="flex justify-center items-center relative pt-4">
                                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full small-box-shadow green flex items-center justify-center font-bold text-black absolute top-1 md:top-4 left-1/2 -translate-x-1/2 z-10">
                                        A
                                    </div>
                                    <button className="w-full md:w-[70%] text-sm md:text-base small-box-shadow green text-black font-medium py-4 md:py-5 px-6 rounded-2xl border-b-4 border-[#22993b] text-center active:scale-98 transition-transform">
                                        Me nahi bataungaa
                                    </button>
                                </div>

                                {/* Option B */}
                                <div className="flex justify-center items-center relative pt-4">
                                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full small-box-shadow red flex items-center justify-center font-bold text-black absolute top-1 md:top-4 left-1/2 -translate-x-1/2 z-10">
                                        B
                                    </div>
                                    <button className="w-full md:w-[70%] text-sm md:text-base small-box-shadow red text-black font-medium py-4 md:py-5 px-6 rounded-2xl border-b-4 border-[#cc5347] text-center active:scale-98 transition-transform">
                                        Me nahi bataungaa
                                    </button>
                                </div>

                                {/* Option C */}
                                <div className="flex justify-center items-center relative pt-4">
                                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full small-box-shadow purple2 flex items-center justify-center font-bold text-white absolute top-1 md:top-4 left-1/2 -translate-x-1/2 z-10">
                                        C
                                    </div>
                                    <button className="w-full md:w-[70%] text-sm md:text-base small-box-shadow white text-black font-medium py-4 md:py-5 px-6 rounded-2xl border-b-4 border-gray-200 text-center active:scale-98 transition-transform">
                                        Me nahi bataungaa
                                    </button>
                                </div>

                                {/* Option D */}
                                <div className="flex justify-center items-center relative pt-4">
                                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full small-box-shadow blue flex items-center justify-center font-bold text-white absolute top-1 md:top-4 left-1/2 -translate-x-1/2 z-10">
                                        D
                                    </div>
                                    <button className="w-full md:w-[70%] text-sm md:text-base small-box-shadow white text-black font-medium py-4 md:py-5 px-6 rounded-2xl border-b-4 border-gray-200 text-center active:scale-98 transition-transform">
                                        Me nahi bataungaa
                                    </button>
                                </div>

                            </div>

                            {/* Pagination Button Footer Bar */}
                            <div className="w-full h-auto md:h-[10%] flex justify-between items-center px-4 md:px-8 mt-4 mb-4">
                                <button 
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-white/80 cursor-pointer transition-all duration-150 active:scale-95 focus:outline-none small-box-shadow gray"
                                    aria-label="Previous Question"
                                >
                                    <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                                    </svg>
                                </button>

                                <button 
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-white cursor-pointer transition-all duration-150 active:scale-95 focus:outline-none small-box-shadow blue"
                                    aria-label="Next Question"
                                >
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

export default TopicAssessment;