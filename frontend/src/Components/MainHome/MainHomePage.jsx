import React from 'react'
import "./MainHomePage.css"
import HomeBG from "../../../public/HomeImg/HomeBG.svg"
import HomeCenterImg from "../../../public/HomeImg/HomeCenterImg.svg"
import "./MainHomePage.css"
import "../../Utility/global.css"

function MainHomePage() {
  return (
    <div className='MainHomePage'>
        <div className="imageBG flex">
            <img src={HomeBG} alt="" className='bgImg' />
            <div className="centerImg flex">
                <img src={HomeCenterImg} alt="" className='centerPart' />
            </div>
        </div>
    </div>
  )
}

export default MainHomePage