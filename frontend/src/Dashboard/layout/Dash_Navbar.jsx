import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router';
import { FiShield, FiChevronDown, FiBookOpen, FiCpu } from 'react-icons/fi';
import { useCourse } from '../../Utility/Course';
import Profile from './Profile/Profile';

function Dash_Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const { currentCourse, courseDetails } = useCourse();

    const currentPath = location.pathname;
    const pathSegments = currentPath.split("/").filter(Boolean);

    const isCoursesPage = currentPath === "/dashboard/courses" || currentPath === "/dashboard/courses/";
    const isCourseDetailsPage = currentPath.startsWith("/dashboard/courses/") && pathSegments.length > 2;

    const [showProfile, setShowProfile] = useState(false);
    const [showAdminMenu, setShowAdminMenu] = useState(false);
    const adminMenuRef = useRef(null);

    // Derived safely from params, currentCourse, or first real course in database! 🧠
    const id = params.id || currentCourse?.course_id || currentCourse?._id || courseDetails?.[0]?.course_id || 1;

    // Close admin dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (adminMenuRef.current && !adminMenuRef.current.contains(event.target)) {
                setShowAdminMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navLinks = [
        { name: "Overview", path: "/dashboard/courses/overview/" },
        { name: "Learning", path: "/dashboard/courses/learning/" },
        { name: "Assessments", path: "/dashboard/courses/assessment/" },
        { name: "Roadmap", path: "/dashboard/courses/roadmap/" },
        { name: "Doubts", path: "/dashboard/courses/doubts/" }
    ];

    const isAdminActive = currentPath.includes('/admin') || currentPath.includes('/addmaterial');

    return (
        <div className='h-1/10'>
            <div className='h-full flex items-center justify-between px-4 md:px-8 w-full relative box-border'>

                <div className='flex justify-start items-center h-full w-[15%] cursor-pointer flex-shrink-0' onClick={() => navigate("/")}>
                    <img
                        src="/full-logo.png"
                        alt="Logo"
                        className='dash-nav-ani h-2 pl-10 md:pl-7 sm:h-5 md:h-10 w-auto max-w-[160px] sm:max-w-[200px] md:max-w-none object-contain object-left' />
                </div>

                {/* Links Section with updated flag 🚩 */}
                <div className={"center max-w-[40%] md:max-w-none flex justify-evenly w-auto md:w-1/2 " + (isCourseDetailsPage ? 'flex' : 'hidden')}>
                    <ul className="nav-links flex items-center gap-4 md:gap-0 overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden scroll-smooth">
                        {navLinks.map((link, index) =>
                            <li key={index + link.name} className="inline-block flex-shrink-0 text-xs">
                                <NavLink
                                    to={`${link.path}${id}`}
                                    className={({ isActive }) => `dash-nav-ani text-xs md:text-sm px-2 md:px-0 ${isActive ? 'text-white font-bold' : 'text-gray-500'}`}>
                                    <span className='text-xs'>{link.name}</span>
                                    <div className="underline"></div>
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </div>

                {/* Searchbar Only with updated flag 🎯 */}
                <div className={isCoursesPage ? 'flex-1 flex justify-end px-2 sm:px-0' : 'hidden'}>
                    <div className='small-box-shadow blue dash-nav-ani flex items-center gap-2 max-sm:max-w-[44px] max-sm:px-3 max-sm:rounded-full max-sm:overflow-hidden rounded-full px-4 py-3 w-[25%] justify-self-end focus-within:shadow-[0px_0px_20px_rgba(58,62,108,0.5),inset_0_5px_10px_rgba(255,255,255,0.5),inset_-10px_-10px_20px_rgba(58,62,108,0.6)] focus-within:transition-all focus-within:duration-300'>
                        <img src='/Dashboard/search.svg' alt="Search Icon" className="w-3 h-3 flex-shrink-0" />
                        <input
                            type="text"
                            placeholder='Search...'
                            className='text-[10px] font-medium ml-[5%] text-white tracking-[0.05em] flex-1 max-sm:hidden bg-transparent outline-none w-full' />
                    </div>
                </div>

                {/* Admin Menu, Profile & Menu Controls 👤 */}
                <div className='flex items-center justify-end gap-2 md:gap-4 h-full flex-shrink-0'>
                    {/* Admin Dropdown Menu */}
                    <div ref={adminMenuRef} className="relative z-20">
                        <button
                            onClick={() => setShowAdminMenu(!showAdminMenu)}
                            className={`dash-nav-ani flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full small-box-shadow cursor-pointer transition-all duration-300 ${
                                isAdminActive
                                    ? 'blue text-white shadow-md'
                                    : 'white text-gray-800 hover:text-[#7F77FF]'
                            }`}
                            title="Admin Options"
                        >
                            <FiShield className={`text-xs md:text-sm ${isAdminActive ? 'text-white' : 'text-[#7F77FF]'}`} />
                            <span className="text-xs md:text-sm font-bold">Admin</span>
                            <FiChevronDown className={`text-xs transition-transform duration-200 ${showAdminMenu ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Admin Dropdown Popover */}
                        {showAdminMenu && (
                            <div className="absolute right-0 top-full mt-2 w-72 bg-white/95 backdrop-blur-md rounded-2xl medium-box-shadow white border border-indigo-100 p-2 shadow-2xl z-50">
                                <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between">
                                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-500">
                                        Admin Management
                                    </span>
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#7F77FF]/15 text-[#534DB4]">
                                        EnzoSkills
                                    </span>
                                </div>

                                <div className="flex flex-col gap-1 py-1">
                                    {/* 1. Daywise Material Option */}
                                    <button
                                        onClick={() => {
                                            setShowAdminMenu(false);
                                            navigate('/dashboard/admin/material');
                                        }}
                                        className={`flex items-start gap-3 p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                                            currentPath.includes('/admin/material') || currentPath.includes('/addmaterial')
                                                ? 'bg-indigo-50/80 text-[#534DB4]'
                                                : 'hover:bg-gray-50 text-gray-700'
                                        }`}
                                    >
                                        <div className="h-8 w-8 rounded-lg bg-[#7F77FF]/15 text-[#534DB4] flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <FiBookOpen className="text-base" />
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-gray-900">Daywise Material</div>
                                            <div className="text-[11px] text-gray-500 leading-tight">
                                                Add & manage daywise lesson material
                                            </div>
                                        </div>
                                    </button>

                                    {/* 2. Assessment Generator Option */}
                                    <button
                                        onClick={() => {
                                            setShowAdminMenu(false);
                                            navigate('/dashboard/admin/course');
                                        }}
                                        className={`flex items-start gap-3 p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                                            currentPath.includes('/admin/course')
                                                ? 'bg-indigo-50/80 text-[#534DB4]'
                                                : 'hover:bg-gray-50 text-gray-700'
                                        }`}
                                    >
                                        <div className="h-8 w-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <FiCpu className="text-base" />
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-gray-900">Assessment Generator</div>
                                            <div className="text-[11px] text-gray-500 leading-tight">
                                                Generate AI multiple-choice assessments
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Profile & History Controls */}
                    <div
                        onMouseOver={(e) => e.target.style.setProperty("--boxColor", "#7a97ffff")}
                        onMouseLeave={(e) => e.target.style.setProperty("--boxColor", "#e7ecfe")}
                        onClick={() => setShowProfile(!showProfile)}
                        className='dash-nav-ani z-10 flex justify-center items-center p-2 cursor-pointer white small-box-shadow rounded-full icon-shadow'
                        title="Profile"
                    >
                        <img src='/Dashboard/profile.png' alt="Profile" className="w-4 h-4 object-contain" />
                    </div>

                    <div
                        onMouseOver={(e) => e.target.style.setProperty("--boxColor", "#7a97ffff")}
                        onMouseLeave={(e) => e.target.style.setProperty("--boxColor", "#e7ecfe")}
                        className='dash-nav-ani z-10 flex justify-center items-center p-2 cursor-pointer white small-box-shadow rounded-full icon-shadow'
                        onClick={() => navigate("/dashboard/history")}
                        title="History"
                    >
                        <img src="/Sidebar/records.svg" alt="records" className="w-4 h-4 object-contain" />
                    </div>
                </div>

                <Profile showProfile={showProfile} />
            </div>
        </div>
    );
}

export default Dash_Navbar;