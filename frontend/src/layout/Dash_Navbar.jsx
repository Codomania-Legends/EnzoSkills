import React from 'react'
import { NavLink } from 'react-router'

function Dash_Navbar({active}) {
    const navLinks = [
    { name: "Overview", path: "/" },
    { name: "Learning", path: "/courses" },
    { name: "Assessments", path: "/about" },
    { name: "Roadmap", path: "/contact" },
    { name: "Doubts", path: "/contact" },
  ];
  return (
    <div className='dash-navbar-container'>
        <div className='dash-navbar-left'>
            <img src="/full-logo.png" alt="Logo" className='dash-navbar-logo'/>
        </div>

        <div className={active == "courses" ? "center flex" : "hidden"}>
            <ul className="nav-links flex">
            {navLinks.map((link) => (
                <li key={link.name}>
                <NavLink 
                    to={link.path} 
                    // isActive is a built-in property of NavLink in react-router       -dom
                    className={`text-xs ${({ isActive }) => (isActive ? 'active' : '')}`}
                >
                    {link.name}
                    <div className="underline"></div>
                </NavLink>
                </li>
            ))}
            </ul>
        </div>

            {/* Searchbar only for Courses Section */}
            <div className={active ? 'flex-1' : 'hidden'}>
                <div className='dash-navbar-searchbar small-box-shadow blue'>
                    <img src='/Dashboard/search.svg' />
                    <input type="text" placeholder='Search' className='dash-navbar-input-search' />
                </div>
            </div>
        <div className='dash-navbar-right'>
            <div className='dash-navbar-profile'>
                <img src='/Dashboard/profile.png' />
            </div>
            <div className='dash-navbar-menu'>
                <img src='/Dashboard/menu.png' />
            </div>
        </div>
    </div>
  )
}

export default Dash_Navbar