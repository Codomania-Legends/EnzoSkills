import { useGSAP } from '@gsap/react'
import React, { useRef } from 'react'
import { Slide_right, Slide_left, Slide_up } from '../../../Animations/Basic'

function ProgressBox() {
    const containerRef = useRef(null)

    useGSAP(() => {
        // 1. Animate the parent container directly using the Ref! 
        Slide_up(containerRef.current);

        // 2. Animate the children inside the container using the classes
        Slide_right('.slide_right');
        Slide_left('.slide_left');
        Slide_up('.slide_up'); // This will only grab the middle child now!
        
    }, { scope: containerRef }); // <-- Fix: Passed as a config object! ✨

    const ProgressBoxItems = [
        {name : "Streak", value : "3", image : "/Dashboard/Home/streak.svg"},
        {name : "Badges", value : "2", image : "/Dashboard/Home/star.svg"},
        {name : "Progress", value : "25%", image : "/Dashboard/Home/progress.svg"},
    ]

    return (
        <>
            {/* Fix: Removed the 'slide_up' class from here so GSAP doesn't get confused */}
            <div ref={containerRef} className='overflow-hidden w-full md:w-[90%] lg:w-1/2 rounded-[2em] py-8 px-4 flex flex-wrap md:flex-nowrap justify-around items-center gap-4 white small-box-shadow'>
                {ProgressBoxItems.map((item, index) => {
                    return (
                        <div className={`${index === 0 ? "slide_right" : index === 1 ? "slide_up" : "slide_left"} flex justify-between items-center flex-col gap-2 md:gap-4`} key={index + item.name}>
                            <div className='flex justify-center items-center flex-col text-xs md:text-sm font-semibold font-["Manrope"]'>
                                <img src={item.image} alt="" className="w-8 md:w-auto" />
                                <p className="text-center">{item.name}</p>
                            </div>
                            <p className='text-lg md:text-xl font-bold font-["Plus_Jakarta_Sans"]'>{item.value}</p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default ProgressBox