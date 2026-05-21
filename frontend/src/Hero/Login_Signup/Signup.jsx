import React from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import { FaLinkedinIn, FaGoogle, FaGithub } from 'react-icons/fa';

import books from '/LoginSignup/books.jpg';
import books2 from '/LoginSignup/books2.jpg';

function Signup() {
    const navigate = useNavigate();

    return (
        <div className="relative flex h-screen w-full items-center p-6 bg-[#f0f2f5] overflow-hidden">
            
            {/* --- MIRRORED BACKGROUND LAYER --- */}
            <div 
                className="absolute inset-0 w-full h-full -scale-x-100 pointer-events-none"
                style={{
                    backgroundImage: "url('/LoginSignup/Login.svg')", 
                    backgroundSize: "cover", 
                    backgroundPosition: "center", 
                    backgroundRepeat: "no-repeat"
                }}
            />

            {/* Signup Card Area */}
            <div className="z-10 flex medium-box-shadow flex-col items-center justify-center w-[35%] h-[80%] rounded-[40px] white px-10 lg:px-16 py-8 ml-[5%] ">
                
                <h1 className="text-center font-['Syne'] text-5xl font-black text-black tracking-tight">
                    Signup
                </h1>
                <p className="text-gray-500 text-sm mb-6">Sign up to continue</p>

                <div className="w-full space-y-4">
                    <div className="relative">
                        <label className="ml-4 text-[11px] font-medium text-gray-400">Username</label>
                        <input 
                            type="text" 
                            placeholder="Enter Your Username" 
                            className="mt-1 w-full small-box-shadow rounded-full bg-[#e6e9ef] px-6 py-3 text-[13px] text-gray-700 outline-none shadow-[inset_0_4px_6px_rgba(0,0,0,0.1)]"
                        />
                    </div>

                    <div className="relative">
                        <label className="ml-4 text-[11px] font-medium text-gray-400">Email</label>
                        <input 
                            type="email" 
                            placeholder="Enter Your Email" 
                            className="mt-1 w-full small-box-shadow rounded-full bg-[#e6e9ef] px-6 py-3 text-[13px] text-gray-700 outline-none shadow-[inset_0_4px_6px_rgba(0,0,0,0.1)]"
                        />
                    </div>

                    <div className="relative">
                        <label className="ml-4 text-[11px] font-medium text-gray-400">Password</label>
                        <input 
                            type="password" 
                            placeholder="Enter Your Password" 
                            className="mt-1 w-full small-box-shadow rounded-full bg-[#e6e9ef] px-6 py-3 text-[13px] text-gray-700 outline-none shadow-[inset_0_4px_6px_rgba(0,0,0,0.1)]"
                        />
                    </div>
                </div>

                <div className="mt-4 flex w-full justify-between px-4 text-[11px] font-bold text-gray-800 uppercase tracking-tighter">
                    <span className="cursor-pointer hover:underline">Already a User?</span>
                    <span className="cursor-pointer hover:underline" onClick={() => navigate('/login')}>LogiN</span>
                </div>
                
                <button 
                    className="mt-8 w-[50%] flex items-center justify-center cursor-pointer rounded-full purple2 overflow-hidden py-3 text-lg white font-bold text-white small-box-shadow transition-transform hover:scale-105 active:scale-95"
                    onClick={(e) => {
                        const inputs = e.currentTarget.parentElement.querySelectorAll('input');
                        Cookies.set("username", inputs[0].value); 
                        navigate("/signform");
                    }}
                >
                    Signup
                </button>

                <div className="mt-6 flex items-center justify-center gap-4">
                    {[FaLinkedinIn, FaGoogle, FaGithub].map((Icon, idx) => (
                        <div 
                            key={idx} 
                            className="flex h-10 w-12 cursor-pointer items-center justify-center rounded-xl bg-[#e0e0e0] text-xl text-black shadow-[0_5px_10px_rgba(0,0,0,0.15)] transition-all hover:-translate-y-1"
                        >
                            <Icon />
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Content Area */}
            <div className='z-10 relative flex flex-col justify-center w-[70%] h-full'>
                
                <div className="absolute right-[5%] top-[20%] text-center text-white z-20">
                    <h2 className="text-[32px] lg:text-[38px] font-bold leading-tight">Welcome Back</h2>
                    <h3 className="text-[22px] lg:text-[26px] opacity-90">to</h3>
                    <h1 className="mt-2 text-[50px] lg:text-[50px] font-extrabold font-['Syne'] leading-none tracking-tight">EnzoSkills</h1>
                </div>

                <div className="absolute top-[45%] right-[40%] z-10">
                    <img 
                        src={books} 
                        alt="books" 
                        className="h-64 w-64 rounded-full object-cover shadow-2xl border-8 border-white/10" 
                    />
                </div>

                <div className="absolute bottom-[-20%] right-[-10%] z-0">
                    <img 
                        src={books2} 
                        alt="books" 
                        className="h-80 w-80 rounded-full object-cover shadow-2xl opacity-90" 
                    />
                </div>
            </div>
        </div>
    );
}

export default Signup;