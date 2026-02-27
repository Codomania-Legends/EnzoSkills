import React, { useEffect, useRef, useState } from 'react'
import "../Utility/global.css"
import "./layout.css"
import { NavLink } from 'react-router'
import { useGSAP } from '@gsap/react'
import { Fade_in, Slide_left } from '../Animations/Basic'

function Sidebar() {
    const containerRef = useRef(null)
    const [show , setShow] = useState(false)
    useGSAP( () => {
        Fade_in()
        Slide_left()
    } , {scope : containerRef} )
    const pages = [
        {
            name: "Home",
            icon: "/Sidebar/home.svg",
            path: "/dashboard/home"
        },
        {
            name: "Courses",
            icon: "/Sidebar/courses.svg",
            path: "/dashboard/courses"
        },
        {
            name: "Library",
            icon: "/Sidebar/library.svg",
            path: "/dashboard/library"
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
        <div ref={containerRef} className="sidebar-container medium-box-shadow white p-5">
            {pages.map((page, index) => (
                <NavLink 
                    to={page.path} 
                    key={index + page.name} 
                    className={({ isActive }) => `hidden md:flex ${isActive ? 'sidebar-box-active' : 'sidebar-box'}`}
                >
                    <div className='overflow-hidden'>
                        <img className='slide_left' src={page.icon} alt={page.name} />
                    </div>
                    <p className='z-10 text-block small-box-shadow'>{page.name}</p>
                </NavLink>
            ))}
            <button className='fade_in flex flex-col justify-around md:hidden items-center h-10 w-10'>
                <img src="/Dashboard/menu.png" onClick={() => setShow(!show)} alt="Menu"className='h-5 w-5 md:hidden' />
                {show && 
                    pages.map((page, index) => (
                        <NavLink 
                            to={page.path} 
                            key={index + page.name} 
                            className={({ isActive }) => `${isActive ? 'sidebar-box-active' : 'sidebar-box'}`}
                        >
                            <div className='overflow-hidden'>
                                <img className='slide_left' src={page.icon} alt={page.name} />
                            </div>
                            <p className='z-10 text-block small-box-shadow'>{page.name}</p>
                        </NavLink>
                ))}
            </button>
        </div>
    )
}

export default Sidebar