import React, { useEffect, useRef } from 'react'
import "./AboutPage.css"
import Navbar from '../Navbar/Navbar'
import "../../Utility/global.css"
import { useNavigate } from 'react-router'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { textAnimate } from '../../Utility/Animations/Text'
import SplitText from 'gsap/SplitText'
gsap.registerPlugin(SplitText)
function AboutPage() {
    const navigate = useNavigate();
    const textContainerRef = useRef(null)
    useGSAP( () => {
        textAnimate()

        const splitLines = new SplitText(".about-main-content", { type: "lines" })
        gsap.from(splitLines.lines, {
            rotationY: -100,
            transformOrigin: "50% 50% -160px",
            opacity: 0,
            duration: 0.8, 
            ease: "power3",
            stagger: 0.25
        })
        const splitWords = new SplitText(".about-left-sub-heading", { type: "words" })
        gsap.from(splitWords.words, {
            x: -100,
            opacity: 0,
            duration: 0.7, 
            ease: "back",
            stagger: 0.15
        })

        gsap.fromTo(".about-img", {xPercent : 100}, {xPercent : 0, duration : 1, ease : "power3"})

        gsap.fromTo(".know-more-btn", {opacity : 0}, {opacity : 1, duration : 1, ease : "power3", delay : 1})
    }, { scope : textContainerRef } )
    return (
        <div ref={textContainerRef} className='Home-AboutPage flex justify-center items-center'>
            <div className="main-about-container flex-col md:flex-row flex justify-center items-center">
                <div className="about-left-content w-full lg:w-[60%] flex justify-evenly md:h-[80%] lg:h-[50%] items-center">
                    <div  className="about-left-main-heading overflow-hidden  text-2xl md:text-5xl flex justify-center items-center">
                        <p className='Head-one'>E</p>
                        <p className='Head-two'>N</p>
                        <p className='Head-three'>Z</p>
                        <p className='Head-four'>O</p>
                        <p className='Head-five'>S</p>
                        <p className='Head-six'>K</p>
                        <p className='Head-seven'>I</p>
                        <p className='Head-eight'>L</p>
                        <p className='Head-nine'>L</p>
                        <p className='Head-ten'>S</p>
                    </div>
                    <div className="about-left-sub-heading text-sm md:text-xl flex justify-center items-center">
                        <p>“Empowering Your Growth, Many Skill at a Time.”</p>
                    </div>
                    <img src="/About-us/About-us-Comp.svg" alt="Center Decoration" className='flex lg:hidden h-[40%]' />
                    <div className="about-main-content text-sm md:text-lg w-[70%] lg:w-[60%] lg:h-[60%] flex-col flex justify-evenly items-center">
                        <p>EnzoSkills is a comprehensive learning path dashboard designed to simplify the journey of professional and personal development. Built with the powerful MERN stack. </p>
                        <p>Our platform serves as a centralized hub for learners to manage resources, track their progress, and master new technologies. </p>
                        <p>At EnzoSkills, we believe quality education should be accessible to everyone, regardless of age or gender. </p>
                    </div>
                    <div className="know-more-div lg:hidden h-30 flex justify-center items-center">
                        <button 
                            onClick={() => navigate("/about/more")}
                            className='know-more-btn small-box-shadow opacity-0
                        '>Know More About us iiiiii <img src='/Dashboard/info.svg'/> </button>
                    </div>
                </div>
                <div className="about-right-content hidden lg:flex justify-center items-center">
                    <div className="about-img flex justify-center items-center">
                        <img src="/About-us/About-us-Comp.svg" alt="Center Decoration" className='About-comp-img ' />
                    </div>
                    <div className="know-more-div h-20 flex justify-center items-center">
                        <button 
                            onClick={() => navigate("/about/more")}
                            className='know-more-btn small-box-shadow
                        '>Know More About us i </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutPage