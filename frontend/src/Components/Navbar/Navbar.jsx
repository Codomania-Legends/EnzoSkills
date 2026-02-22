import React from 'react';
import { NavLink } from 'react-router'; // Import NavLink
import "./Navbar.css";
import Logo from "../../../public/LOGO/LOGO.svg";

function Navbar() {
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' }, // Added path
    { name: 'About us', path: '/about' },
    { name: 'Features', path: '/features' }    // Added path
  ];

  return (
    <div className='Navbar flex'>
      <div className="left">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
      </div>

      <div className="center flex">
        <ul className="nav-links flex">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink 
                to={link.path} 
                // isActive is a built-in property of NavLink in react-router-dom
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {link.name}
                <div className="underline"></div>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="right flex">
        <button className='login-signup-btn big-box-shadow blue flex'>Login/Sign Up</button>
      </div>
    </div>
  );
}
export default Navbar;