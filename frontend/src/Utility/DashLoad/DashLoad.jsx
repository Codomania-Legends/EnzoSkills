import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import React, { useEffect } from 'react'
import "./dashLoad.css"
import {useNavigate} from "react-router"

gsap.registerPlugin(SplitText)


function DashLoad() {
    const navigate = useNavigate()
    useEffect(() => {
        const split = new SplitText(".dash-text", { type: "chars" })
        
        gsap.from(split.chars, {
            y: () => gsap.utils.random(-100, 100),
            x: () => gsap.utils.random(-100, 100),
            opacity: 0,
            duration: () => gsap.utils.random(0.5, 3),
            stagger: () => gsap.utils.random(0.05, 0.15),
            ease: "power2.out"
        })

        gsap.fromTo(".dashload-container", 
            {
                "--deg": "0deg",        
                "--colorDeg1": "100%",       
                "--colorDeg2": "0%",     
            }, 
            {
                "--deg": () => "135deg", 
                "--colorDeg1": () => "0%",     
                "--colorDeg2": () => "100%",   
                duration: 2,
                ease: "power2.out",
                onComplete : () => {
                    gsap.to( split.chars , {
                        opacity : 0,
                        stagger : 0.05, 
                        ease:"power2.inOut",
                        delay : 1,
                        onComplete : () => navigate("/dashboard/home")
                    } )
                }             
            }
        )
    }, [])

    return (
        <div className='h-screen w-screen flex justify-center items-center dashload-container'>
            <p className='text-4xl font-extrabold dash-text'>DashBoard Loading...</p>
            <div className='absolute h-[80%] '></div>
        </div>
    )
}

export default DashLoad