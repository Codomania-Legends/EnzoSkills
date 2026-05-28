import React, { useEffect, useRef } from 'react';
import "./AboutPage.css";
import Navbar from '../Navbar/Navbar';
import "../../Utility/global.css";
import { useNavigate } from 'react-router';
import { useScrollReveal } from '../../Utility/useScrollReveal';

function AboutPage() {

    const navigate = useNavigate();
    const textContainerRef = useRef(null);
    useScrollReveal();

    return (
        <div ref={textContainerRef} className='Home-AboutPage flex justify-center items-center'>
            <div className="main-about-container flex-col md:flex-row flex justify-center items-center">
                <div className="about-left-content w-full lg:w-[60%] flex justify-evenly md:h-[80%] lg:h-[50%] items-center">
                    <div className="about-left-main-heading overflow-hidden text-2xl md:text-5xl flex justify-center items-center">
                        <p className='Head-one slide-up' style={{ animationDelay: '0.1s' }}>E</p>
                        <p className='Head-two slide-up' style={{ animationDelay: '0.15s' }}>N</p>
                        <p className='Head-three slide-up' style={{ animationDelay: '0.2s' }}>Z</p>
                        <p className='Head-four slide-up' style={{ animationDelay: '0.25s' }}>O</p>
                        <p className='Head-five slide-up' style={{ animationDelay: '0.3s' }}>S</p>
                        <p className='Head-six slide-up' style={{ animationDelay: '0.35s' }}>K</p>
                        <p className='Head-seven slide-up' style={{ animationDelay: '0.4s' }}>I</p>
                        <p className='Head-eight slide-up' style={{ animationDelay: '0.45s' }}>L</p>
                        <p className='Head-nine slide-up' style={{ animationDelay: '0.5s' }}>L</p>
                        <p className='Head-ten slide-up' style={{ animationDelay: '0.55s' }}>S</p>
                    </div>
                    <div className="about-left-sub-heading text-sm md:text-xl flex justify-center items-center fade-in" style={{ animationDelay: '0.8s' }}>
                        <p>“Empowering Your Growth, Many Skill at a Time.”</p>
                    </div>
                    <img src="/About-us/About-us-Comp.svg" alt="Center Decoration" className='flex lg:hidden h-[40%] fade-in' style={{ animationDelay: '1s' }} />
                    <div className="about-main-content text-sm md:text-lg w-[70%] lg:w-[60%] lg:h-[60%] flex-col flex justify-evenly items-center">
                        <p className="slide-up text-sm" style={{ animationDelay: '1s' }}>EnzoSkills is a comprehensive learning path dashboard designed to simplify the journey of professional and personal development. Built with the powerful MERN stack. </p>
                        <p className="slide-up text-sm" style={{ animationDelay: '1.2s' }}>Our platform serves as a centralized hub for learners to manage resources, track their progress, and master new technologies. </p>
                        <p className="slide-up text-sm" style={{ animationDelay: '1.4s' }}>At EnzoSkills, we believe quality education should be accessible to everyone, regardless of age or gender. </p>
                    </div>
                    <div className="know-more-div lg:hidden h-30 flex justify-center items-center fade-in" style={{ animationDelay: '1.6s' }}>
                        <button
                            onClick={() => navigate("/about/more")}
                            className='know-more-btn small-box-shadow '>
                            Know More About us <img src='/Dashboard/info.svg' /> </button>
                    </div>
                </div>
                <div className="about-right-content hidden lg:flex justify-center items-center">
                    <div className="about-img flex justify-center items-center reveal-on-scroll reveal-slide-left">
                        <img src="/About-us/About-us-Comp.svg" alt="Center Decoration" className='About-comp-img ' />
                    </div>
                    <div className="know-more-div h-20 flex justify-center items-center fade-in" style={{ animationDelay: '1.6s' }}>
                        <button
                            onClick={() => navigate("/about/more")}
                            className='know-more-btn small-box-shadow hover:scale-105 transition-transform'>
                            Know More About us </button>
                    </div>
                </div>
            </div>
        </div>);

}

export default AboutPage;