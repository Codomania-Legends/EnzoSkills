import React from "react";
import { useNavigate } from "react-router";

function Assessment() {
  const navigate = useNavigate();
  return (
    /* Laptop h-[90vh] preserved. On mobile, we let the height adjust dynamically to content */
    <div className="w-full h-auto md:h-[90vh] p-5 overflow-scroll md:overflow-hidden">
      
      {/* Headings: Adjusted font size and spacing dynamically */}
      <div className="w-full h-auto md:h-[5vh] flex items-center justify-start gap-[10px] text-[20px] md:text-[25px] mb-[30px] md:mb-[50px]">
        <i className="fa-solid fa-arrow-left"></i>
        <b>Fundamentals of JavaScript</b>
      </div>

      <div className="w-full">
        
        {/* Test Section Box: Swaps from row (desktop) to column (mobile) */}
        <div className="w-full h-auto md:h-[25vh] bg-white rounded-[30px] p-[20px] md:p-[25px] flex flex-col md:flex-row items-center justify-between gap-5 md:gap-0 medium-box-shadow white">
          
          {/* Week Box: Changed from strict 9% width to auto/full padding on mobile */}
          <div className="w-full md:w-[9%] h-[8vh] md:h-[18vh] rounded-[15px] bg-[#d6d8ff] flex items-center justify-center font-semibold text-center text-sm md:text-base whitespace-nowrap px-4 md:px-0">
            week1 Day1
          </div>

          {/* Test Content Wrapper */}
          <div className="w-full md:w-[80%] text-center md:text-left">
            {/* Title font scales down on mobile */}
            <h2 className="text-[20px] md:text-[30px] mb-[20px] md:mb-[35px]">
              <b>Your Assessment Test 1 : JS Basics</b>
            </h2>
            
            {/* Interactive Buttons Layout */}
            <div className="btnBox flex flex-col sm:flex-row gap-4 md:gap-[25px] justify-center md:justify-start">
              <button className="w-full sm:w-auto md:w-[20%] border-none py-3 px-[30px] rounded-[12px] bg-[#5ae45a] text-white text-[15px] font-medium small-box-shadow green">
                Learn for Test
              </button>
              
              <button 
                className="w-full sm:w-auto md:w-[20%] border-none py-3 px-[35px] rounded-[12px] bg-[#6c72ff] text-white text-[15px] font-medium small-box-shadow blue"
                onClick={() => navigate("/dashboard/courses/topic/:id")}
              >
                Start Test
              </button>
            </div>
          </div>

          {/* Side Chevron Arrow Action Button */}
          <div className="arrowBox md:block hidden">
            <button className="h-[45px] w-[45px] border-none rounded-full bg-[#7a7cff] text-white shadow-[10px_10px_20px_rgba(58,62,108,0.5),_inset_0_5px_10px_rgba(255,255,255,0.5),_inset_-10px_-10px_20px_rgba(58,62,108,0.6)]">
              <i className="fa-solid fa-angles-right"></i>
            </button>
          </div>
        </div>

        {/* Bottom Section: Pushed down via mt-20 on mobile, mt-[180px] on desktop */}
        <div className="w-full mt-20 md:mt-[180px] flex flex-col md:flex-row gap-10 md:gap-0 justify-between items-center">
          
          {/* Final Assessment Action Banner */}
          <div className="finalBox w-full md:w-auto text-center">
            <button 
              className="w-full md:w-auto border-none py-[15px] px-[30px] rounded-[20px] text-white font-medium small-box-shadow darker-blue"
              onClick={() => navigate("/dashboard/courses/final/:id")}
            >
              Final Assessment
            </button>
          </div>

          {/* Right-aligned Typography Quote Area */}
          <div className="w-full md:w-auto text-center md:flex md:flex-col hidden md:text-right border-b-4 md:border-b-0 md:border-r-4 border-black pb-4 md:pb-0 pr-0 md:pr-[15px]">
            <h2 className="text-[16px] md:text-[22px] leading-relaxed">
              Test is about to challenge how much you have learned.
            </h2>
            <h1 className="text-[24px] md:text-[30px] font-black my-1 md:mt-[10px]">
              NOT 
            </h1>
            <h2 className="text-[16px] md:text-[22px] leading-relaxed">
              to judge your FUTURE.
            </h2>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Assessment;