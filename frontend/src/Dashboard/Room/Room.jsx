import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGSAP } from "@gsap/react";
import "./Room.css";
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

function Room() {
  const [id_value, setID_value] = useState(Math.ceil(Math.random() * 1000000).toString().padStart(6, '0'));
  const [copied, setCopied] = useState(false);
  const containerRef = useRef(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(id_value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // 1. Smooth container expansion 📦
    tl.from(".white-box-container", {
      scaleX: 0,
      opacity: 0,
      duration: 0.8,
      transformOrigin: "center",
    });

    // 2. Text Splitting with a more elegant reveal ✍️
    const split = new SplitText(".room-text", { type: "chars, words" });
    tl.from(split.chars, {
      opacity: 0,
      y: 10,
      rotateX: -90,
      stagger: 0.02,
      duration: 0.6,
    }, "-=0.4");

    // 3. ID Boxes staggered "pop" animation 🎇
    tl.from(".id-boxes", {
      opacity: 0,
      scale: 0,
      y: 20,
      stagger: 0.05,
      duration: 0.5,
      ease: "back.out(1.7)"
    }, "-=0.3");

    // 4. Buttons sliding in from the right ➡️
    tl.fromTo(".action-btn", {
      x: 30,
      opacity: 0,
    }, {
      x: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.5
    }, "-=0.4");

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className='flex h-full w-full flex-col p-8 overflow-hidden'>
      {/* Header */}
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
              <div className='flex gap-2'>
                {id_value.split("").map((char, index) => (
                  <span key={index} className='id-boxes font-black white w-12 h-14 flex items-center justify-center rounded-xl shadow-sm border border-gray-50 text-xl'>
                    {char}
                  </span>
                ))}
              </div>

              {/* Copy Button */}
              <div className="action-btn opacity-0 relative w-7 h-7 cursor-pointer" onClick={handleCopy}>
                <div className="absolute inset-0 border-2 border-black rounded-md" />
                <motion.div 
                  animate={{ x: copied ? 0 : 5, y: copied ? 0 : -5 }}
                  transition = {{duration : 0.5, stiffness: 400, damping: 10}}
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

          {/* Action Buttons */}
          <div className='w-1/3 flex flex-col gap-5 justify-center h-full'>
            <motion.button 
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className='action-btn opacity-0 blue py-4 px-6 rounded-2xl text-white font-bold w-full small-box-shadow'
            >
              Join Room
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className='action-btn opacity-0 blue py-4 px-6 rounded-2xl text-white font-bold w-full small-box-shadow'
            >
              Create Room
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Room;