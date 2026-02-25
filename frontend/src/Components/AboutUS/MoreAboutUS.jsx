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
        <div className="KnowMore-Content flex justify-center items-center flex-col">
          <div className="know-more-top-descip flex justify-center items-center flex-col">
            <div className="know-more-top-heading flex justify-center items-end">
              <p><b>EnzoSkills</b></p>
            </div>
            <div className="know-more-top-sub-heading flex justify-center items-center">
              <p>EnzoSkills is a comprehensive learning path dashboard designed to simplify the journey of professional and personal development. Built with the powerful MERN stack, our platform serves as a centralized hub for learners to manage resources, track their progress, and master new technologies. We believe in a "less theory, more projects" philosophy, empowering users of all ages and backgrounds through AI-driven roadmaps, real-time mentorship, and hands-on problem-solving.</p>
            </div>
          </div>
          <div className="About-Team-details flex justify-center items-center">
            <p><b>EnzoSkills</b></p>
          </div>
          <div className="Team-Detail-Description flex justify-center items-center flex-col">
                <div className="container-vidhi">
                  <div className="detail-name-container flex justify-start items-center">
                    <span className="font-bold text-gray-800">•</span>
                    <h2 className="font-bold text-gray-900 tracking-tight">
                      Vidhi Agrawal <span className="mx-1 font-normal text-gray-500">I</span> Team Lead & Full Stack Developer
                    </h2>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed max-w-3xl ml-10">
                    Leads project vision and end-to-end MERN development, ensuring a seamless, user-centric platform.
                  </p>
                </div>

                <div className="container-anshul">
                  <div className="detail-name-container flex justify-start items-center">
                    <span className="font-bold text-gray-800">•</span>
                    <h2 className="font-bold text-gray-900 tracking-tight">
                      Anshul Vishwakarma <span className="mx-1 font-normal text-gray-500">I</span> Full Stack Developer
                    </h2>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed max-w-3xl ml-10">
                    Architects robust front-end and back-end solutions to power the EnzoSkills learning experience.
                  </p>
                </div>

                <div className="container-anjali">
                  <div className="detail-name-container flex justify-start items-center">
                    <span className="font-bold text-gray-800">•</span>
                    <h2 className="font-bold text-gray-900 tracking-tight">
                      Anjali Raghuwanshi <span className="mx-1 font-normal text-gray-500">I</span> Lead Researcher
                    </h2>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed max-w-3xl ml-10">
                    Drives content strategy by researching industry trends to keep our roadmaps and catalogs high-quality.
                  </p>
                </div>

                <div className="container-mohini">
                  <div className="detail-name-container flex justify-start items-center">
                    <span className=" font-bold text-gray-800">•</span>
                    <h2 className="font-bold text-gray-900 tracking-tight">
                      Mohini Verma <span className="mx-1 font-normal text-gray-500">I</span> Research Assistant
                    </h2>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed max-w-3xl ml-10">
                    Supports the research department and manages essential project documentation and printing workflows.
                  </p>
                </div>

  
          </div>
        </div>
      </div>
    </div>


  )
}

export default MoreAboutUS