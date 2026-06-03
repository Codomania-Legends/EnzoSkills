import React, { useState } from 'react';
import { sileo } from "sileo";
import { useCourse } from '../../../Utility/Course';


const AnimatedSuccessToast = ({ isDark }) => (
    <div className="flex items-center gap-3 bg-[#eafaf4] px-4 py-2 rounded-full mt-1">
        <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2ecc71] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#2ecc71]"></span>
        </span>
        <span className="font-bold text-black animate-pulse">
            Theme Switched to {isDark ? "Dark 🌙" : "Light ☀️"}!
        </span>
    </div>
);

function Learning() {
    const { currentCourse } = useCourse();
    const [theme, setTheme] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [selectedDayIndex, setSelectedDayIndex] = useState(0);

    const handleThemeToggle = async () => {
        setIsButtonDisabled(true);
        const newTheme = !theme;
        setTheme(newTheme);

        const themeChangePromise = new Promise((resolve) => setTimeout(() => resolve(newTheme), 500));
        sileo.promise(themeChangePromise, {
            success: (resolvedTheme) => ({
                title: "Success",
                description: <AnimatedSuccessToast isDark={resolvedTheme} />
            }),
            error: "Error in changing theme"
        });
        await themeChangePromise;
        setIsButtonDisabled(false);
    };

    if (!currentCourse) {
        return <div className="text-center mt-20 text-xl font-bold animate-pulse text-[#7F77FF]">Loading course material... ⏳</div>;
    }

    const materials = currentCourse.daywise_material || [];

    const dummyMaterials = [
        {
            day: 1,
            title: "Introduction to the Core Concepts",
            topics: "Foundations, Architecture, Best Practices",
            material: [
                {
                    heading: "Welcome to Day 1! 🚀",
                    learning_para: "Today we will lay down the foundational knowledge required for this course. Understanding the core architecture is crucial before we dive into writing complex logic. Take your time to absorb these concepts."
                },
                {
                    heading: "Understanding the Architecture",
                    learning_para: "We use a component-based architecture which allows us to build encapsulated elements that manage their own state, then compose them to make complex UIs. This approach makes our codebase scalable and maintainable."
                }
            ]
        },
        {
            day: 2,
            title: "Deep Dive into State Management",
            topics: "Hooks, Context API, Reducers",
            material: [
                {
                    heading: "Managing Application State",
                    learning_para: "State is the heart of any dynamic application. Today, we'll explore how to efficiently manage data that changes over time and how to trigger UI updates seamlessly when that data changes."
                },
                {
                    heading: "Advanced Patterns",
                    learning_para: "Once you master basic state, we will introduce advanced patterns like Context and Reducers to prevent prop-drilling and keep our component tree clean and performant."
                }
            ]
        },
        {
            day: 3,
            title: "Building Real-World Features",
            topics: "API Integration, Routing, Authentication",
            material: [
                {
                    heading: "Connecting to the Backend",
                    learning_para: "Modern applications don't exist in a vacuum. You will learn how to securely connect your frontend to external APIs, handle loading states, and gracefully manage errors."
                }
            ]
        }
    ];

    const displayMaterials = materials.length > 0 ? materials : dummyMaterials;
    const isDummy = materials.length === 0;

    return (
        <div className="container h-full overflow-y-auto mx-auto px-4 mt-5 flex flex-col items-center pb-10">
            <div className='flex justify-between w-[95%] mb-5 items-center'>
                <div className="slide_right">
                    <h1 className="text-3xl font-bold font-[Plus_Jakarta_Sans] flex items-center gap-3">
                        <img src="/Dashboard/Courses/Back.svg" alt="Back" className="h-4 w-4 cursor-pointer" onClick={() => navigate(-1)} />
                        Learning Material
                    </h1>
                    {/* {isDummy && <p className="text-sm text-amber-500 font-bold mt-1">⚠️ Showing Sample Data (No material uploaded yet)</p>} */}
                </div>
                <button
                    disabled={isButtonDisabled}
                    className={`cursor-pointer disabled:opacity-50 px-6 py-2 rounded-xl font-bold transition-all small-box-shadow slide_left ${theme ? 'bg-gray-800 text-white hover:bg-gray-700' : 'white text-black hover:bg-gray-50'}`}
                    onClick={handleThemeToggle}
                >
                    {theme ? "🌙 Dark Mode" : "☀️ Light Mode"}
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 w-[95%]">
                {/* Left Sidebar: Days List */}
                <div className="lg:w-1/4 flex flex-col gap-4">
                    {displayMaterials.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedDayIndex(index)}
                            className={`cursor-pointer p-5 rounded-2xl transition-all transform hover:-translate-y-1 ${selectedDayIndex === index ? (theme ? 'blue text-white small-box-shadow' : 'black text-white small-box-shadow-black') : (theme ? 'bg-gray-900 text-gray-300 medium-box-shadow-black' : 'white text-gray-700  -gray-100 hover:-gray-300 medium-box-shadow')} slide_right`}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-xl font-bold text-lg transition-all ${selectedDayIndex === index ? 'white shadow-inner' : (theme ? 'purple' : 'blue')}`}>
                                    {item.day || index + 1}
                                </div>
                                <div className="overflow-hidden">
                                    <h3 className="font-bold text-lg whitespace-nowrap overflow-hidden text-ellipsis">Day {item.day || index + 1}</h3>
                                    <p className="text-xs opacity-80 whitespace-nowrap overflow-hidden text-ellipsis">{item.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Content Area */}
                <div className={`lg:w-3/4 p-8 md:p-10 rounded-3xl transition-all slide_up ${theme ? 'bg-gray-900 text-white medium-box-shadow-black' : 'white text-black medium-box-shadow'}`}>
                    {displayMaterials[selectedDayIndex] && (
                        <div className="fade-in" key={selectedDayIndex}>
                            <div className="mb-10 -b pb-8" style={{ Color: theme ? '#374151' : '#f3f4f6' }}>
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-[#7F77FF]/10 text-[#7F77FF]">Day {displayMaterials[selectedDayIndex].day || selectedDayIndex + 1}</span>
                                </div>
                                <h2 className="text-4xl font-bold mb-4 font-[Plus_Jakarta_Sans] leading-tight">{displayMaterials[selectedDayIndex].title}</h2>
                                <div className="flex items-center gap-3 flex-wrap">
                                    <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${theme ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>Topics Covered:</span>
                                    <p className="text-sm font-medium opacity-80">{displayMaterials[selectedDayIndex].topics}</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-8">
                                {displayMaterials[selectedDayIndex].material && displayMaterials[selectedDayIndex].material.map((mat, i) => (
                                    <div key={i} className={`p-8 rounded-3xl ${theme ? 'bg-gray-800' : 'bg-gray-200'} transition-all hover:shadow-md slide_up`} style={{ animationDelay: `${(i + 1) * 150}ms` }}>
                                        <h3 className="text-2xl font-bold mb-4 text-[#7F77FF]">{mat.heading}</h3>
                                        <p className="text-base md:text-lg leading-relaxed opacity-90 whitespace-pre-line font-medium">
                                            {mat.learning_para}
                                        </p>
                                    </div>
                                ))}
                                {(!displayMaterials[selectedDayIndex].material || displayMaterials[selectedDayIndex].material.length === 0) && (
                                    <div className="p-10 text-center opacity-60 bg-gray-100 rounded-3xl dark:bg-gray-800 -dashed -2 -gray-300 dark:-gray-600 fade-in">
                                        <p className="italic text-lg">No specific reading material added for this day.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Learning;