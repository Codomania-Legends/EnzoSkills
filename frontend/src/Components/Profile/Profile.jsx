import React, { useEffect, useRef, useState } from 'react'
import "./profile.css"
import gsap from 'gsap'

function WHITE_BOX(text , key){
    return (
        <span key={key} className='white-box-white cursor-pointer text-[#5A4FFF] hover:text-white hover:bg-black transition-all duration-300 rounded-4xl text-[0.6rem] font-medium white font-[Manrope] py-1 px-2 bg-white'>{text}</span>
    )
}

function Bluish_Box(role, institute, date, description, key, index, onClickFunction){
    return (
        <div key={key} className={`bg-[#ffffff25] w-full p-2 rounded-xl flex flex-col gap-1 justify-evenly items-start absolute top-0 ${key === index ? "come-in-front" : "go-back"}`} onClick={onClickFunction}>
            {institute && <div className='flex md:flex-row flex-col justify-between w-full items-center text-white'>
                <p className='text-sm font-semibold font-[Manrope]'>{role}</p>
                <p className='text-[0.6rem] font-[Manrope]'>{date}</p>
            </div>}
            {institute && <p className='text-xs font-semibold font-[Manrope] text-[#534DB4]'>- {institute}</p>}
            {institute && <p className='text-xs font-semibold font-[Manrope] text-[#534DB4]'>{description}</p>}
            {!institute && <p className='text-xs font-semibold font-[Manrope] text-[#534DB4]'>{role}</p>}
        </div>
    )
}

function Profile({showProfile}) {
    const profileRef = useRef(null)
    useEffect( () => {
        showProfile ? 
            gsap.fromTo(profileRef.current, {
                opacity : 0,
                x : 50,
            }, {
                opacity : 1,
                x : 0,
                duration : 0.1,
                ease : "power3.inOut",
                onComplete : () => {
                    gsap.from( ".show-profile-text" , {
                        y : -10,
                        opacity : 0,
                        duration : 1,
                        stagger : 0.05,
                        ease : "power3.inOut"
                    } )
                }
            })
        : 
            gsap.fromTo(profileRef.current, {
                opacity : 1,
                x : 0,
            }, {
                opacity : 0,
                x : 50,
                duration : 0.1,
                ease : "power3.inOut"
            })
    } , [showProfile] )

    const [educationIndex, setEducationIndex] = useState(0)
    const [experienceIndex, setExperienceIndex] = useState(0)

    const handleEducationClick = () => {
        setEducationIndex((prev) => prev === education.length - 1 ? 0 : prev + 1)
    }
    const handleExperienceClick = () => {
        setExperienceIndex((prev) => prev === experience.length - 1 ? 0 : prev + 1)
    }
    const skills = ["React", "Node", "MongoDB", "Python", "Django", "JavaScript", "HTML", "CSS", "Bootstrap"]

    const education = [
        {
            role: "Bachelor of Technology",
            institute: "SVVV, Indore",
            date: "2023 - 2027",
            description: "Computer Science and Engineering"
        },
        {
            role: "Higher Secondary School",
            institute: "Holy Trinity School, Dewas",
            date: "2021 - 2022",
            description: "Science"
        },
        {
            role: "High School",
            institute: "Holy Trinity School, Dewas",
            date: "2020 - 2021",
            description: "10th"
        }
    ]
    const experience = [
        {
            role: "Software Engineer",
            institute: "EnzoSkills",
            date: "2023 - 2027",
            description: "Computer Science and Engineering"
        },
        {
            role: "Full Stack Developer",
            institute: "EnzoSkills",
            date: "2023 - 2027",
            description: "Working on AI based projects"
        }
    ]

    return (
        <div ref={profileRef} className='profile-container flex-col blue medium-box-shadow h-[85%] w-full md:w-[50%] lg:w-[35%]  flex justify-center items-center absolute top-15 right-0 z-50 rounded-l-[3rem] '>
            {/* Profile Header */}
            <div className='flex flex-col-reverse md:flex-row justify-between items-center h-[25%] w-[85%]'>
                <div className='flex h-full text-white flex-col justify-evenly items-start'>
                    <p className=' show-profile-text text-2xl text-black font-bold  font-[Plus Jakarta Sans]'>Anshul Vishwakarma</p>
                    <p className=' show-profile-text text-lg font-bold  font-[Manrope]'>Full Stack Developer</p>
                    <p className=' show-profile-text text-sm font-[Manrope]'>anshulkb123456@gmail.com</p>
                    <p className=' show-profile-text text-sm font-[Manrope]'>9165872964</p>
                </div>
                <div className=' flex h-full justify-center items-center'>
                    <img className='show-profile-text h-[85%] rounded-full' src="/About-us/members/Anshul.png" alt="" srcset="" />
                </div>
            </div>
            {/* Role */}
            <div className='line-role-profile flex justify-between w-[85%] items-center'>
                <div className='line-profile bg-white h-px w-[75%]'/>
                <div className='show-profile-text show-profile-text flex items-center w-[18%] justify-start'>
                    {WHITE_BOX("Admin", 0)}
                </div>
            </div>
            {/* Skills */}
            <div className='flex justify-evenly flex-col items-start w-[85%] flex-wrap '>
                <h3 className='show-profile-text text-left text-lg font-bold font-[Manrope] py-2'>Skills</h3>
                <div className='flex flex-wrap gap-2 show-profile-text'>
                    {skills.map((skill, index) => (
                        WHITE_BOX(skill, index + skill)
                    ))}
                </div>
            </div>
            <div className='flex w-[85%] justify-center items-center show-profile-text py-5'>
                {/* Experience */}
                <div className='flex relative justify-evenly flex-col items-start w-[50%] flex-wrap '>
                    <h3 className='show-profile-text text-left text-lg font-bold font-[Manrope] py-2'>
                        Experience
                    </h3>
                    <div className='flex flex-wrap w-[90%] relative h-30'>
                        {experience.length == 0 ? 
                            Bluish_Box("Fresher", null, null, null, 0, 0, handleExperienceClick)
                        :experience.map((exp, index) => (
                            <div key={index} className='w-full '>
                                {Bluish_Box(exp.role, exp.institute, exp.date, exp.description, index, experienceIndex, handleExperienceClick)}
                            </div>
                        ))}
                    </div>
                </div>
                {/* Education */}
                <div className='flex relative justify-evenly flex-col items-start w-[50%] flex-wrap '>
                    <h3 className='show-profile-text text-left text-lg font-bold font-[Manrope] py-2'>
                        Education
                    </h3>
                    <div className='flex flex-wrap w-[90%] relative h-30'>
                        {education.length == 0 ? 
                            Bluish_Box("No Education", null, null, null, 0, 0, handleEducationClick)
                        :
                            education.map((edu, index) => (
                                <div key={index} className='w-full'>
                                    {Bluish_Box(edu.role, edu.institute, edu.date, edu.description, index, educationIndex, handleEducationClick)}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="show-profile-text signout-bottom-profile flex justify-between w-[80%]">
                <div className='flex justify-center items-center gap-2 cursor-pointer'>
                    <button className="signout-button text-sm font-[Manrope] text-white">Sign Out</button>
                    <img src='/Dashboard/signout.svg' className='h-5 w-5'/>
                </div>
                <img src='/Dashboard/light.svg' className='h-7 w-7 cursor-pointer'/>
            </div>
        </div>
    )
}

export default Profile