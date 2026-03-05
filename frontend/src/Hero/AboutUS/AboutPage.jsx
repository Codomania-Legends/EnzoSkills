import React from 'react'
import "./AboutPage.css"
import Navbar from '../Navbar/Navbar'
import "../../Utility/global.css"
import { useNavigate } from 'react-router'
function AboutPage() {
    const navigate = useNavigate();
  return (
    <div className='Home-AboutPage flex justify-center items-center'>
        <div className="navbar flex justify-center items-center">
            <Navbar />
        </div>
        <div className="main-about-container flex-col md:flex-row flex justify-center items-center">
            <div className="about-left-content w-full lg:w-[60%] flex justify-evenly md:h-[80%] lg:h-[50%] items-center">
                <div className="about-left-main-heading text-2xl md:text-5xl flex justify-center items-center">
                    <p><b>EnzoSkills</b></p>
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
                        className='know-more-btn small-box-shadow
                    '>Know More About us i </button>
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