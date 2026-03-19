import React, { useEffect, useRef } from 'react'; // Added useLayoutEffect and useRef
import { NavLink, useNavigate } from 'react-router'; 
import gsap from 'gsap'; // Import GSAP
import "./Navbar.css";
import Logo from "../../../public/LOGO/LOGO.svg";

function Navbar() {
    const navigate = useNavigate();
    const navRef = useRef(null); // Reference for the container

    const navLinks = [
        { name: 'Home', path: '/home' },
        { name: 'Dashboard', path: '/dashload' },
        { name: 'About us', path: '/about' },
        { name: 'Features', path: '/features' }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
        const tl = gsap.timeline();

        tl.from(".Navbar", {
            y: -100,
            duration: 1,
            ease: "power4.out",
        })
        tl.from(".Logo-icon", {
            opacity: 0,
            y: -20,
            x:-5,
            duration : 0.6,
            delay: 0.5,
        }, "-=0.5")

        tl.from(".nav-links li", {
            opacity: 0,
            y: -10,
            stagger: 0.1,
            duration: 0.5,
            ease: "power2.out"

        }, "-=0.4")

        tl.from(".login-signup-btn", {
            opacity: 0,
            scale: 0.8,
            duration: 0.5,
            ease: "back.out(1.7)"
        }, "-=0.3");

        }, navRef); 

        return () => ctx.revert();
    }, []);

    return (
        <div ref={navRef} className='Navbar flex justify-center items-center'>
        <div className="Navbar-left w-1/6 md:w-1/8 flex justify-center items-center">
            <img src={Logo} alt="Logo" className='Logo-icon'/>
        </div>

        <div className="Navbar-center w-1/2 md:w-2/5 flex justify-center items-center">
            <ul className="nav-links text-[0.5rem] md:text-sm flex justify-center items-center">
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
            <button onClick={() => navigate("/login")} className='login-signup-btn text-[0.5rem] md:text-sm py-2 px-4 rounded-lg small-box-shadow blue flex justify-center items-center'>
            Login <span className='hidden md:flex'>/Sign Up</span>
            </button>
        </div>
        </div>
    );
}
export default Navbar;