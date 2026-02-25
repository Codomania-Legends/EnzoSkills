import React from 'react'
import "./AboutPage.css"
import Navbar from '../Navbar/Navbar'
import "../../Utility/global.css"

function MoreAboutUS() {
  return (
    <div className="more-about-container flex-prop">
        <div className="navbar flex-prop">
            <Navbar />
        </div>
        <div className="KnowMore-div flex-prop">
            <div className="KnowMore-Content flex-prop"></div>
        </div>
    </div>
    

  )
}

export default MoreAboutUS