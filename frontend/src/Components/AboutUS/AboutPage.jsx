import React from 'react'
import "./AboutPage.css"
import Navbar from '../Navbar/Navbar'
import "../../Utility/global.css"
import { useNavigate } from 'react-router'
function AboutPage() {
    const navigate = useNavigate();
  return (
    <div className='Home-AboutPage flex-prop'>
        <div className="navbar flex-prop">
            <Navbar />
        </div>
        <div className="main-about-container flex-prop">
            <div className="about-left-content flex-prop">
                <div className="about-left-main-heading flex-prop">
                    <p><b>EnzoSkills</b></p>
                </div>
                <div className="about-left-sub-heading flex-prop">
                    <p>“Empowering Your Growth, Many Skill at a Time.”</p>
                </div>
                <div className="about-main-content flex-prop">
                    <p>EnzoSkills is a comprehensive learning path dashboard designed to simplify the journey of professional and personal development. Built with the powerful MERN stack. </p>
                    <p>Our platform serves as a centralized hub for learners to manage resources, track their progress, and master new technologies. </p>
                    <p>At EnzoSkills, we believe quality education should be accessible to everyone, regardless of age or gender. </p>
                </div>
            </div>
            <div className="about-right-content flex-prop">
                <div className="about-img flex-prop">
                    <img src="/About-us/About-us-Comp.svg" alt="Center Decoration" className='About-comp-img' />
                </div>
                <div className="know-more-div flex-prop">
                    <button 
                        onClick={() => navigate("/about/more")}
                        className='know-more-btn small-box-shadow
                    '>Know More About us</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AboutPage