import React from 'react';
import { NavLink } from 'react-router'; // Import NavLink
import "./Navbar.css";
import Logo from "../../../public/LOGO/LOGO.svg";

function Navbar() {
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard/home' }, // Added path
    { name: 'About us', path: '/about' },
    { name: 'Features', path: '/features' }    // Added path
  ];

  return (
    <div className='Navbar flex justify-center items-center'>
      <div className="Navbar-left flex justify-center items-center">
          <img src={Logo} alt="Logo" className='Logo-icon'/>
      </div>

      <div className="Navbar-center flex justify-center items-center">
        <ul className="nav-links flex justify-center items-center">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink 
                to={link.path} 
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {link.name}
                <div className="underline"></div>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="Navbar-right flex justify-center items-center">
        <button className='login-signup-btn small-box-shadow blue flex justify-center items-center'>Login/Sign Up</button>
      </div>
    </div>
  );
}
export default Navbar;