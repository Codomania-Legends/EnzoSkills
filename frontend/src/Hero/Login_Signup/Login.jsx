import React from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import { FaLinkedinIn, FaGoogle, FaGithub } from 'react-icons/fa';

import books from '/LoginSignup/books.jpg';
import books2 from '/LoginSignup/books2.jpg';

function Login() {
    const navigate = useNavigate();

    return (
        <div 
            className="flex h-screen w-full items-center p-6 bg-[#f0f2f5]" 
            style={{
                backgroundImage: "url('/LoginSignup/Login.svg')", 
                backgroundSize: "cover", 
                backgroundPosition: "center", 
                backgroundRepeat: "no-repeat"
            }}
        >
            {/* Left Content Area (50% Width) */}
            {/* Set to relative to anchor the floating book images */}
            <div className='relative flex flex-col justify-center w-[50%] h-full'>
                
                {/* Floating "Welcome" Text */}
                <div className="absolute left-[35%] top-[20%] z-20 w-full -translate-x-1/2 text-center text-white px-6">
                        <h2 className="text-[32px] lg:text-[38px] font-bold leading-tight">Welcome Back</h2>
                        <h3 className="text-[32px] lg:text-[26px] opacity-90">to</h3>
                        <h1 className="mt-2 text-[40px] font-extrabold font-['Syne'] leading-none tracking-tight">EnzoSkills</h1>
                    </div>

                {/* --- ADDED BOOKS IMAGES HERE --- */}
                {/* Book Image 1 (Top-Left) */}
                <div className="absolute top-[60%] left-[50%] z-0">
                    <img 
                        src="/LoginSignup/books.jpg" 
                        alt="stack of books" 
                        className="h-60 w-60 rounded-full object-cover shadow-2xl opacity-80" 
                    />
                </div>

                {/* Book Image 2 (Bottom-Left) */}
                <div className="absolute top-[75%] left-[-15%] z-20">
                    <img 
                        src="/LoginSignup/books2.jpg" 
                        alt="open books spiral" 
                        className="h-90 w-90 rounded-full object-cover shadow-2xl" 
                    />
                </div>
            </div>

            {/* Login Card Area (35% Width) */}
            <div className="flex medium-box-shadow flex-col items-center justify-center w-[35%] h-[70%] rounded-[40px] white px-10 lg:px-16 py-12 ">
                
                <h1 className="mb-6 text-center font-['Syne'] text-5xl font-black text-black tracking-tight">
                    Login
                </h1>

                <div className="w-full space-y-6">
                    <div className="relative">
                        <label className="ml-4 text-[13px] font-medium text-gray-400">
                            Username
                        </label>
                        <input 
                            type="text" 
                            placeholder="Enter Your Username" 
                            className="mt-1 w-full small-box-shadow rounded-full white px-6 py-4 text-[13px] text-gray-700 outline-none placeholder:text-gray-500"
                        />
                    </div>

                    <div className="relative">
                        <label className="ml-4 text-[13px] font-medium text-gray-400">
                            Password
                        </label>
                        <input 
                            type="password" 
                            placeholder="Enter Your Password" 
                            className="mt-1 w-full small-box-shadow rounded-full white px-6 py-4 text-[13px] text-gray-700 outline-none placeholder:text-gray-500"
                        />
                    </div>
                </div>

                <div className="mt-4 flex w-full justify-between px-6 text-[11px] font-semibold text-gray-800 uppercase tracking-tighter">
                    <span className="cursor-pointer hover:underline">Forgot Password?</span>
                    <span className="cursor-pointer hover:underline">New User!</span>
                </div>
                
                <button 
                    className="mt-8 w-[50%] flex items-center justify-center cursor-pointer rounded-full purple2 overflow-hidden py-6 text-lg white font-bold text-white small-box-shadow transition-transform hover:scale-105 active:scale-95"
                    onClick={(e) => {
                        const inputs = e.currentTarget.parentElement.querySelectorAll('input');
                        Cookies.set("username", inputs[0].value); 
                        navigate("/dashboard/home");
                    }}
                >
                    Login
                </button>

                <p className="mt-4 text-center text-sm font-medium text-gray-600">
                    Don't have an account? <span className="cursor-pointer font-bold text-[#7568ff] hover:underline">sign up</span>
                </p>

                {/* Social Icons Section */}
                <div className="mt-4 flex items-center justify-center gap-6">
                    {[FaLinkedinIn, FaGoogle, FaGithub].map((Icon, idx) => (
                        <div 
                            key={idx} 
                            className="flex h-10 w-12 cursor-pointer items-center justify-center rounded-xl bg-[#e0e0e0] text-xl text-black shadow-[0_5px_10px_rgba(0,0,0,0.15)] transition-all hover:-translate-y-1 active:shadow-inner"
                        >
                            <Icon />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Login;
