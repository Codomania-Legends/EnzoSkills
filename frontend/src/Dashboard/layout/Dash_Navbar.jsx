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
        <div className='dash-navbar-container h-1/10 flex items-center justify-between px-4 md:px-8 w-full relative box-border'>
          
            <div className='dash-navbar-left flex items-center h-full w-[40%] cursor-pointer flex-shrink-0' onClick={() => navigate("/")}>
                <img 
                    src="/full-logo.png" 
                    alt="Logo" 
                    className='dash-nav-ani pl-20 md:pl-0 dash-navbar-logo h-14 sm:h-16 md:h-20 w-auto max-w-[160px] sm:max-w-[200px] md:max-w-none object-contain object-left' 
                />
            </div>

            {/* Links Section */}
            <div className={"center max-w-[40%] md:max-w-none flex justify-evenly w-auto md:w-1/2 " + (isCourseDetailsPage ? 'flex' : 'hidden')}>
                <ul className="nav-links flex items-center gap-4 md:gap-0 overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden scroll-smooth">
                    {navLinks.map((link, index) => (
                        <li key={index + link.name} className="inline-block flex-shrink-0">
                            <NavLink
                                to={`${link.path}${id}`}
                                className={({ isActive }) => `dash-nav-ani text-xs md:text-sm px-2 md:px-0 ${isActive ? 'active' : ''}`}
                            >
                                {link.name}
                                <div className="underline"></div>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Searchbar Only */}
            <div className={isCoursesPage ? 'flex-1 searchbar-div flex justify-end  px-2 sm:px-0' : 'hidden'}>
                <div className='dash-navbar-searchbar small-box-shadow blue dash-nav-ani flex items-center gap-2 max-sm:max-w-[44px] max-sm:px-3 max-sm:rounded-full max-sm:overflow-hidden'>

                    <img src='/Dashboard/search.svg' alt="Search Icon" className="w-5 h-5 flex-shrink-0" />
                    <input 
                        type="text" 
                        placeholder='Search' 
                        className='dash-navbar-input-search max-sm:hidden bg-transparent outline-none w-full' 
                    />

                </div>

            </div>

            {/* Profile & Menu Controls */}
            <div className='dash-navbar-right flex items-center gap-3 mr-3 md:mr-0 flex-shrink-0'>
                <div onClick={() => setShowProfile(!showProfile)} className='dash-nav-ani z-10 dash-navbar-profile p-1 box-content cursor-pointer md:w-auto md:h-auto'>
                    <img onClick={() => setShowProfile(!showProfile)} src='/Dashboard/profile.png' alt="Profile" className="w-10 h-4 md:object-contain md:h-12 md:w-12 " />
                </div>
                <div className='dash-navbar-menu dash-nav-ani cursor-pointer md:w-auto md:h-auto'>
                    <img src='/Dashboard/menu.png' alt="Menu" className="w-15 h-3 md:object-contain md:h-15 md:w-15" />
                </div>
            </div>
            
            <Profile showProfile={showProfile} />
        </div>
    );
}

export default Dash_Navbar;