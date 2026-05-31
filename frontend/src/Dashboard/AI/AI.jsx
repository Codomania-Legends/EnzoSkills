import React, { useRef, useState } from 'react';
import { FiLink } from "react-icons/fi";
import { IoSend } from "react-icons/io5";
import { FaChartBar, FaBook, FaRegUser, FaImage } from "react-icons/fa";


import "./Ai.css";

function AI() {
  const containerRef = useRef(null);









  const [doubtQuery, setDoubtQuery] = useState("");
  const [streamedAnswer, setStreamedAnswer] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleAskDoubt = async () => {
    if (!doubtQuery.trim()) return;

    // Reset states before starting a new stream
    setIsProcessing(true);
    setStreamedAnswer("");

    try {
      const response = await fetch("http://localhost:3000/doubts/solve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ doubt: doubtQuery })
      });

      if (!response.body) {
        throw new Error("ReadableStream not supported by the browser.");
      }

      // Set up the reader to process the stream chunk by chunk
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let isStreamComplete = false;

      while (!isStreamComplete) {
        const { value, done } = await reader.read();
        isStreamComplete = done;

        if (value) {
          // Decode the current chunk and append it to the existing answer state
          const currentChunk = decoder.decode(value, { stream: true });
          setStreamedAnswer((previousAnswer) => previousAnswer + currentChunk);
        }
      }
    } catch (error) {
      console.error("Error during streaming:", error);
      setStreamedAnswer("An error occurred while processing your doubt.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {/* 1. Outer container remains strictly bounded to the screen height */}
      <div className="w-full h-full p-6 flex flex-col box-border relative">

        <div className="flex items-center gap-4 mb-6 shrink-0">
          <img src="/Dashboard/Courses/Back.svg" alt="Back" className="h-5 w-5 cursor-pointer hover:scale-110 transition-transform" onClick={() => window.history.back()} />
          <h1 className="text-2xl font-bold text-gray-900 history-page-title tracking-tight">AI</h1>
        </div>

        {/* 2. Remove overflow-hidden. Add min-h-0 here! */}
        <div className='mainContent flex flex-col flex-1 min-h-0 w-full'>

          {/* 3. The answer div takes the remaining space and handles the scroll. 
                  (Added a tiny m-2 margin just to give your box-shadow room to breathe if it's large) */}
          <div
            id='answerDiv'
            // ref={answerContainerRef}
            className="white small-box-shadow text-white w-[95%] md:w-[720px] flex-1 rounded-3xl p-7 px-10 m-2 mx-auto whitespace-pre-wrap overflow-y-auto custom-scrollbar">
            
             <div className="w-full h-full text-black">

  {/* Header */}
  <div className="flex items-center gap-3 mb-10">
    <img
      src="https://api.dicebear.com/7.x/bottts/svg?seed=Cloura"
      alt="AI"
      className="w-10 h-10 rounded-full"
    />
    <h2 className="text-2xl font-medium">Cloura AI</h2>
  </div>

  {/* User Message */}
  <div className="flex justify-end items-center gap-4 mb-8">
      <div
    className="w-[210px] h-[50px] flex items-center justify-center bg-gradient-to-b from-[#d8d8f5] to-[#a8a8df] rounded-3xl shadow-[0_15px_30px_rgba(120,120,180,0.4)] text-black text-sm">
    Hello Vidhi What's up
  </div>

    <img
      src="/user.jpg"
      alt="User"
      className="w-10 h-10 rounded-full object-cover"
    />
  </div>

  {/* AI Message */}
  <div className="flex items-center gap-4">
    <img
      src="https://api.dicebear.com/7.x/bottts/svg?seed=Cloura"
      alt="AI"
      className="w-10 h-10 rounded-full"
    />

      <div
    className="w-[200px] h-[50px] flex items-center justify-center bg-gradient-to-r from-[#6c63ff] to-[#8b84ff] rounded-3xl  shadow-[0_15px_30px_rgba(120,120,180,0.4)]text-black text-sm">
    I am Good What about You!?
  </div>
  </div>

  {/* Streamed AI Response */}
  {streamedAnswer && (
    <div className="flex items-center gap-4 mt-8">
      <img
        src="/cloura-logo.png"
        alt="AI"
        className="w-10 h-10 rounded-full"
      />

      <div className="bg-gradient-to-r from-[#6c63ff] to-[#8b84ff] px-8 py-4 rounded-3xl max-w-[70%] text-white whitespace-pre-wrap">
        {streamedAnswer}
      </div>
    </div>
  )}

</div>
          </div>

          <div className='flex w-full mt-6 shrink-0 justify-center'>

  <div className="relative w-[720px]">

    <FiLink
      onClick={() => setShowMenu(!showMenu)}
      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6C63FF] text-lg cursor-pointer z-10"
    />

    {showMenu && (
      <div className="absolute bottom-22 right-full mr-7 w-45  white small-box-shadow rounded-3xl p-6   z-50 text-black">

        <div className="flex items-center gap-3 py-3 cursor-pointer">
          <FaChartBar />
          <span>Your Progress</span>
        </div>

        <div className="flex items-center gap-3 py-3 cursor-pointer">
          <FaBook />
          <span>Your Course</span>
        </div>

        <div className="flex items-center gap-3 py-3 cursor-pointer">
          <FaRegUser />
          <span>Your Profile</span>
        </div>

        <div className="flex items-center gap-3 py-3 cursor-pointer">
          <FaImage />
          <span>Images</span>
        </div>

      </div>
    )}

    <input
      type='text'
      placeholder='Hye I have a doubt...'
      className='border w-full pl-12 pr-12 h-12 rounded-full px-3 text-sm text-black placeholder-black white small-box-shadow'
      value={doubtQuery}
      onChange={(e) => setDoubtQuery(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleAskDoubt();
        }
      }}
      disabled={isProcessing}
    />

    <IoSend
      onClick={handleAskDoubt}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-black text-lg cursor-pointer"
    />

  </div>

</div>
        </div>
      </div>
    </>);

}

export default AI;