import React from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router'; // Import NavLink
import "./Navbar.css";
import Logo from "../../../public/LOGO/LOGO.svg";

function Navbar() {
  const navigate = useNavigate()
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashload' }, // Added path
    { name: 'About us', path: '/about' },
    { name: 'Features', path: '/features' }    // Added path
  ];

  return (
    <div className='Navbar flex justify-center items-center'>
      <div className="Navbar-left w-1/6 md:w-1/8  flex justify-center items-center">
          <img src={Logo} alt="Logo" className='Logo-icon'/>
      </div>

      <div className="Navbar-center w-1/2 md:w-2/5  flex justify-center items-center">
        <ul className="nav-links text-[0.5rem] md:text-sm  flex justify-center items-center">
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
        <button onClick={() => navigate("/login")} className='login-signup-btn text-[0.5rem] md:text-sm py-2 px-4 rounded-lg small-box-shadow blue flex justify-center items-center'>Login <span className='hidden md:flex'>/Sign Up</span> </button>
      </div>
    </div>
  );
}
export default Navbar;