import React, { useEffect, useRef, useState } from 'react'
import "../../Utility/global.css"
import "./layout.css"
import { NavLink } from 'react-router'
import { useGSAP } from '@gsap/react'
import { Fade_in, Slide_left } from '../../Utility/Animations/Basic'
import gsap from 'gsap'
import { motion } from 'framer-motion'

function Sidebar() {
    const containerRef = useRef(null)
    const [show, setShow] = useState(false)
    useGSAP(() => {
        Fade_in()
        Slide_left()
        gsap.fromTo(".sidebar-box-active", {
            scale: 0,
            duration: 1,
        }, {
            scale: 1,
            duration: 1,
            delay: 1,
            ease: "power2.out",
        })
    }, { scope: containerRef })
    useEffect(() => {
        gsap.fromTo(".sidebar-container", {
            opacity: 0,
        }, {
            opacity: 1,
            duration: 1,
            ease: "power2.out"
        })
    }, [])
    const pages = [
        {
            name: "Home",
            icon: "/Sidebar/home.svg",
            path: "/dashboard/home"
        },
        {
            name: "Library",
            icon: "/Sidebar/library.svg",
            path: "/dashboard/library"
        },
        {
            name: "Courses",
            icon: "/Sidebar/courses.svg",
            path: "/dashboard/courses"
        },
        {
            name: "Project",
            icon: "/Sidebar/project.svg",
            path: "/dashboard/project"
        },
        {
            name: "Room",
            icon: "/Sidebar/room.svg",
            path: "/dashboard/room"
        },
        {
            name: "AI",
            icon: "/Sidebar/AI.svg",
            path: "/dashboard/AI"
        },
        {
            name: "Records",
            icon: "/Sidebar/records.svg",
            path: "/dashboard/records"
        }
    ]
    return (
        <div ref={containerRef} className="sidebar-container hidden md:flex h-[95%] px-2 rounded-2xl flex flex-col justify-around items-center medium-box-shadow white ">
            {pages.map((page, index) => (
                <div className='flex flex-col justify-center items-center'>
                    <NavLink
                        to={page.path}
                        key={index + page.name}
                        className={({ isActive }) => `hidden md:flex group ${isActive ? 'sidebar-box-active p-2 rounded-full justify-center items-center transition-all duration-300 ease-in-out aspect-square bg-[#8A8CAC] shadow-[inset_-4px_-4px_8px_#3537529e,inset_0px_4px_8px_#ffffff,4px_4px_8px_#8A8CAC]' : 'sidebar-box p-2 rounded-full justify-center items-center transition-all duration-300 ease-in-out aspect-square hover:bg-[#c3c4d7] hover:shadow-[inset_4px_4px_20px_#ffffff]'}`}
                    >
                        <>
                            <div className='overflow-hidden'>
                                <img className='slide_left' src={page.icon} alt={page.name} />
                            </div>
                            <p className='-z-10 text-sm transition-all duration-300 ease-in-out absolute font-medium bg-white rounded-[5em] opacity-0 group-hover:px-4 group-hover:py-2 group-hover:z-10 group-hover:translate-x-[calc(100%+1em)] group-hover:opacity-100 small-box-shadow'>{page.name}</p>
                        </>
                    </NavLink>
                    {page.name == "Courses" &&
                        <motion.div
                            initial={{ x: 30, opacity: 0, scaleY: 0 }}
                            animate={{ x: 0, opacity: 1, scaleY: 1 }}
                            transition={{ duration: 1, ease: "power2.out" }}
                            className='h-30 w-0.5 bg-black rounded-full flex justify-center items-center relative top-2'>
                            <div className='h-1.5 w-1.5 aspect-square bg-black rounded-full absolute'></div>
                        </motion.div>}
                </div>
            ))}
            <button className='fade_in flex flex-col justify-around md:hidden items-center h-10 w-10'>
                <img src="/Dashboard/menu.png" onClick={() => setShow(!show)} alt="Menu" className='h-5 w-5 md:hidden' />
                {show &&
                    pages.map((page, index) => (
                        <NavLink
                            to={page.path}
                            key={index + page.name}
                            className={({ isActive }) => `group ${isActive ? 'sidebar-box-active p-2 rounded-full justify-center items-center transition-all duration-300 ease-in-out aspect-square bg-[#8A8CAC] shadow-[inset_-4px_-4px_8px_#3537529e,inset_0px_4px_8px_#ffffff,4px_4px_8px_#8A8CAC]' : 'sidebar-box p-2 rounded-full justify-center items-center transition-all duration-300 ease-in-out aspect-square hover:bg-[#c3c4d7] hover:shadow-[inset_4px_4px_20px_#ffffff]'}`}
                        >
                            <div className='overflow-hidden'>
                                <img className='slide_left' src={page.icon} alt={page.name} />
                            </div>
                            <p className='-z-10 text-sm transition-all duration-300 ease-in-out absolute font-medium bg-white rounded-[5em] opacity-0 group-hover:px-4 group-hover:py-2 group-hover:z-10 group-hover:translate-x-[calc(100%+1em)] group-hover:opacity-100 small-box-shadow'>{page.name}</p>
                        </NavLink>
                    ))}
            </button>
        </div>
    )
}

export default Sidebar