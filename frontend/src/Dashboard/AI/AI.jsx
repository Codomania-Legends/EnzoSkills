import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import "./Ai.css"

function AI() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );
  }, { scope: containerRef });

  const [doubtQuery, setDoubtQuery] = useState("");
  const [streamedAnswer, setStreamedAnswer] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAskDoubt = async () => {
    if (!doubtQuery.trim()) return;

    // Reset states before starting a new stream
    setIsProcessing(true);
    setStreamedAnswer("");

    try {
      const response = await fetch("http://localhost:3000/doubts/solve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ doubt: doubtQuery }),
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
      <div className="w-full h-full p-6 flex flex-col box-border overflow-visible custom-scrollbar relative">
        <div className="flex items-center gap-4 mb-6 shrink-0">
          <img src="/Dashboard/Courses/Back.svg" alt="Back" className="h-5 w-5 cursor-pointer hover:scale-110 transition-transform" onClick={() => window.history.back()} />
          <h1 className="text-2xl font-bold text-gray-900 history-page-title tracking-tight">AI</h1>
        </div>
        <div className='mainContent flex flex-col w-full'>

          {/* Answer DIv */}
          <div id='answerDiv' className='black small-box-shadow text-white w-full min-h-[4rem] max-h-[80%] rounded-3xl mt-4 p-7 px-10 whitespace-pre-wrap overflow-scroll'>
            <p>{streamedAnswer}</p>
          </div>

          <div className='flex w-full mt-10 sticky bottom-10'>

            <input
              type='text'
              placeholder='Ask a doubt...'
              className='border w-full pl-5 h-14 rounded-full px-3 white small-box-shadow mx-5'
              value={doubtQuery}
              onChange={(e) => setDoubtQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAskDoubt();
                }
              }}
              disabled={isProcessing}
            />

            <button
              onClick={handleAskDoubt}
              disabled={isProcessing}
              className='blue small-box-shadow text-white px-4 py-2 rounded-full'
            >
              {isProcessing ? "Processing..." : "Ask"}
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default AI;