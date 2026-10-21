import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { FiChevronDown, FiBookOpen, FiCpu } from 'react-icons/fi';
import "./Navbar.css";
const Logo = "/LOGO/LOGO.svg";

function Navbar() {
    const navigate = useNavigate();
    const navRef = useRef(null);
    const [showAdminMenu, setShowAdminMenu] = useState(false);
    const adminMenuRef = useRef(null);

    const navLinks = [
        { name: 'Home', path: '/home' },
        { name: 'Dashboard', path: '/dashboard/home' },
        { name: 'About us', path: '/about' },
        { name: 'Features', path: '/features' }
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (adminMenuRef.current && !adminMenuRef.current.contains(event.target)) {
                setShowAdminMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={navRef} className='Navbar flex justify-center items-center'>
            <div className="slide-down Navbar-left w-1/6 md:w-1/8 flex justify-center items-center">
                <img src={Logo} alt="Logo" className='Logo-icon' />
            </div>

            <div className="Navbar-center w-1/2 md:w-2/5 flex justify-center items-center">
                <ul className="nav-links text-[0.5rem] md:text-xs flex justify-center items-center gap-3 md:gap-6">
                    {navLinks.map((link, index) =>
                        <li key={link.name} className='slide-down' style={{ animationDelay: `${0.1 * index}s` }}>
                            <NavLink
                                to={link.path}
                                className={({ isActive }) => isActive ? 'active' : ''}>
                                {link.name}
                                <div className="underline"></div>
                            </NavLink>
                        </li>
                    )}

                    {/* Admin Dropdown in Hero Navbar */}
                    <li className='slide-down relative' ref={adminMenuRef} style={{ animationDelay: '0.4s' }}>
                        <button
                            onClick={() => setShowAdminMenu(!showAdminMenu)}
                            className='flex items-center gap-1 cursor-pointer font-medium hover:text-[#7F77FF] transition-colors text-[0.5rem] md:text-xs py-1'
                        >
                            <span>Admin</span>
                            <FiChevronDown className={`text-[10px] transition-transform duration-200 ${showAdminMenu ? 'rotate-180' : ''}`} />
                        </button>

                        {showAdminMenu && (
                            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 bg-white/95 backdrop-blur-md rounded-2xl medium-box-shadow white border border-indigo-100 p-2 shadow-2xl z-50 text-left">
                                <div className="px-3 py-1.5 border-b border-gray-100 text-[9px] font-extrabold uppercase tracking-wider text-gray-400">
                                    Admin Management
                                </div>
                                <div className="flex flex-col gap-1 py-1">
                                    {/* Daywise Material Option */}
                                    <button
                                        onClick={() => {
                                            setShowAdminMenu(false);
                                            navigate('/dashboard/admin/material');
                                        }}
                                        className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-gray-50 text-gray-700 transition-all cursor-pointer text-left"
                                    >
                                        <div className="h-7 w-7 rounded-lg bg-[#7F77FF]/15 text-[#534DB4] flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <FiBookOpen className="text-sm" />
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-gray-900">Daywise Material</div>
                                            <div className="text-[10px] text-gray-500 leading-tight">Add daywise lesson content</div>
                                        </div>
                                    </button>

                                    {/* Assessment Generator Option */}
                                    <button
                                        onClick={() => {
                                            setShowAdminMenu(false);
                                            navigate('/dashboard/admin/course');
                                        }}
                                        className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-gray-50 text-gray-700 transition-all cursor-pointer text-left"
                                    >
                                        <div className="h-7 w-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <FiCpu className="text-sm" />
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-gray-900">Assessment Generator</div>
                                            <div className="text-[10px] text-gray-500 leading-tight">AI topic assessment studio</div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        )}
                    </li>
                </ul>
            </div>

            <div className="slide-down Navbar-right flex justify-center items-center" style={{ animationDelay: '0.4s' }}>
                <button onClick={() => navigate("/login")} className='cursor-pointer hover:text-gray-700 transition-all duration-200 login-signup-btn text-[0.5rem] md:text-xs py-4 px-6 rounded-full small-box-shadow blue flex justify-center items-center'>
                    Login <span className='hidden md:flex'>/Sign Up</span>
                </button>
            </div>
        </div>
    );
}

export default Navbar;