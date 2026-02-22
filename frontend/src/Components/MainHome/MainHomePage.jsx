import React from 'react'
import "./MainHomePage.css"
import HomeBG from "../../../public/HomeImg/HomeBG.svg"
import HomeCenterImg from "../../../public/HomeImg/HomeCenterImg.svg"
import HomeArrow from "../../../public/HomeImg/HomeArrow.svg"
import "./MainHomePage.css"
import "../../Utility/global.css"
import Navbar from '../Navbar/Navbar'

function MainHomePage() {
  return (
    <div className='MainHomePage'>
      <div className="navbar flex">
        <Navbar />
      </div>
      <div className="imageBG">

        {/* Background Layer */}
        <img src={HomeBG} alt="Background" className='bgImg' />

        {/* Text Layer - Fixed to the left */}
        <div className="leftContent">
          <p>Don't waste time figuring out where to start. <b>EnzoSkills</b> curates the perfect learning path for your goals, providing a powerful, unified dashboard to visualize your journey from beginner to expert.</p>
        </div>
        <div className="leftContentBottom">
          <img src={HomeArrow} alt="Arrow Decoration" className='arrowPart' />
          <button className='start-learning-btn medium-box-shadow black'>Start Learning</button>
        </div>

        {/* Center/Foreground Image Layer */}
        <div className="centerImg">
          <img src={HomeCenterImg} alt="Center Decoration" className='centerPart' />
        </div>
        <div className="rightContent">
          <div className="heading">
            <b>Master Your Next Skill</b>
          </div>
          <div className="sub-heading">
            <p>with Absolute Confidence.</p>
          </div>
        </div>

        <div className="rightBottomContent">
          <div className="topContent love-light-regular">
            <p>Path</p>
          </div>
          <div className="bottomContent love-light-regular">
            <p>Forge</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default MainHomePage