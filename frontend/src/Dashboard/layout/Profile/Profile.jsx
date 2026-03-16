import React, { useEffect, useRef, useState } from 'react'
import "./profile.css"
import gsap from 'gsap'
import { WHITE_BOX, Bluish_Box, Project_Box } from './Boxes'
import { skills, education, experience, projects } from './DummyData'

function Profile({ showProfile }) {
    const profileRef = useRef(null)
    
    useEffect(() => {
        showProfile ?
            gsap.fromTo(profileRef.current, {
                opacity: 0,
                x: 50,
            }, {
                opacity: 1,
                x: 0,
                duration: 0.1,
                ease: "power3.inOut",
                onComplete: () => {
                    gsap.from(".show-profile-text", {
                        y: -10,
                        opacity: 0,
                        duration: 1,
                        stagger: 0.05,
                        ease: "power3.inOut"
                    })
                }
            })
            :
            gsap.fromTo(profileRef.current, {
                opacity: 1,
                x: 0,
            }, {
                opacity: 0,
                x: 50,
                duration: 0.1,
                ease: "power3.inOut"
            })
    }, [showProfile])

    const [educationIndex, setEducationIndex] = useState(0)
    const [experienceIndex, setExperienceIndex] = useState(0)
    const [projectIndex, setProjectIndex] = useState(0)

    const [theme , setTheme] = useState("light")

    const handleEducationClick = () => {
        setEducationIndex((prev) => prev === education.length - 1 ? 0 : prev + 1)
    }
    const handleExperienceClick = () => {
        setExperienceIndex((prev) => prev === experience.length - 1 ? 0 : prev + 1)
    }
    const handleProjectClick = () => {
        setProjectIndex((prev) => prev === projects.length - 1 ? 0 : prev + 1)
    }
    

    return (
        <div ref={profileRef} className='profile-container blue medium-box-shadow w-full md:w-[50%] lg:w-[35%] absolute top-15 right-0 z-50 rounded-l-[3rem] h-[90%]'>
            <div className='flex flex-col items-center w-full h-full relative'>
                
                {/* TOP HALF - Info & Skills */}
                <div className='flex flex-col justify-evenly items-center relative -top-15 md:top-0 w-full h-[40%]'>
                    <div className='flex flex-col-reverse md:flex-row justify-between items-center w-[85%] pb-2 pt-5'>
                        <div className='flex gap-1 text-white flex-col justify-evenly items-start'>
                            <p className='show-profile-text text-2xl text-black font-bold font-[Plus Jakarta Sans]'>Anshul Vishwakarma</p>
                            <p className='show-profile-text text-lg font-bold font-[Manrope]'>Full Stack Developer</p>
                            <p className='show-profile-text text-sm font-[Manrope]'>anshulkb123456@gmail.com</p>
                            <p className='show-profile-text text-sm font-[Manrope]'>9165872964</p>
                        </div>
                        <div className='flex h-full justify-center items-center'>
                            <img className='show-profile-text w-25 h-25 aspect-square rounded-full' src="/About-us/members/Anshul.png" alt="Profile" />
                        </div>
                    </div>
                    
                    <div className='line-role-profile flex justify-between w-[85%] items-center'>
                        <div className='line-profile bg-white h-px w-[75%]' />
                        <div className='show-profile-text flex items-center w-[25%] justify-center pl-2'>
                            {WHITE_BOX("Admin", "admin-badge")}
                        </div>
                    </div>
                    
                    <div className='flex justify-evenly flex-col items-start w-[85%] flex-wrap py-2'>
                        <h3 className='show-profile-text text-left text-lg font-bold font-[Manrope] pb-2'>Skills</h3>
                        <div className='flex flex-wrap gap-2 show-profile-text'>
                            {skills.map((skill, index) => WHITE_BOX(skill, `skill-${index}`))}
                        </div>
                    </div>
                </div>

                {/* BOTTOM HALF - Exp, Edu, & Projects */}
                <div className='flex flex-col justify-evenly items-center w-full h-[50%]'>
                    
                    {/* Experience and Education Container */}
                    <div className='flex w-[85%] justify-between items-center show-profile-text gap-4'>
                        
                        {/* Experience */}
                        <div className='flex relative h-full flex-col items-start w-[50%]'>
                            <h3 className='show-profile-text text-left text-lg font-bold font-[Manrope] py-2'>
                                Experience
                            </h3>
                            {/* Wrapping container requires specific height and relative class for absolute items */}
                            <div className='w-full h-32 relative'>
                                {experience.length === 0 ?
                                    Bluish_Box("Fresher", null, null, null, "exp-0", 0, handleExperienceClick)
                                    : experience.map((exp, index) => (
                                        Bluish_Box(exp.role, exp.institute, exp.date, exp.description, index, experienceIndex, handleExperienceClick)
                                    ))}
                            </div>
                        </div>

                        {/* Education */}
                        <div className='flex relative h-full flex-col items-start w-[50%]'>
                            <h3 className='show-profile-text text-left text-lg font-bold font-[Manrope] py-2'>
                                Education
                            </h3>
                            <div className='w-full h-32 relative'>
                                {education.length === 0 ?
                                    Bluish_Box("No Education", null, null, null, "edu-0", 0, handleEducationClick)
                                    : education.map((edu, index) => (
                                        Bluish_Box(edu.role, edu.institute, edu.date, edu.description, index, educationIndex, handleEducationClick)
                                    ))}
                            </div>
                        </div>
                    </div>

                    {/* Projects Container */}
                    <div className='hidden md:flex justify-evenly flex-col items-center w-[85%] flex-wrap'>
                        <h3 className='show-profile-text text-center text-lg font-bold font-[Manrope] py-2'>Projects</h3>
                        <div className='w-full h-20 relative show-profile-text md:w-[75%]'>
                            {projects.map((project, index) => (
                                Project_Box(project.name, project.description, project.repo, project.demo, index, projectIndex, handleProjectClick)
                            ))}
                        </div>
                    </div>
                </div>

                {/* Signout BOTTOM */}
                <div className="show-profile-text signout-bottom-profile flex justify-between items-center w-[85%] h-[10%] absolute bottom-1">
                    <div className='flex justify-center items-center gap-2'>
                        <button className="signout-button text-sm font-[Manrope] text-white cursor-pointer">Sign Out</button>
                        <img src='/Dashboard/signout.svg' alt="sign out" className='h-5 w-5 cursor-pointer' />
                    </div>
                    <img onClick={() => setTheme((prev) => prev === "light" ? "dark" : "light")} src={theme === "light" ? "/Dashboard/light.svg" : "/Dashboard/dark.svg"}  alt="light mode" className='h-7 w-7 cursor-pointer' />
                </div>
            </div>
        </div>
    )
}

export default Profile