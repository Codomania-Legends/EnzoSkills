import React, { useRef } from 'react'
import { Slide_up } from '../../Utility/Animations/Basic'
import { useGSAP } from '@gsap/react';
import TitleAnimation from '../TitleAnimation';
import gsap from 'gsap';

function Greet() {
    const container = useRef()

    useGSAP(() => {
        const tl = gsap.timeline();
        TitleAnimation(tl, "greet-home-title");
        Slide_up()
    }, { scope: container })

    return (
        <div ref={container} className='slide_up greet-home-container border-l-[5px] border-[#212121] pt-0 px-4 pb-4 rounded-none text-center md:text-left'>
            <h1 className='slide_up greet-home-title font-["Syne"] text-4xl font-black'>Hello Anshul,</h1>
            <p className='slide_up greet-home-subtitle font-["Plus_Jakarta_Sans"] text-md md:text-md font-semibold mt-4'>“ Lets Get Back to Work ? To Become Better Than Before “</p>
        </div>
    )
}

export default Greet