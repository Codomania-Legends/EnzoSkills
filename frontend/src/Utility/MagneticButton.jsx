import React, { useRef } from 'react';

export default function RoomButtons() {
  // A helper function to handle the magnetic movement
  const handleMouseMove = (e) => {
    const wrapper = e.currentTarget;
    const button = wrapper.querySelector('button');
    const rect = wrapper.getBoundingClientRect();
    
    // Calculate mouse position relative to the center of the wrapper
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    
    // Move the button (multiplying by a fraction like 0.3 dampens the effect so it stays inside)
    button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  };

  // Reset the button position when the mouse leaves
  const handleMouseLeave = (e) => {
    const wrapper = e.currentTarget;
    const button = wrapper.querySelector('button');
    button.style.transform = `translate(0px, 0px)`;
  };

  return (
    <div className='h-full w-1/3 flex flex-col justify-evenly items-center'>
      
      {/* Join Room Button */}
      <div 
        onMouseMove={handleMouseMove} 
        onMouseLeave={handleMouseLeave} 
        className='w-full py-3 px-3 cursor-pointer'
      >
        <button className='button1_magnet small-box-shadow blue py-2 px-5 rounded-2xl text-white w-full transition-transform duration-100 ease-out'>
          Join Room
        </button>
      </div>

      {/* Create Room Button */}
      <div 
        onMouseMove={handleMouseMove} 
        onMouseLeave={handleMouseLeave} 
        className='w-full py-3 px-3 cursor-pointer'
      >
        <button className='button2_magnet small-box-shadow blue py-2 px-5 rounded-2xl text-white w-full transition-transform duration-100 ease-out'>
          Create Room
        </button>
      </div>

    </div>
  );
}