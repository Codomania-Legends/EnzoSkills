import React from 'react'
import Navbar from '../Navbar/Navbar'
import "../../Utility/global.css"
import "./AboutPage.css"

function MoreAboutUS() {
  return (
    <div className="more-about-container flex justify-center items-center">
        <div className="navbar flex justify-center items-center">
            <Navbar />
        </div>
        <div className="KnowMore-div flex justify-center items-center">
            <div className="KnowMore-Content flex justify-center items-center"></div>
        </div>
    </div>
    

  )
}

export default MoreAboutUS