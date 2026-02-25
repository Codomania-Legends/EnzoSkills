import React from 'react';
import { NavLink, useLocation } from 'react-router'; // Using react-router-dom for the useLocation hook 📍

function Dash_Navbar() {
    const location = useLocation(); 
    
    // Check the actual URL to see if we are on the Learning/Courses page 🕵️‍♂️
    const isCoursesPage = location.pathname === '/dashboard/courses';

    const navLinks = [
        { name: "Overview", path: "/dashboard" },
        { name: "Learning", path: "/dashboard/courses" },
        { name: "Assessments", path: "/dashboard/about" },
        { name: "Roadmap", path: "/dashboard/contact" },
        { name: "Doubts", path: "/dashboard/contact" }, 
    ];

    return (
        <div className='dash-navbar-container'>
            <div className='dash-navbar-left'>
                <img src="/full-logo.png" alt="Logo" className='dash-navbar-logo'/>
            </div>

            {/* Navigation links should generally remain visible so users can navigate 🧭 */}
            <div className={"center flex " + (isCoursesPage ? 'hidden' : 'hidden')}>
                <ul className="nav-links flex">
                    {navLinks.map((link, index) => (
                        <li key={index + link.name}>
                            <NavLink 
                                to={link.path}
                                className={({ isActive }) => `text-xs ${isActive ? 'active' : ''}`}
                            >
                                {link.name}
                                <div className="underline"></div>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Searchbar only for Courses Section 🔍 */}
            <div className={isCoursesPage ? 'flex-1' : 'hidden'}>
                <div className='dash-navbar-searchbar small-box-shadow blue'>
                    <img src='/Dashboard/search.svg' alt="Search Icon" />
                    <input type="text" placeholder='Search' className='dash-navbar-input-search' />
                </div>
            </div>

            <div className='dash-navbar-right'>
                <div className='dash-navbar-profile'>
                    <img src='/Dashboard/profile.png' alt="Profile" />
                </div>
                <div className='dash-navbar-menu'>
                    <img src='/Dashboard/menu.png' alt="Menu" />
                </div>
            </div>
        </div>
    );
}

export default Dash_Navbar;