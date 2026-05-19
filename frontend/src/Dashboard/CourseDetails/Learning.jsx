import React from 'react';

// Converted Resource styles:
// .resource -> flex items-center gap-[10px] my-5
// .resource h2 -> text-[28px]
function Resource({ number, title }) {
  return (
    <div className="flex items-center gap-[10px] my-5">
      <h2 className="text-[28px]">{number}</h2>
      <p>{title}</p>
    </div>
  );
}

function Learning() {
  const weeks = [
    { week1: ["Test 1", "Test 2"] },
    { week2: ["Test 3", "Test 4"] },
    { week3: ["Test 5", "Test 6"] },
    { week4: ["Test 7", "Test 8"] }
  ];

  return (
    /* 
      .dash -> h-full w-[90%] flex flex-col justify-center items-center absolute left-[10%] 
    */
    <div className="h-full w-[90%] flex flex-col justify-center items-center absolute left-[10%]">
      
      {/* 
        .heading -> w-full h-[5vh] flex items-center justify-start gap-[10px] text-[24px] absolute left-0 top-[5%] 
      */}
      <div className="w-full h-[5vh] flex items-center justify-start gap-[10px] text-[24px] absolute left-0 top-[5%]">
        <i className="fa-solid fa-arrow-left"></i>
        <b>Fundamentals of JavaScript</b>
      </div>

      {/* 
        .courseContainer -> w-full h-[80vh] flex gap-[25px] mt-5 
      */}
      <div className="w-full h-[80vh] flex gap-[25px] mt-5">
        
        {/* 
          .learningSection -> w-[30%] 
        */}
        <div className="w-[30%]">
          {/* 
            .weekBox -> w-full h-[15vh] flex items-center justify-center 
          */}
          <div className="w-full h-[15vh] flex items-center justify-center">
            Week1 Day1
          </div>
          
          {/* 
            .topicBox -> mb-[25px] flex items-center justify-start 
          */}
          <div className="mb-[25px] flex items-center justify-start">
            <p>• Learning & Understanding what JS is?</p>
          </div>
          
          {/* 
            .resourceBox -> mb-5 
          */}
          <div className="mb-5">
            <h2><b>Resources to Learn</b></h2>
            <Resource number="1" title="JS Basics" />
            <Resource number="2" title="JS Understanding" />
            <Resource number="3" title="Data Types" />
            <Resource number="4" title="Data Types" />
            <Resource number="5" title="Data Types" />
            <Resource number="6" title="Data Types" />
          </div>
        </div>

        {/* 
          .introSection -> w-[60%] h-[90%] bg-white rounded-[25px] p-[30px] shadow-[20px_20px_40px_rgba(58,62,108,0.5),_inset_15px_15px_30px_rgba(255,255,255,0.532),_inset_-20px_-20px_30px_rgba(40,43,75,0.6)] 
        */}
        <div className="w-[60%] h-[90%] bg-white rounded-[25px] p-[30px] shadow-[20px_20px_40px_rgba(58,62,108,0.5),_inset_15px_15px_30px_rgba(255,255,255,0.532),_inset_-20px_-20px_30px_rgba(40,43,75,0.6)]">
          
          {/* 
            .introHeading -> mb-[25px] 
            .introHeading h2 -> text-[28px]
          */}
          <div className="mb-[25px]">
            <h2 className="text-[28px]"><b>Introduction to JavaScript</b></h2>
          </div>
          
          {/* 
            .theoryBox p -> leading-[30px] text-[16px] 
          */}
          <div className="leading-[30px] text-[16px]">
            <p>
              JavaScript was initially created to "make web pages alive".
              The programs in this language are called scripts. They can be
              written right in a web page’s HTML and run automatically as
              the page loads. Scripts are provided and executed as plain
              text. They don’t need special preparation or compilation to
              run.In this aspect, JavaScript is very different from
              another language called Java.
              JavaScript was initially created to "make web pages alive".
              The programs in this language are called scripts. They can be
              written right in a web page’s HTML and run automatically as
              the page loads. Scripts are provided and executed as plain
              text. They don’t need special preparation or compilation to
              run.In this aspect, JavaScript is very different from
              another language called Java.
              JavaScript was initially created to "make web pages alive".
              The programs in this language are called scripts. They can be
              written right in a web page’s HTML and run automatically as
              the page loads. Scripts are provided and executed as plain
              text. They don’t need special preparation or compilation to
              run.In this aspect, JavaScript is very different from
              another language called Java.
            </p>
          </div>
          
          {/* 
            .btnSection -> w-full h-[10vh] flex items-center justify-center 
          */}
          <div className="w-full h-[10vh] flex items-center justify-center">
            {/* 
              #downArrow -> h-[18px] w-[18px] absolute bottom-[22%] 
            */}
            <img 
              className="h-[18px] w-[18px] absolute bottom-[22%]" 
              src="/Courses/Polygon_3.png" 
              alt="Down Arrow" 
            />
            
            {/* 
              .roadmapBtn -> h-[35px] w-[11vw] border-none rounded-[10px] bg-[#837aff] text-black absolute right-[12%] bottom-[26.5%] 
            */}
            <button className="h-[35px] w-[11vw] border-none rounded-[10px] bg-[#837aff] text-black absolute right-[12%] bottom-[26.5%] small-box-shadow blue">
              Roadmap
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Learning;