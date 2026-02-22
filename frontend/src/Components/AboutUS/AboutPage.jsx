import React from 'react'
import "./AboutPage.css"
import Navbar from '../Navbar/Navbar'
import "../../Utility/global.css"
import HomeBG from "../../../public/HomeImg/HomeBG.svg"
import AboutImg from "../../../public/About-us/About-us-Comp.svg"
import { IoIosInformationCircle } from "react-icons/io";
function AboutPage() {
  return (
    <div className='MainHomePage'>
      <div className="navbar flex">
        <Navbar />
      </div>
      <div className="imageBG">

        {/* Background Layer */}
        <img src={HomeBG} alt="Background" className='bgImg' />
        <section className="section-one flex">
          <section className="left-section flex">
            <div className="about-heading flex">
              <b>EnzoSkills</b>
            </div>
            <div className="about-sub-heading flex">
              <p><b>“Empowering Your Growth, Many Skill at a Time.”</b></p>
            </div>
            <div className="about-content flex">
              <p className='about-content-one flex'>EnzoSkills is a comprehensive learning path dashboard designed to simplify the journey of professional and personal development. Built with the powerful MERN stack. </p>
              <p className='about-content-two flex'>Our platform serves as a centralized hub for learners to manage resources, track their progress, and master new technologies. </p>
              <p className='about-content-three flex'>At EnzoSkills, we believe quality education should be accessible to everyone, regardless of age or gender. </p>
            </div>
          </section>
          <section className="right-section">
            <img src={AboutImg} alt="" className='about-img' />
            <div className="about-btn flex">
              <button className='about-section-btn big-box-shadow blue flex'>Know More About Us</button>
            </div>

          </section>
        </section>
      </div>
    </div>
  )
}

export default AboutPage