import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router'; // Using react-router-dom for the useLocation hook 📍
import Profile from './Profile/Profile';
import gsap from 'gsap';

function Dash_Navbar() {
    const location = useLocation(); 
    const navigate = useNavigate()
    
    // Check the actual URL to see if we are on the Learning/Courses page 🕵️‍♂️
    const isCoursesPage = location.pathname === '/dashboard/courses';
    const [showProfile, setShowProfile] = useState(false);

    useEffect(() => {
        gsap.fromTo(".dash-nav-ani", {
            opacity: 0,
        } , {
            opacity: 1,
            duration: 1,
            stagger : 0.05,
            delay : 2,
            ease: "power2.out",
        })
    }, [])

    const navLinks = [
        { name: "Overview", path: "/dashboard" },
        { name: "Learning", path: "/dashboard/courses" },
        { name: "Assessments", path: "/dashboard/about" },
        { name: "Roadmap", path: "/dashboard/contact" },
        { name: "Doubts", path: "/dashboard/contact" }, 
    ];

    return (
        <div className='dash-navbar-container'>
            <div className='dash-navbar-left cursor-pointer' onClick={() => navigate("/")}>
                <img src="/full-logo.png" alt="Logo" className='dash-nav-ani dash-navbar-logo' />
            </div>

            {/* Navigation links should generally remain visible so users can navigate 🧭 */}
            <div className={"center flex " + (isCoursesPage ? 'hidden' : 'hidden')}>
                <ul className="nav-links flex">
                    {navLinks.map((link, index) => (
                        <li key={index + link.name}>
                            <NavLink 
                                to={link.path}
                                className={({ isActive }) => `dash-nav-ani text-xs ${isActive ? 'active' : ''}`}
                            >
                                {link.name}
                                <div className="underline"></div>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Searchbar only for Courses Section 🔍 */}
            <div className={isCoursesPage ? 'flex-1 searchbar-div' : 'hidden'}>
                <div className='dash-navbar-searchbar small-box-shadow blue dash-nav-ani'>
                    <img src='/Dashboard/search.svg' alt="Search Icon" />
                    <input type="text" placeholder='Search' className='dash-navbar-input-search' />
                </div>
            </div>

            <div className='dash-navbar-right'>     
                <div onClick={() => setShowProfile(!showProfile)} className='dash-nav-ani z-10 dash-navbar-profile p-1 box-content'>
                    <img onClick={() => setShowProfile(!showProfile)} src='/Dashboard/profile.png' alt="Profile" />
                </div>
                <div className='dash-navbar-menu dash-nav-ani'>
                    <img src='/Dashboard/menu.png' alt="Menu" />
                </div>
            </div>
            <Profile showProfile={showProfile} />
        </div>
    );
}

export default Dash_Navbar;