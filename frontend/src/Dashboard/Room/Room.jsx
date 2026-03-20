import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGSAP } from "@gsap/react";
import "./Room.css";
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useNavigate } from 'react-router';

gsap.registerPlugin(SplitText);

function Room() {
  const navigate = useNavigate();
  // Using an array for 6 characters makes manipulation much easier 🔢
  const [idValue, setIdValue] = useState(new Array(6).fill("_"));
  useEffect( () => {console.log(idValue);
  } , [idValue] )
  const [copied, setCopied] = useState(false);
  const containerRef = useRef(null);
  const inputRefs = useRef([]); // To track each input for auto-focus 🔍

  const handleCopy = () => {
    const fullId = idValue.join("");
    if (fullId.trim() === "") return;
    navigator.clipboard.writeText(fullId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // The Magic: Handling Paste 📋
  const handlePaste = (e) => {
    const data = e.clipboardData.getData("text").trim();
    if (data.length <= 6) {
      const pasteData = data.split("").slice(0, 6);
      const newId = [...idValue];
      pasteData.forEach((char, index) => {
        newId[index] = char;
      });
      setIdValue(newId);
      // Focus the last filled box or the next empty one
      const nextFocus = Math.min(pasteData.length, 5);
      inputRefs.current[nextFocus].focus();
    }
  };

  const handleChange = (element, index) => {
    const value = element.value.slice(-1); // Only take the last character
    if (!value) return; 

    const newId = [...idValue];
    newId[index] = value;
    setIdValue(newId);

    // Auto-focus next input ⏩
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Backspace logic: Move focus back 🔙
    if (e.key === "Backspace" && !idValue[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.from(".white-box-container", {
      scaleX: 0,
      opacity: 0,
      duration: 0.8,
      transformOrigin: "center",
    });

    const split = new SplitText(".room-text", { type: "chars, words" });
    tl.from(split.chars, {
      opacity: 0,
      y: 10,
      rotateX: -90,
      stagger: 0.02,
      duration: 0.6,
    }, "-=0.4");

    tl.from(".id-boxes", {
      opacity: 0,
      scale: 0,
      y: 20,
      stagger: 0.05,
      duration: 0.5,
      ease: "back.out(1.7)"
    }, "-=0.3");
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className='flex h-full w-full flex-col p-8 overflow-hidden'>
      <div className='flex items-center gap-4 w-full h-fit mb-4'>
        <img src="/Dashboard/Courses/Back.svg" alt="Back" className='w-5 h-5 cursor-pointer hover:scale-110 transition-transform' />
        <h1 className='text-2xl font-bold tracking-tight'>Room</h1>
      </div>

      <div className='grow w-full flex justify-center items-center'>
        <div className='white-box-container aspect-5/3 h-[80%] white small-box-shadow rounded-[3rem] flex justify-between items-center p-12 relative'>
          
          <div className='flex flex-col h-full justify-center gap-10'>
            <div className='text-4xl font-extrabold leading-[1.1] room-text'>
              Create or Join Room<br />
              to chat with your<br />
              Friends.
            </div>

            <div className='flex items-center gap-4'>
              <div className='flex gap-2' onPaste={handlePaste}>
                {idValue.map((char, index) => (
                  <input 
                    key={index} 
                    ref={(el) => (inputRefs.current[index] = el)}
                    className='id-boxes font-black white w-12 h-14 flex items-center justify-center rounded-xl shadow-sm border border-gray-100 text-xl text-center outline-none focus:border-blue-500 transition-colors' 
                    value={char} 
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                ))}
              </div>

              {/* Copy Button */}
              <div className="relative w-7 h-7 cursor-pointer" onClick={handleCopy}>
                <motion.div 
                  initial={{ x: 5, y: -5, opacity: 0 }}
                  animate={{ x: 0, y: 0, opacity: 1 }}
                  transition={{ delay: 2, duration: 0.5, ease: "easeOut" }}
                  className="absolute inset-0 border-2 border-black rounded-md" 
                />
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ 
                    x: copied ? 0 : 5, 
                    y: copied ? 0 : -5, 
                    opacity: 1 
                  }}
                  className="absolute inset-0 bg-black rounded-md flex items-center justify-center"
                />
              </div>

              <AnimatePresence>
                {copied && (
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.5, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className='green small-box-shadow text-white px-4 py-2 rounded-xl absolute bottom-5 z-50 shadow-lg font-medium'
                  >
                    Copied to clipboard! ✅
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className='w-1/3 flex flex-col gap-5 justify-center h-full'>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if(idValue.join("") === "______"){
                  alert("Please enter a room ID");
                  return;
                }
                navigate(`/dashboard/room/${idValue.join("")}`)}
              }
              className='button-room-section blue py-4 px-6 rounded-2xl text-white font-bold w-full small-box-shadow'
            >
              Join Room
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if(idValue.join("") === "______"){
                  setIdValue(new Array(6).fill(0).map(() => Math.ceil(Math.random() * 9)));
                  return;
                }
                navigate(`/dashboard/room/${idValue.join("")}`)}
              }
              className='button-room-section blue py-4 px-6 rounded-2xl text-white font-bold w-full small-box-shadow'
            >
              Create Room {idValue.join("") == "______" || idValue.join("") == "" ? "id" : ""}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Room;