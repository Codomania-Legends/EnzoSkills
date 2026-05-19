import React from "react";

function Assessment() {
  return (
    /* 
      .assessment -> w-full h-[90vh] p-5 
    */
    <div className="w-full h-[90vh] p-5">
      
      {/* 
        .headings -> w-full h-[5vh] flex items-center justify-start gap-[10px] text-[25px] mb-[50px] 
      */}
      <div className="w-full h-[5vh] flex items-center justify-start gap-[10px] text-[25px] mb-[50px]">
        <i className="fa-solid fa-arrow-left"></i>
        <b>Fundamentals of JavaScript</b>
      </div>

      {/* 
        .mainSection -> w-full 
      */}
      <div className="w-full">
        
        {/* 
          .testSection -> w-full h-[25vh] bg-white rounded-[30px] p-[25px] flex items-center justify-between 
        */}
        <div className="w-full h-[25vh] bg-white rounded-[30px] p-[25px] flex items-center justify-between medium-box-shadow white">
          
          {/* 
            .weekbox -> w-[9%] h-[18vh] rounded-[15px] bg-[#d6d8ff] flex items-center justify-center 
          */}
          <div className="w-[9%] h-[18vh] rounded-[15px] bg-[#d6d8ff] flex items-center justify-center">
            week1 Day1
          </div>

          {/* 
            .testContent -> w-[80%] 
          */}
          <div className="w-[80%]">
            {/* 
              .testContent h2 -> text-[30px] mb-[35px] 
            */}
            <h2 className="text-[30px] mb-[35px]"><b>Your Assessment Test 1 : JS Basics</b></h2>
            
            {/* 
              .btnBox -> flex gap-[25px] 
            */}
            <div className="btnBox flex gap-[25px]">
              {/* 
                .learnBtn -> w-[20%] border-none py-3 px-[30px] rounded-[12px] bg-[#5ae45a] text-white text-[15px] 
              */}
              <button className="w-[20%] border-none py-3 px-[30px] rounded-[12px] bg-[#5ae45a] text-white text-[15px] small-box-shadow green">
                Learn for Test
              </button>
              
              {/* 
                .startBtn -> w-[20%] border-none py-3 px-[35px] rounded-[12px] bg-[#6c72ff] text-white text-[15px] 
              */}
              <button className="w-[20%] border-none py-3 px-[35px] rounded-[12px] bg-[#6c72ff] text-white text-[15px] small-box-shadow blue">
                Start Test
              </button>
            </div>
          </div>

          {/* 
            .arrowBox button -> h-[45px] w-[45px] border-none rounded-full bg-[#7a7cff] text-white shadow-[10px_10px_20px_rgba(58,62,108,0.5),_inset_0_5px_10px_rgba(255,255,255,0.5),_inset_-10px_-10px_20px_rgba(58,62,108,0.6)] 
          */}
          <div className="arrowBox">
            <button className="h-[45px] w-[45px] border-none rounded-full bg-[#7a7cff] text-white shadow-[10px_10px_20px_rgba(58,62,108,0.5),_inset_0_5px_10px_rgba(255,255,255,0.5),_inset_-10px_-10px_20px_rgba(58,62,108,0.6)]">
              <i className="fa-solid fa-angles-right"></i>
            </button>
          </div>
        </div>

        {/* 
          .bottomSection -> w-full mt-[180px] flex justify-between items-center 
        */}
        <div className="w-full mt-[180px] flex justify-between items-center">
          
          {/* 
            .finalBox button -> border-none py-[15px] px-[30px] rounded-[20px] bg-[#4e53e6] text-white shadow-[10px_10px_20px_rgba(58,62,108,0.5),_inset_0_5px_10px_rgba(255,255,255,0.5),_inset_-10px_-10px_20px_rgba(58,62,108,0.6)] 
          */}
          <div className="finalBox">
            <button className="border-none py-[15px] px-[30px] rounded-[20px] bg-[#4e53e6] text-white shadow-[10px_10px_20px_rgba(58,62,108,0.5),_inset_0_5px_10px_rgba(255,255,255,0.5),_inset_-10px_-10px_20px_rgba(58,62,108,0.6)]">
              Final Assessment
            </button>
          </div>

          {/* 
            .quoteBox -> text-right border-r-4 border-black pr-[15px] 
          */}
          <div className="text-right border-r-4 border-black pr-[15px]">
            {/* .quoteBox h2 -> text-[22px] */}
            <h2 className="text-[22px]">
              Test is about to challenge how much you have learned.
            </h2>
            {/* .quoteBox h1 -> text-[30px] mt-[10px] */}
            <h1 className="text-[30px] mt-[10px]">
              NOT 
            </h1>
            {/* .quoteBox h2 -> text-[22px] */}
            <h2 className="text-[22px]">
              to judge your FUTURE.
            </h2>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Assessment;