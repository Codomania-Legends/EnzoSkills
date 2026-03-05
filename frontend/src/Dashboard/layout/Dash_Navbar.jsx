import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router'; // Using react-router-dom for the useLocation hook 📍
import Profile from './Profile/Profile';

function Dash_Navbar() {
    const location = useLocation(); 
    const navigate = useNavigate()
    
    // Check the actual URL to see if we are on the Learning/Courses page 🕵️‍♂️
    const isCoursesPage = location.pathname === '/dashboard/courses';
    const [showProfile, setShowProfile] = useState(false);

    useEffect(() => {
        console.log(showProfile);
    }, [showProfile]);

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
                <img src="/full-logo.png" alt="Logo" className='dash-navbar-logo' />
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
                <div onClick={() => setShowProfile(!showProfile)} className='z-10 dash-navbar-profile p-1 box-content'>
                    <img onClick={() => setShowProfile(!showProfile)} src='/Dashboard/profile.png' alt="Profile" />
                </div>
                <div className='dash-navbar-menu'>
                    <img src='/Dashboard/menu.png' alt="Menu" />
                </div>
            </div>
            <Profile showProfile={showProfile} />
        </div>
    );
}

export default Dash_Navbar;