import React, { useRef, useState, useEffect } from 'react';
import { useGSAP } from "@gsap/react";
import "./Room.css";
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useNavigate } from 'react-router';
import { sileo } from 'sileo';
import TitleAnimation from '../TitleAnimation';

gsap.registerPlugin(SplitText);

function Room() {
  const navigate = useNavigate();
  const [idValue, setIdValue] = useState(new Array(6).fill("_"));

  const [copied, setCopied] = useState(false);
  const containerRef = useRef(null);
  const inputRefs = useRef([]);

  const handleCopy = () => {
    if (idValue.join("") === "______" || idValue.join("") === "") {
      sileo.error({
        title: "error", description: (
          <p className='flex justify-center items-center font-semibold'>
            Please Enter Room ID
          </p>
        )
      })
      return;
    }
    const fullId = idValue.join("");
    navigator.clipboard.writeText(fullId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaste = (e) => {
    const data = e.clipboardData.getData("text").trim();
    if (data.length <= 6) {
      const pasteData = data.split("").slice(0, 6);
      const newId = [...idValue];
      pasteData.forEach((char, index) => {
        newId[index] = char;
      });
      setIdValue(newId);
      const nextFocus = Math.min(pasteData.length, 5);
      inputRefs.current[nextFocus].focus();
    }
  };

  const handleChange = (element, index) => {
    const value = element.value.slice(-1);
    if (!value) return;

    const newId = [...idValue];
    newId[index] = value;
    setIdValue(newId);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !idValue[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    TitleAnimation(tl, "room-page-title");

    tl.to(".white-box-container", {
      scaleX: 1,
      opacity: 1,
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

    tl.fromTo(".button-room-section", {
      opacity: 0,
      scale: 0,
    }, {
      opacity: 1,
      scale: 1,
      duration: 0.2,
      stagger: 0.05,
      ease: "power4.out",
      clearProps: "all",
      onComplete: () => {
        gsap.set(".button-room-section", {
          opacity: 1,
        });
      }
    }, "-=0.3");

    tl.from(".id-boxes", {
      opacity: 0,
      scale: 0,
      y: 20,
      stagger: 0.05,
      duration: 0.2,
      ease: "back.out(1.7)"
    }, "-=0.3");

    tl.from(".copy-icon-room-outline", {
      opacity: 0,
      scale: 0,
      y: 20,
      duration: 0.2,
      ease: "bounce.out"
    }, "-=0.3");

    tl.fromTo(".copy-icon-room-fill", {
      opacity: 0,
      scale: 0,
      y: 0,
    }, {
      opacity: 1,
      scale: 1,
      y: -5,
      x: 5,
      duration: 0.2,
      ease: "bounce.out"
    }, "-=0.3");
  }, { scope: containerRef });

  useEffect(() => {
    if (copied) {
      gsap.to(".copy-icon-room-fill", {
        y: 0,
        x: 0,
        duration: 0.5,
        ease: "bounce.out"
      }, "-=0.3");
    } else {
      gsap.to(".copy-icon-room-fill", {
        y: -5,
        x: 5,
        duration: 0.5,
        ease: "bounce.out"
      }, "-=0.3");
    }
  }, [copied]);

  return (
    <div ref={containerRef} className='flex h-full w-full flex-col pb-8 overflow-hidden'>
      <div className='flex items-center gap-4 w-full h-fit mb-4'>
        <img src="/Dashboard/Courses/Back.svg" alt="Back" className='w-5 h-5 cursor-pointer hover:scale-110 transition-transform' />
        <h1 className='text-2xl font-bold tracking-tight room-page-title'>Room</h1>
      </div>

      <div className='grow w-full flex justify-center items-left p-2 md:pb-10'>
        <div className='white-box-container w-full md:w-auto md:aspect-5/3 h-auto md:h-[80%] white small-box-shadow rounded-[2rem] md:rounded-[3rem] flex flex-col md:flex-row justify-between items-center p-6 md:p-12 relative gap-8 md:gap-0'>

          <div className='flex flex-col h-full justify-center gap-6 md:gap-10 items-center md:items-start text-center md:text-left w-full md:w-auto'>
            <div className='text-2xl md:text-4xl font-extrabold leading-[1.1] room-text max-w-xs md:max-w-none pr-5'>
              Create or Join Room to chat with your Friends.
            </div>

            <div className='flex flex-wrap justify-center items-center gap-3 md:gap-4 w-full md:w-auto'>
              <div className='flex gap-1 md:gap-2' onPaste={handlePaste}>
                {idValue.map((char, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className='id-boxes font-black white w-8 h-10 md:w-12 md:h-14 flex items-center justify-center rounded-xl shadow-sm border border-gray-100 text-lg md:text-xl text-center outline-none focus:border-blue-500 transition-colors'
                    value={char}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                ))}
              </div>

              <div className="relative w-5 h-5 md:w-7 md:h-7 cursor-pointer shrink-0" onClick={handleCopy}>
                <div className="copy-icon-room-outline absolute inset-0 border-2 border-black rounded-md" />
                <div className="copy-icon-room-fill opacity-0 transition-all duration-300 absolute inset-0 bg-black rounded-md flex items-center justify-center" />
              </div>

              {copied && (
                <span className='green small-box-shadow text-white px-4 py-2 rounded-xl absolute bottom-5 z-50 shadow-lg font-medium left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0'>
                  Copied to clipboard! ✅
                </span>
              )}
            </div>
          </div>

          <div className='w-full md:w-1/3 flex flex-col gap-4 md:gap-5 justify-center h-full'>
            <button
              onClick={() => {
                if (idValue.join("") === "______") {
                  sileo.error({ title: "Error", description: "Please Enter Room ID" })
                  return;
                }
                navigate(`/dashboard/room/${idValue.join("")}`)
              }
              }
              className='button-room-section opacity-0 blue py-3 md:py-4 px-6 rounded-2xl text-white font-bold w-full small-box-shadow'
            >
              Join Room
            </button>

            <button
              onClick={() => {
                if (idValue.join("") === "______") {
                  setIdValue(new Array(6).fill(0).map(() => Math.ceil(Math.random() * 9)));
                  sileo.success({
                    title: "Success", description: (
                      <p className='flex justify-center items-center font-semibold'>
                        Room ID Created
                      </p>
                    )
                  })
                  return;
                }
                navigate(`/dashboard/room/${idValue.join("")}`)
              }
              }
              className='button-room-section opacity-0 blue py-3 md:py-4 px-6 rounded-2xl text-white font-bold w-full small-box-shadow'
            >
              Create Room {idValue.join("") == "______" || idValue.join("") == "" ? "id" : ""}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Room;