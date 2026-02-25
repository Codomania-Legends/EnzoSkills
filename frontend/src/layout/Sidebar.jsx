import React from 'react'
import "../Utility/global.css"
import "./layout.css"
import { NavLink } from 'react-router'

function Sidebar({active}) {
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
        <div className="sidebar-container medium-box-shadow white p-5">
            {pages.map((page, index) => (
                <NavLink 
                    to={page.path} 
                    key={index + page.name} 
                    className={({ isActive }) => isActive ? 'sidebar-box-active' : 'sidebar-box'}
                >
                    <img src={page.icon} alt={page.name} />
                    <p className='text-block small-box-shadow'>{page.name}</p>
                </NavLink>
            ))}
        </div>
    )
}

export default Sidebar