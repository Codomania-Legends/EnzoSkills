import React, { useEffect } from 'react'
import "./Home.css"
import "../../Utility/global.css"
import Navbar from '../Navbar/Navbar'

function Home() {
  return (
    <div className='MainHomePage'>
      <div className="navbar flex justify-center items-center">
        <Navbar />
      </div>
      
      <div className="centerImg h-[40%] w-[80%] top-[15%] mt-[15%] md:mt-[20%] lg:mt-0 md:h-[60%] md:w-[70%] lg:h-[90%] lg:w-full lg:bottom-0 flex justify-center items-center ml-[25%] md:ml-[30%] lg:ml-0">
        <img src="/HomeImg/HomeCenterImg.svg" alt="Center Decoration" className='center-bg-img h-full' />
      </div>

      <div className="main-home-content-div flex justify-center items-center">

        <div className="Home-leftContent hidden  lg:flex justify-center items-center">
          {/* left top side  */}
          <div className="leftContentTop md:w-[45%] mr-[30%] lg:w-[45%] text-md flex justify-center items-center">
            <p>Don't waste time figuring out where to start. <b>EnzoSkills</b> curates the perfect learning path for your goals, providing a powerful, unified dashboard to visualize your journey from beginner to expert.</p>
          </div>
          
          {/* left bottom side  */}
          <div className="leftContentBottom h-[20%] w-[50%] md:h-[35%] md:w-[60%] flex justify-end items-center">
            <img src="/HomeImg/HomeArrow.svg" alt="Arrow Decoration" className='arrowPart bottom-[23%] right-[20%]' />
            <button className='start-learning-btn text-white rounded-full pt-[1em] pr-[8em] pb-[1em] pl-[3em] small-box-shadow black md:text-xl text-sm '>Start Learning</button>
          </div>
        </div>

        <div className="Home-rightContent  md:h-full lg:h-[90%] md:w-full lg:w-[50%] h-[70%] w-full flex md:justify-start justify-center items-center">

          <div className="heading-section-home mt-[-25%] lg:mt-0 md:mt-0 md:h-[10%] md:w-[50%] lg:h-[40%] lg:w-[50%] h-[30%] w-[60%] md:ml-[20%] ml-[-10%] flex justify-start md:justify-center items-center">
            <div className="Right-content-heading md:text-2xl text-l flex justify-start items-end">
              <b>Master Your Next Skill</b>
            </div>
            <div className="Right-content-sub-heading md:text-xl text-sm flex justify-end items-start">
              <p>with Absolute Confidence.</p>
            </div>
          </div>

          <div className="leftContentTop md:w-[90%] md:text-center md:h-[10%] text-md md:flex hidden lg:hidden justify-center items-start">
            <p>Don't waste time figuring out where to start. <b>EnzoSkills</b> curates the perfect learning path for your goals, providing a powerful, unified dashboard to visualize your journey from beginner to expert.</p>
          </div>

          <div className="rightBottomContent mt-8 h-[30%] w-[90%] md:h-[40%] md:w-[60%] lg:h-[60%] lg:w-[60%] flex flex-col md:mr-[30%] lg:mr-0 md:mt-[30%] lg:mt-0 justify-end items-start">
            <div className="Home-right-topContent md:text-[10em] lg:text-[12em] text-[6em] h-[70%] w-[55%] md:h-[40%] lg:h-[50%] md:w-[70%] flex justify-start items-start love-light-regular">
              <p>Path</p>
            </div>
            <div className="Home-right-bottomContent md:text-[5em] lg:text-[7em] text-[4em] h-[70%] w-[55%] md:h-[40%] lg:h-[50%] md:w-[70%] flex md:justify-end justify-start items-start love-light-regular">
              <p>Forge</p>
            </div>
          </div>

          <div className="leftContentBottom h-[40%] w-[70%] md:h-[10%] md:w-[90%] lg:hidden flex justify-center md:justify-start items-center">
            <img src="/HomeImg/HomeArrow.svg" alt="Arrow Decoration" className='arrowPart bottom-[25%] md:hidden right-[15%]' />
            <button className='start-learning-btn text-white rounded-full pt-[1em] pr-[8em] pb-[1em] pl-[3em] small-box-shadow black md:text-xl text-sm '>Start Learning</button>
          </div>
        </div>

      </div>
      

    </div>
  )
}

export default Home