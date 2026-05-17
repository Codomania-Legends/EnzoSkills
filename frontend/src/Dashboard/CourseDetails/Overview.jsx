import React, { useEffect } from 'react';
import { useCourse } from '../../Utility/Course';
import { useNavigate, useParams } from 'react-router';

function Overview() {
    const navigate = useNavigate();
    const { currentCourse, courseDetails, setCurrentCourse } = useCourse();
    const { id } = useParams();



    if (!courseDetails) {
        return <div className="text-center mt-10 text-xl font-bold">Loading course list... ⏳</div>;
    }

    if (!currentCourse) {
        return <div className="text-center mt-10 text-xl font-bold">Locating your specific course... 🔍</div>;
    }

    return (
        <div className="container h-full mx-auto px-4 mt-5 flex flex-col items-center">

            <div className="flex justify-start w-[90%] mb-5 cursor-pointer" onClick={() => navigate("/dashboard/courses")}>
                <div className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <img src="/Dashboard/Courses/Back.svg" alt="Back" className="h-4 w-4" />
                    <h1 className="text-2xl font-bold">Courses</h1>
                </div>
            </div>

            <div className="w-[90%] bg-white rounded-3xl p-8 big-box-shadow white hover:scale-100 hover:cursor-pointer flex flex-col lg:flex-row gap-10 slide_right noScale">

                <div className="lg:w-1/4 flex flex-col gap-4">
                    <img
                        src={currentCourse.image}
                        alt={currentCourse.course_name}
                        className="w-full h-auto rounded-2xl object-cover shadow-sm border"
                    />

                    <div className="flex flex-wrap  gap-2 mt-2">
                        {currentCourse.badges?.map((bg_rnd, index) => {
                            const colors = ["yellow", "blue", "green", "red", "purple", "orange", "pink", "gray", "black", "white"];
                            return (
                                <div key={index} className={`${colors[index % 10]} w-fit text-white small-box-shadow text-xs font-bold px-10 py-2 rounded-full shadow-sm`}>
                                    {bg_rnd}
                                </div>
                            );
                        })}
                    </div>

                    {/* 📈 Progress Bar (Conditional Render if Enrolled) */}
                    {currentCourse.isEnrolled && (
                        <div className="w-full mt-10 ">
                            <div className="flex justify-between mb-1">
                                <span className="text-xs font-bold text-gray-700">Course Progress</span>
                                <span className="text-xs font-bold text-blue-600">{currentCourse.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${currentCourse.progress}%` }}></div>
                            </div>
                        </div>
                    )}
                </div>

                {/* 📝 Right Column: Details & Actions */}
                <div className="lg:w-2/3 flex flex-col justify-between">
                    <div>
                        <h2 className="text-3xl font-[Plus_Jakarta_Sans] font-bold mb-3">{currentCourse.course_name}</h2>
                        <p className="mb-6 text-sm md:text-sm leading-relaxed">{currentCourse.longDescription}</p>

                        {/* 📊 Key Information Grid */}
                        <div className="grid grid-cols-2 mt-5 small-box-shadow sm:grid-cols-4 gap-4 mb-6 p-4 rounded-xl">
                            <div className="flex flex-col items-start">
                                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Duration</span>
                                <span className="text-sm font-bold flex items-center gap-1 mt-1">
                                    <img src="/Dashboard/Courses/duration.svg" alt="Duration" className="h-3 w-3" />
                                    {currentCourse.duration}
                                </span>
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Level</span>
                                <span className="text-sm font-bold flex items-center gap-1 mt-1">
                                    <img src="/Dashboard/Courses/level.svg" alt="Level" className="h-3 w-3" />
                                    {currentCourse.level}
                                </span>
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Type</span>
                                <span className="text-sm font-bold flex items-center gap-1 mt-1">
                                    <img src="/Dashboard/Courses/fee.svg" alt="Type" className="h-3 w-3" />
                                    {currentCourse.type}
                                </span>
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Rating</span>
                                <span className="text-sm font-bold flex items-center gap-1 mt-1">
                                    <img src="/Dashboard/Courses/star.svg" alt="Rating" className="h-3 w-3" />
                                    {currentCourse.rating}
                                </span>
                            </div>
                        </div>

                        {/* 🛠️ Skills Section */}
                        <div className="my-10">
                            <h3 className="text-lg font-bold mb-3 text-gray-800">Skills you'll gain:</h3>
                            <div className="flex flex-wrap gap-2">
                                {currentCourse.skills?.map((sk_val, index) => (
                                    <span key={index} className=" text-gray-700 text-xs font-semibold px-4 py-1.5 rounded-lg border border-gray-200">
                                        • {sk_val}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 🎯 Action Buttons */}
                    <div className="flex flex-wrap gap-4 mt-2">
                        {currentCourse.isEnrolled ? (
                            <button
                                onClick={() => navigate(`/dashboard/courses/learning/${currentCourse.id}`)}
                                style={{ backgroundColor: "#7F77FF" }}
                                className="text-sm small-box-shadow blue text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-all transform hover:-translate-y-0.5">
                                Continue Learning 🚀
                            </button>
                        ) : (
                            <button
                                style={{ backgroundColor: "#7F77FF" }}
                                className="text-sm small-box-shadow blue text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-all transform hover:-translate-y-0.5">
                                Enroll Now 🎓
                                <img src="/Dashboard/Courses/enroll.svg" alt="Enroll" className="h-4 w-4" />
                            </button>
                        )}

                        <button className="text-sm border-2 border-[#7F77FF] text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-500 hover:text-black transition-all small-box-shadow red">
                            Download Syllabus 📄
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Overview;