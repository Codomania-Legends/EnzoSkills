import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router';
import Profile from './Profile/Profile';
import gsap from 'gsap';

function Dash_Navbar() {
    const location = useLocation();
    const navigate = useNavigate()

    let isCoursesPage = location.pathname.startsWith("/dashboard/courses");
    const isCourseDetailsPage = location.pathname.split("/")[3]

    if (isCourseDetailsPage) {
        isCoursesPage = false;
    }
    const [showProfile, setShowProfile] = useState(false);
    const [id, setID] = useState(location.pathname.split("/")[2]);

    const navLinks = [
        { name: "Overview", path: "/dashboard/courses/overview/" },
        { name: "Learning", path: "/dashboard/courses/learning/" },
        { name: "Assessments", path: "/dashboard/courses/assessment/topic/" },
        { name: "Roadmap", path: "/dashboard/courses/roadmap/" },
        { name: "Doubts", path: "/dashboard/courses/doubts/" },
    ];
    const params = useParams();

    useEffect(() => {
        setID(params.id ? params.id : 1);
    }, [location.pathname]);

    useEffect(() => {
        gsap.fromTo(".dash-nav-ani", {
            opacity: 0,
        }, {
            opacity: 1,
            duration: 1,
            stagger: 0.05,
            delay: 2,
            ease: "power2.out",
        })
    }, [])

    return (
        <div className='dash-navbar-container h-1/10'>
            <div className='dash-navbar-left cursor-pointer' onClick={() => navigate("/")}>
                <img src="/full-logo.png" alt="Logo" className='dash-nav-ani dash-navbar-logo' />
            </div>

            <div className={"center flex w-[50%] " + (isCourseDetailsPage ? 'flex' : 'hidden')}>
                <ul className="nav-links flex">
                    {navLinks.map((link, index) => (
                        <li key={index + link.name}>
                            <NavLink
                                to={`${link.path}${id}`}
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
                <div onClick={() => setShowProfile(!showProfile)} className='dash-nav-ani z-10 dash-navbar-profile p-1 box-content cursor-pointer'>
                    <img onClick={() => setShowProfile(!showProfile)} src='/Dashboard/profile.png' alt="Profile" />
                </div>
                <div className='dash-navbar-menu dash-nav-ani cursor-pointer'>
                    <img src='/Dashboard/menu.png' alt="Menu" />
                </div>
            </div>
            <Profile showProfile={showProfile} />
        </div>
    );
}

export default Dash_Navbar;