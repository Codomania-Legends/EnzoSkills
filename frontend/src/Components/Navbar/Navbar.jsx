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
    <div className='Navbar flex-prop'>
      <div className="Navbar-left flex-prop">
          <img src={Logo} alt="Logo" className='Logo-icon'/>
      </div>

      <div className="Navbar-center flex-prop">
        <ul className="nav-links flex-prop">
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

      <div className="Navbar-right flex-prop">
        <button className='login-signup-btn small-box-shadow blue flex-prop'>Login/Sign Up</button>
      </div>
    </div>
  );
}
export default Navbar;