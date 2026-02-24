import React from 'react'
import "./MainHomePage.css"
import "./MainHomePage.css"
import "../../Utility/global.css"
import Navbar from '../Navbar/Navbar'

function MainHomePage() {
  return (
    <div className='MainHomePage'>
      <div className="navbar flex">
        <Navbar />
      </div>
      <div className="centerImg flex">
        <img src="/HomeImg/HomeCenterImg.svg" alt="Center Decoration" className='center-bg-img' />
      </div>

      <div className="main-home-content-div flex">

        <div className="Home-leftContent flex">
          {/* left top side  */}
          <div className="leftContentTop flex">
            <p>Don't waste time figuring out where to start. <b>EnzoSkills</b> curates the perfect learning path for your goals, providing a powerful, unified dashboard to visualize your journey from beginner to expert.</p>
          </div>
          {/* left bottom side  */}
          <div className="leftContentBottom flex">
            <img src="/HomeImg/HomeArrow.svg" alt="Arrow Decoration" className='arrowPart' />
            <button className='start-learning-btn small-box-shadow black'>Start Learning</button>
          </div>
        </div>

        <div className="Home-rightContent flex">

          <div className="heading-section-home flex">
            <div className="Right-content-heading flex">
              <b>Master Your Next Skill</b>
            </div>
            <div className="Right-content-sub-heading flex">
              <p>with Absolute Confidence.</p>
            </div>
          </div>

          <div className="rightBottomContent flex">
            <div className="Home-right-topContent flex love-light-regular">
              <p>Path</p>
            </div>
            <div className="Home-right-bottomContent flex love-light-regular">
              <p>Forge</p>
            </div>
          </div>

        </div>

      </div>
      

    </div>
  )
}

export default MainHomePage