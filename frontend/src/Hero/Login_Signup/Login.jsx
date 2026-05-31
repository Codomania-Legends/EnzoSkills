import React from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import { FaLinkedinIn, FaGoogle, FaGithub, FaGasPump } from 'react-icons/fa';
import "./LoginSignup.css";
import { handleLogin } from './handleAuthentication';
import { sileo } from 'sileo';

function Login() {
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        const result = await handleLogin(e);
        if (result.success) {
            Cookies.set("username", result.data.user.user_name, { expires: 7 });
            Cookies.set("user_id", result.data.user.user_id, { expires: 7 });
            navigate("/dashboard/home");
        } else {
            sileo.error({ title: 'Login failed', description: 'Invalid credentials' });
        }
    };

    return (
        <div
            className="background-fade-in-element relative flex h-screen w-full items-center p-6 bg-[#f0f2f5] overflow-hidden"
            style={{
                backgroundImage: "url('/LoginSignup/Login.svg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
        >
            {/* Left Content Area (50% Width) */}
            <div className='relative flex flex-col justify-center w-[50%] h-full z-10'>

                {/* Floating "Welcome" Text */}
                <div className="absolute left-[35%] top-[20%] z-20 w-full -translate-x-1/2 text-center text-white px-6">
                    <h2 className="text-[32px] lg:text-[38px] font-bold leading-tight slide-down-entry-element animation-delay-500ms">Welcome Back</h2>
                    <h3 className="text-[32px] lg:text-[26px] opacity-90 slide-down-entry-element animation-delay-600ms">to</h3>
                    <h1 className="mt-2 text-[40px] font-extrabold font-['Syne'] leading-none tracking-tight slide-down-entry-element animation-delay-700ms">EnzoSkills</h1>
                </div>

                {/* Book Image 1 (Top-Left) */}
                <div className="absolute top-[60%] left-[50%] z-0 standard-fade-in-element animation-delay-1000ms">
                    <img
                        src="/LoginSignup/books2.jpg"
                        alt="stack of books"
                        className="animate_images h-60 w-60 rounded-full object-cover shadow-2xl opacity-80"
                    />
                </div>

                {/* Book Image 2 (Bottom-Left) */}
                <div className="absolute top-[75%] left-[-15%] z-20 standard-fade-in-element animation-delay-1000ms">
                    <img
                        src="/LoginSignup/books2.jpg"
                        alt="open books spiral"
                        className=" h-90 w-90 rounded-full object-cover shadow-2xl"
                    />
                </div>
            </div>

            {/* Login Card Area (35% Width) */}
            <form onSubmit={onSubmit} className="flex slide-up-entry-element animation-delay-300ms z-10 white medium-box-shadow flex-col items-center justify-center w-[35%] rounded-[40px] px-10 lg:px-16 py-10">

                <h1 className="slide-down-entry-element animation-delay-500ms mb-6 text-center font-['Syne'] text-5xl font-black text-black tracking-tight">
                    Login
                </h1>

                <div className="w-full space-y-6">
                    <div className="relative slide-up-entry-element animation-delay-600ms">
                        <label className="ml-4 text-[13px] font-medium text-gray-400">
                            Username
                        </label>
                        <input
                            type="text"
                            name="user_name"
                            placeholder="Enter Your Username"
                            className="mt-1 w-full small-box-shadow rounded-full bg-[#e6e9ef] px-6 py-4 text-[13px] text-gray-700 outline-none placeholder:text-gray-500 shadow-[inset_0_4px_6px_rgba(0,0,0,0.1)]"
                        />
                    </div>

                    <div className="relative slide-up-entry-element animation-delay-700ms">
                        <label className="ml-4 text-[13px] font-medium text-gray-400">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Your Password"
                            className="mt-1 w-full small-box-shadow rounded-full bg-[#e6e9ef] px-6 py-4 text-[13px] text-gray-700 outline-none placeholder:text-gray-500 shadow-[inset_0_4px_6px_rgba(0,0,0,0.1)]"
                        />
                    </div>
                </div>

                <div className="slide-up-entry-element animation-delay-800ms mt-4 flex w-full justify-between px-6 text-[11px] font-semibold text-gray-800 uppercase tracking-tighter">
                    <span className="cursor-pointer hover:underline">Forgot Password?</span>
                    <span onClick={() => navigate("/signup")} className="cursor-pointer hover:underline">New User!</span>
                </div>

                <button
                    className="slide-up-entry-element animation-delay-1000ms mt-8 w-[50%] flex items-center justify-center cursor-pointer rounded-full purple2 overflow-hidden py-3 text-lg font-bold text-white small-box-shadow transition-transform hover:scale-105 active:scale-95 bg-purple-600"
                    type="submit"
                >
                    Login
                </button>

                <p className="slide-up-entry-element animation-delay-1000ms mt-4 text-center text-sm font-medium text-gray-600">
                    Don't have an account? <span onClick={() => navigate("/signup")} className="cursor-pointer font-bold text-[#7568ff] hover:underline">sign up</span>
                </p>

                {/* Social Icons Section */}
                <div className="slide-up-entry-element animation-delay-1100ms mt-4 flex items-center justify-center gap-6">
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