import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import { FaLinkedinIn, FaGoogle, FaGithub, FaGasPump } from 'react-icons/fa';
import "./LoginSignup.css"
import { handleLogin } from './handleAuthentication';
import { sileo } from 'sileo';

import gsap from "gsap"

function Login() {
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        const result = await handleLogin(e);
        if (result.success) {
            Cookies.set("username", result.data.user.user_name);
            Cookies.set("user_id", result.data.user.user_id);
            navigate("/dashboard/home");
        } else {
            sileo.error('Login failed: ' + result.error);
        }
    };

    useEffect(() => {
        const timeline = gsap.timeline()

        timeline.fromTo(".bg-image", {
            opacity: 0,
        }, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
        })

        timeline.fromTo(".text", {
            opacity: 0,
            y: -100,
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.3,
            ease: "power2.out"
        })

        const cardTimeline = gsap.timeline({ delay: 1 })

        cardTimeline.fromTo(".animate-card", {
            opacity: 0,
        }, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
        })

        cardTimeline.fromTo(".animate-inputs", {
            opacity: 0,
            y: 100,
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.3,
            ease: "power2.out"
        })

    }, [])

    return (
        <div
            className="bg-image opacity-0 flex h-screen w-full items-center p-6 bg-[#f0f2f5]"
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
                    <h2 className="text text-[32px] lg:text-[38px] font-bold leading-tight">Welcome Back</h2>
                    <h3 className="text text-[32px] lg:text-[26px] opacity-90">to</h3>
                    <h1 className="mt-2 text text-[40px] font-extrabold font-['Syne'] leading-none tracking-tight">EnzoSkills</h1>
                </div>

                {/* --- ADDED BOOKS IMAGES HERE --- */}
                {/* Book Image 1 (Top-Left) */}
                <div className="text absolute top-[60%] left-[50%] z-0">
                    <img
                        src="/LoginSignup/books2.jpg"
                        alt="stack of books"
                        className="h-60 w-60 rounded-full object-cover shadow-2xl opacity-80 animate_images"
                    />
                </div>

                {/* Book Image 2 (Bottom-Left) */}
                <div className="text absolute top-[75%] left-[-15%] z-20">
                    <img
                        src="/LoginSignup/books2.jpg"
                        alt="open books spiral"
                        className="h-90 w-90 rounded-full object-cover shadow-2xl"
                    />
                </div>
            </div>

            {/* Login Card Area (35% Width) */}
            <form onSubmit={onSubmit} className="flex animate-card opacity-0 medium-box-shadow flex-col items-center justify-center w-[35%] rounded-[40px] white px-10 lg:px-16 py-10 ">

                <h1 className="animate-inputs mb-6 text-center font-['Syne'] text-5xl font-black text-black tracking-tight">
                    Login
                </h1>

                <div className="w-full space-y-6">
                    <div className="animate-inputs relative">
                        <label className="ml-4 text-[13px] font-medium text-gray-400">
                            Username
                        </label>
                        <input
                            type="text"
                            name="user_name"
                            placeholder="Enter Your Username"
                            className="mt-1 w-full small-box-shadow rounded-full white px-6 py-4 text-[13px] text-gray-700 outline-none placeholder:text-gray-500"
                        />
                    </div>

                    <div className="animate-inputs relative">
                        <label className="ml-4 text-[13px] font-medium text-gray-400">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Your Password"
                            className="mt-1 w-full small-box-shadow rounded-full white px-6 py-4 text-[13px] text-gray-700 outline-none placeholder:text-gray-500"
                        />
                    </div>
                </div>

                <div className="animate-inputs mt-4 flex w-full justify-between px-6 text-[11px] font-semibold text-gray-800 uppercase tracking-tighter">
                    <span className="cursor-pointer hover:underline">Forgot Password?</span>
                    <span onClick={() => navigate("/signup")} className="cursor-pointer hover:underline">New User!</span>
                </div>

                <button
                    type="submit"
                    className="animate-inputs mt-8 w-[50%] flex items-center justify-center cursor-pointer rounded-full purple2 overflow-hidden py-2 text-lg white font-bold text-white small-box-shadow transition-transform hover:scale-105 active:scale-95"
                >
                    Login
                </button>

                <p className="animate-inputs mt-4 text-center text-sm font-medium text-gray-600">
                    Don't have an account? <span onClick={() => navigate("/signup")} className="cursor-pointer font-bold text-[#7568ff] hover:underline">sign up</span>
                </p>

                {/* Social Icons Section */}
                <div className="animate-inputs mt-4 flex items-center justify-center gap-6">
                    {[FaLinkedinIn, FaGoogle, FaGithub].map((Icon, idx) => (
                        <div
                            key={idx}
                            className="flex h-10 w-12 cursor-pointer items-center justify-center rounded-xl bg-[#e0e0e0] text-xl text-black shadow-[0_5px_10px_rgba(0,0,0,0.15)] transition-all hover:-translate-y-1 active:shadow-inner"
                        >
                            <Icon />
                        </div>
                    ))}
                </div>
            </form>
        </div>
    );
}

export default Login;
