import React, { useRef } from 'react';
import Cookies from 'js-cookie';
import { useOutletContext } from 'react-router';

function Greet() {
  const containerRef = useRef();
  const outletContext = useOutletContext();
  const dailyQuote = outletContext?.dailyQuote || "Be so good they can't ignore you.";

  return (
    <div ref={containerRef} className='slide_up greet-home-container border-l-[5px] border-[#212121] pt-0 px-4 pb-4 rounded-none text-center md:text-left'>
      <h1 className='slide_up greet-home-title font-["Syne"] text-4xl font-black'>Hello {Cookies.get("username") || "User"},</h1>
      <p className='slide_up greet-home-subtitle font-["Plus_Jakarta_Sans"] text-md md:text-md font-semibold mt-4'>{dailyQuote}</p>
    </div>
  );
}

export default Greet; 