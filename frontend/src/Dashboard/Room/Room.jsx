import React, { useEffect, useState } from 'react'
import "./Room.css"
import gsap from 'gsap'

function Room() {
  const [id_value , setID_value] = useState("000000")
  const [copied , setCopied] = useState(false)
  useEffect( () => {
    gsap.from(".slide-in-from-bottom" , {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    })
  } , [copied] )
  return (
    <div className='flex h-full w-full flex-col justify-center items-center'>
      <div className='flex items-center justify-start w-full h-1/10'>
        <img src="/Dashboard/Courses/Back.svg" alt="" className='w-10 h-10' />
        <h1 className='text-2xl font-bold'>Room</h1>    
      </div>
      <div className='h-9/10 w-full flex justify-center items-center'>
        <div className='aspect-3/2 h-2/3 white small-box-shadow rounded-[3rem] flex justify-around items-center relative'>
          <div className='h-full flex flex-col justify-evenly items-start'>
            <p className='text-2xl font-bold'>
                <p>Create or Join Room</p>
                <p>to chat with your </p>
                Friends.
            </p>
            <div className='flex items-center'>
                {id_value.split("").map( i => (<span className='id_value_buttons font-black bg-white px-2 mx-1 rounded-lg py-2'>{i}</span>) )}
                <div className={`w-4 h-4 ml-5 bg-white rounded-xs border border-black transition-all duration-100 ${copied ? 'translate-x-0 translate-y-0' : ''}`}>
                  <div onClick={() => {navigator.clipboard.writeText(id_value); setCopied(true); setTimeout(() => setCopied(false), 2000)}} className={`h-full w-full bg-black rounded-xs active:translate-x-0 active:translate-y-0 transition-all duration-100 cursor-pointer ${copied ? 'translate-x-0 translate-y-0' : 'translate-x-1 -translate-y-1'}`}></div>
                </div>
                {copied && <span className='bg-green-500 text-white p-2 rounded-lg absolute bottom-5 z-50 small-box-shadow green slide-in-from-bottom'>Copied!</span>}
            </div>
          </div>
          <div className='h-full w-1/4 flex flex-col justify-evenly items-center'>
            <button className='small-box-shadow blue py-2 px-5 rounded-2xl text-white w-full'>Join Room</button>
            <button className='small-box-shadow blue py-2 px-5 rounded-2xl text-white w-full'>Create Room</button>
          </div>
        </div>    
      </div>
    </div>
  )
}

export default Room