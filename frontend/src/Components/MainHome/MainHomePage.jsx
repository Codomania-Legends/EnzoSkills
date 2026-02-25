import React from 'react'
import "./MainHomePage.css"
import "./MainHomePage.css"
import "../../Utility/global.css"
import Navbar from '../Navbar/Navbar'

function MainHomePage() {
  return (
    <div className='MainHomePage'>
      <div className="navbar flex justify-center items-center">
        <Navbar />
      </div>
      <div className="centerImg flex justify-center items-center">
        <img src="/HomeImg/HomeCenterImg.svg" alt="Center Decoration" className='center-bg-img' />
      </div>

      <div className="main-home-content-div flex justify-center items-center">

        <div className="Home-leftContent flex justify-center items-center">
          {/* left top side  */}
          <div className="leftContentTop flex justify-center items-center">
            <p>Don't waste time figuring out where to start. <b>EnzoSkills</b> curates the perfect learning path for your goals, providing a powerful, unified dashboard to visualize your journey from beginner to expert.</p>
          </div>
          {/* left bottom side  */}
          <div className="leftContentBottom flex justify-center items-center">
            <img src="/HomeImg/HomeArrow.svg" alt="Arrow Decoration" className='arrowPart' />
            <button className='start-learning-btn small-box-shadow black'>Start Learning</button>
          </div>
        </div>

        <div className="Home-rightContent flex justify-center items-center">

          <div className="heading-section-home flex justify-center items-center">
            <div className="Right-content-heading flex justify-center items-center">
              <b>Master Your Next Skill</b>
            </div>
            <div className="Right-content-sub-heading flex justify-center items-center">
              <p>with Absolute Confidence.</p>
            </div>
          </div>

          <div className="rightBottomContent flex justify-center items-center">
            <div className="Home-right-topContent flex justify-center items-center love-light-regular">
              <p>Path</p>
            </div>
            <div className="Home-right-bottomContent flex justify-center items-center love-light-regular">
              <p>Forge</p>
            </div>
          </div>

        </div>

      </div>
      

    </div>
  )
}

export default MainHomePage