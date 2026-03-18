import React, { useState } from 'react'
import "./Room.css"

function Room() {
  const [id_value , setID_value] = useState("000000")
  return (
    <div className='flex h-full w-full flex-col justify-center items-center'>
        <div className='aspect-square w-2 bg-blue-500 rounded-full' onMouseMove={(e) => console.log(e.clientX, e.clientY)}></div>
        <h1>Room</h1>    
        <div className='aspect-3/2 h-2/3 white small-box-shadow rounded-[3rem] flex justify-around items-center'>
            <div className='h-full flex flex-col justify-evenly items-start'>
            <p className='text-2xl font-bold'>
                <p>Create or Join Room</p>
                <p>to chat with your </p>
                Friends.
            </p>
            <div>
                {id_value.split("").map( i => (<span className='id_value_buttons font-black bg-white px-2 mx-1 rounded-lg py-2'>{i}</span>) )}
                <span className='copy_roomPage text-xs'>C</span>
            </div>
            </div>
            <div className='h-full w-1/4 flex flex-col justify-evenly items-center'>
            <button className='small-box-shadow blue py-2 px-5 rounded-2xl text-white w-full'>Join Room</button>
            <button className='small-box-shadow blue py-2 px-5 rounded-2xl text-white w-full'>Create Room</button>
            </div>
        </div>    
    </div>
  )
}

export default Room