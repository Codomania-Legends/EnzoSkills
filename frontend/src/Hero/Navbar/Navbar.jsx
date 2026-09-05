import React, { useEffect, useRef } from 'react'; // Added useLayoutEffect and useRef
import { NavLink, useNavigate } from 'react-router';
// Import GSAP
import "./Navbar.css";
const Logo = "/LOGO/LOGO.svg";

function Navbar() {
    const navigate = useNavigate();
    const navRef = useRef(null); // Reference for the container

    const navLinks = [
        { name: 'Home', path: '/home' },
        { name: 'Dashboard', path: '/dashboard/home' },
        { name: 'About us', path: '/about' },
        { name: 'Features', path: '/features' }];


    useEffect(() => {
        // gsap animations removed
    }, []);

    return (
        <div ref={navRef} className='Navbar flex justify-center items-center'>
            <div className="slide-down Navbar-left w-1/6 md:w-1/8 flex justify-center items-center">
                <img src={Logo} alt="Logo" className='Logo-icon' />
            </div>

            <div className="Navbar-center w-1/2 md:w-2/5 flex justify-center items-center">
                <ul className="nav-links text-[0.5rem] md:text-xs flex justify-center items-center">
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
                </ul>
            </div>

            <div className="slide-down Navbar-right flex justify-center items-center" style={{ animationDelay: '0.4s' }}>
                <button onClick={() => navigate("/login")} className='cursor-pointer hover:text-gray-700 transition-all duration-200 login-signup-btn text-[0.5rem] md:text-xs py-4 px-6 rounded-full small-box-shadow blue flex justify-center items-center'>
                    
                    Login <span className='hidden md:flex'>/Sign Up</span>
                </button>
            </div>
        </div>);

}
export default Navbar;