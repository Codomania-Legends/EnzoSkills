import React from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import { FaLinkedinIn, FaGoogle, FaGithub } from 'react-icons/fa';
import "./LoginSignup.css";

import books2 from '/LoginSignup/books2.jpg';
import { handleSignup } from './handleAuthentication';
import { sileo } from 'sileo';

function Signup() {
    const navigate = useNavigate();

    const handleRegistrationSubmit = async (event) => {
        event.preventDefault();
        const registrationResult = await handleSignup(event);

        if (registrationResult.success) {
            Cookies.set("username", registrationResult.data.user.user_name, { expires: 7 });
            Cookies.set("user_id", registrationResult.data.user.user_id, { expires: 7 });
            navigate('/signform');
        } else {
            sileo.error({ title: 'Signup failed', description: registrationResult.error });
        }
    };

    return (
        <div className="background-fade-in-element relative flex h-screen w-full items-center p-6 bg-[#f0f2f5] overflow-hidden">

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
            <form
                onSubmit={handleRegistrationSubmit}
                className="z-10 slide-up-entry-element animation-delay-300ms flex medium-box-shadow flex-col items-center justify-center w-[35%] rounded-[40px] white px-10 lg:px-16 py-8 ml-[5%] bg-white"
            >
                <h1 className="slide-down-entry-element animation-delay-500ms text-center font-['Syne'] text-5xl font-black text-black tracking-tight">
                    Signup
                </h1>

                <div className="w-full space-y-4 mt-5">
                    <div className="relative slide-up-entry-element animation-delay-600ms">
                        <label className="ml-4 text-[11px] font-medium text-gray-400">Username</label>
                        <input
                            type="text"
                            placeholder="Enter Your Username"
                            name="user_name"
                            className="mt-1 w-full small-box-shadow rounded-full bg-[#e6e9ef] px-6 py-3 text-[13px] text-gray-700 outline-none shadow-[inset_0_4px_6px_rgba(0,0,0,0.1)]"
                        />
                    </div>

                    <div className="relative slide-up-entry-element animation-delay-700ms">
                        <label className="ml-4 text-[11px] font-medium text-gray-400">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Your Email"
                            className="mt-1 w-full small-box-shadow rounded-full bg-[#e6e9ef] px-6 py-3 text-[13px] text-gray-700 outline-none shadow-[inset_0_4px_6px_rgba(0,0,0,0.1)]"
                        />
                    </div>

                    <div className="relative slide-up-entry-element animation-delay-800ms">
                        <label className="ml-4 text-[11px] font-medium text-gray-400">Password</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="Enter Your Password"
                            className="mt-1 w-full small-box-shadow rounded-full bg-[#e6e9ef] px-6 py-3 text-[13px] text-gray-700 outline-none shadow-[inset_0_4px_6px_rgba(0,0,0,0.1)]"
                        />
                    </div>
                </div>

                <div className="slide-up-entry-element animation-delay-900ms mt-4 flex w-full justify-between px-4 text-[11px] font-bold text-gray-800 uppercase tracking-tighter">
                    <span className="cursor-pointer hover:underline">Already a User?</span>
                    <span className="cursor-pointer hover:underline" onClick={() => navigate('/login')}>LogiN</span>
                </div>

                <button
                    className="slide-up-entry-element animation-delay-1000ms mt-8 w-[50%] flex items-center justify-center cursor-pointer rounded-full purple2 overflow-hidden py-3 text-lg font-bold text-white small-box-shadow transition-transform hover:scale-105 active:scale-95 bg-purple-600"
                    type="submit"
                >
                    Signup
                </button>

                <div className="slide-up-entry-element animation-delay-1100ms mt-6 flex items-center justify-center gap-4">
                    {[FaLinkedinIn, FaGoogle, FaGithub].map((Icon, iconIndex) => (
                        <div
                            key={iconIndex}
                            className="flex h-10 w-12 cursor-pointer items-center justify-center rounded-xl bg-[#e0e0e0] text-xl text-black shadow-[0_5px_10px_rgba(0,0,0,0.15)] transition-all hover:-translate-y-1"
                        >
                            <Icon />
                        </div>
                    ))}
                </div>
            </form>

            {/* Right Content Area */}
            <div className="z-10 relative flex flex-col justify-center w-[70%] h-full">

                <div className="absolute right-[5%] top-[20%] text-center text-white z-20">
                    <h2 className="text-[32px] lg:text-[38px] font-bold leading-tight slide-down-entry-element animation-delay-500ms">Welcome Back</h2>
                    <h3 className="text-[22px] lg:text-[26px] opacity-90 slide-down-entry-element animation-delay-600ms">to</h3>
                    <h1 className="mt-2 text-[50px] lg:text-[50px] font-extrabold font-['Syne'] leading-none tracking-tight slide-down-entry-element animation-delay-700ms">EnzoSkills</h1>
                </div>

                <div className="absolute top-[45%] right-[40%] z-10 standard-fade-in-element animation-delay-1000ms">
                    <img
                        src={books2}
                        alt="books"
                        className="animate_images h-64 w-64 rounded-full object-cover shadow-2xl border-8 border-white/10"
                    />
                </div>

                <div className="absolute bottom-[-20%] right-[-10%] z-0 standard-fade-in-element animation-delay-1000ms">
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