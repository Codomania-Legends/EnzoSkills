import React from 'react'
import "./AboutPage.css"
import Navbar from '../Navbar/Navbar'
import "../../Utility/global.css"
function AboutPage() {
  return (
    <div className='Home-AboutPage flex'>
        <div className="navbar flex">
            <Navbar />
        </div>
        <div className="main-about-container flex">
            <div className="about-left-content flex">
                <div className="about-left-main-heading flex">
                    <p><b>EnzoSkills</b></p>
                </div>
                <div className="about-left-sub-heading flex">
                    <p>“Empowering Your Growth, Many Skill at a Time.”</p>
                </div>
                <div className="about-main-content flex">
                    <p>EnzoSkills is a comprehensive learning path dashboard designed to simplify the journey of professional and personal development. Built with the powerful MERN stack. </p>
                    <p>Our platform serves as a centralized hub for learners to manage resources, track their progress, and master new technologies. </p>
                    <p>At EnzoSkills, we believe quality education should be accessible to everyone, regardless of age or gender. </p>
                </div>
            </div>
            <div className="about-right-content flex">
                <div className="about-img flex">
                    <img src="/About-us/About-us-Comp.svg" alt="Center Decoration" className='About-comp-img' />
                </div>
                <div className="know-more-div flex">
                    <button className='know-more-btn small-box-shadow'>Know More About us</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AboutPage