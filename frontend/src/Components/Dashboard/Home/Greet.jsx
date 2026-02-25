import React, { useRef } from 'react'
import { Slide_up } from '../../../Animations/Basic'
import { useGSAP } from '@gsap/react';

function Greet() {
    const container = useRef()

    useGSAP(() => {
        Slide_up()
    } , {scope : container})

    return (
        <div ref={container} className='slide_up greet-home-container border-l-[5px] border-[#212121] pt-0 px-4 pb-4 rounded-none text-center md:text-left'>
            <h1 className='slide_up greet-home-title font-["Syne"] text-3xl md:text-[2.5rem] font-black'>Hello Anshul,</h1>
            <p className='slide_up greet-home-subtitle font-["Plus_Jakarta_Sans"] text-xs md:text-sm font-semibold mt-2 md:mt-0'>“ Lets Get Back to Work ? To Become Better Than Before “</p>
        </div>
    )
}

export default Greet