import React, { useEffect } from 'react'
import "./Loading.css"
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useNavigate } from 'react-router' 
import { motion } from 'framer-motion' 

gsap.registerPlugin(ScrollTrigger)

function Loading() {
    const navigate = useNavigate()
    
    const pathData = [
        "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
        "M-336 -237C-336 -237 -268 168 196 295C660 422 728 827 728 827",
        "M-292 -285C-292 -285 -224 120 240 247C704 374 772 779 772 779",
        "M-248 -333C-248 -333 -180 72 284 199C748 326 816 731 816 731",
        "M-204 -381C-204 -381 -136 24 328 151C792 278 860 683 860 683",
        "M-160 -429C-160 -429 -92 -24 372 103C836 230 904 635 904 635",
        "M-116 -477C-116 -477 -48 -72 416 55C880 182 948 587 948 587",
    ]

    const animations = pathData.map((_, i) => ({
        duration: 3 + (i % 3) * 0.5,
        delay: i * 0.05,    
    }))

    useEffect(() => {
        gsap.fromTo( ".ooo" , 
            { scale : 1 } , 
            { 
                scale : 150, 
                duration: 2,
                ease: "power2.out",
                delay : 4, 
            }
        )
        const timer = setTimeout(() => {
            navigate("/home")
        }, 5000); 

        return () => clearTimeout(timer) 
    }, [navigate])

    return (
        <div className="relative container h-screen w-screen overflow-hidden bg-neutral-950 flex justify-center items-center z-0">
            <svg
                className="absolute h-full w-full"
                fill="none"
                viewBox="0 0 696 316"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid slice"
            >
                {/* Static faint paths for depth */}
                <g opacity="0.03">
                    {pathData.map((d, i) => (
                        <path key={`static-${i}`} d={d} stroke="white" strokeWidth="0.5" />
                    ))}
                </g>

                {/* Animated gradient beams using motion.path */}
                {pathData.map((d, i) => (
                    <motion.path 
                        key={`beam-${i}`}
                        d={d}
                        stroke="white"
                        strokeWidth="1.5" // ✨ Made the stroke slightly thicker since there are fewer lines
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                            pathLength: [0, 1],
                            opacity: [0, 0.8, 0.8, 0], // 🌟 Boosted opacity slightly for better visibility
                        }}
                        transition={{
                            duration: animations[i].duration,
                            delay: animations[i].delay,
                            repeat: Infinity, 
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </svg>

            <div className='relative z-10 p-2 pr-10 flex justify-center items-end text-white'>
                <div>
                    <div className='h-20 w-4 bg-white transformMe' />
                    <div className='h-20 w-4 bg-white e-block-1' />
                </div>
                <div className='flex flex-col justify-between h-20'>
                    <div className='h-4 w-15 bg-white rounded-r-full e-block-2' />
                    <div className='h-4 w-15 bg-white rounded-r-full e-block-3' />
                </div>
                <p className='font-bold text-5xl ml-2'>
                    <span className='span-loading'>n</span>
                    <span className='span-loading'>z</span>
                    <span className='span-loading'>
                        <span className='relative inline-block ooo bg-white rounded-full aspect-square h-7 w-7'></span>
                    </span>
                    <span className='span-loading'>S</span>
                    <span className='span-loading'>k</span>
                    <span className='span-loading'>i</span>
                    <span className='span-loading'>l</span>
                    <span className='span-loading'>l</span>
                    <span className='span-loading'>s</span>
                </p>
            </div>
        </div>
    )
}

export default Loading