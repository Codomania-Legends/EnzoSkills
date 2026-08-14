import React, { useEffect, useState } from 'react';
import { useCourse } from '../../Utility/Course';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import Cookies from 'js-cookie';
import { sileo } from 'sileo';
import { useUser } from '../../Utility/UserDetails';

function Overview() {
    const navigate = useNavigate();
    const { currentCourse, courseDetails, myCourses } = useCourse();
    const { userDetails, setUserDetails } = useUser();

    const [thisCourse, setThisCourse] = useState(null);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const userId = Cookies.get("user_id");

    const colors = [
        { bg: "yellow", text: "black" },
        { bg: "blue", text: "white" },
        { bg: "green", text: "white" },
        { bg: "red", text: "white" },
        { bg: "purple", text: "white" },
        { bg: "orange", text: "white" },
        { bg: "pink", text: "white" },
        { bg: "gray", text: "white" },
        { bg: "black", text: "white" },
        { bg: "white", text: "black" }
    ];

    useEffect(() => {
        if (courseDetails && typeof currentCourse === "string") {
            const course = courseDetails.find((course) => course.course_id === currentCourse);
            if( !course ){
                // setThisCourse
            }
            setThisCourse(course);
        } else {
            setThisCourse(currentCourse)
        }
        // thisCourse.user_enrolled.some(user => user.user_id == userId ? setIsEnrolled(true) : setIsEnrolled(false))
    }, [courseDetails, currentCourse]);

    useEffect(() => {
        if (thisCourse) {
            const courseId = thisCourse.course_id || thisCourse.id;
            const enrolled = userDetails?.courses?.some(c => String(c.course_id) === String(courseId));
            
            if (enrolled) {
                setIsEnrolled(true);
            } else if (thisCourse.isEnrolled) {
                setIsEnrolled(true);
            } else {
                setIsEnrolled(false);
            }
        }
    }, [thisCourse, userDetails]);

    const handleEnroll = async () => {
        if (!userId) {
            sileo.error("User not found. Please log in.");
            return;
        }

        const enrollCall = async () => {
            const res = await axios.patch("http://localhost:3000/courses/enroll", {
                user_id: userId,
                course_id: thisCourse.course_id || thisCourse.id
            });
            return res.data;
        };

        sileo.promise(enrollCall, {
            success: "Enrolled Successfully!",
            error: "Failed to enroll. You might already be enrolled.",
            loading: "Enrolling..."
        }).then(() => {
            setIsEnrolled(true);
            setUserDetails((prev) => (
                {
                    ...prev, courses: [...(prev.courses || []), {
                        course_id: thisCourse.course_id || thisCourse.id,
                        progress_status: "In Progress",
                        week_completed: 0,
                        topics_completed: 0,
                        subtopics_completed: 0,
                        progress_percentage: 0
                    }]
                }
            ));
        }).catch((err) => {
            console.error(err);
        });
    };


    if (!courseDetails) {
        return <div className="text-center mt-10 text-xl font-bold">Loading course list... ⏳</div>;
    }

    if (!currentCourse) {
        return <div className="text-center mt-10 text-xl font-bold">Locating your specific course... 🔍</div>;
    }

    return (
        thisCourse &&
        <div className="container h-full mx-auto px-4 mt-5 flex flex-col items-center">

            <div className="flex justify-start w-[90%] mb-5 cursor-pointer" onClick={() => navigate("/dashboard/courses")}>
                <div className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <img src="/Dashboard/Courses/Back.svg" alt="Back" className="h-4 w-4" />
                    <h1 className="text-2xl font-bold overview-page-title">Courses</h1>
                </div>
            </div>

            <div className="w-[90%] bg-white rounded-3xl p-8 big-box-shadow white hover:scale-100 hover:cursor-pointer flex flex-col lg:flex-row gap-10 slide_right noScale">

                <div className="lg:w-1/4 flex flex-col gap-4">
                    <img
                        src={thisCourse?.image}
                        alt={thisCourse?.course_name}
                        className="w-full h-auto rounded-2xl object-cover shadow-sm border" />

                    <div className="flex flex-wrap  gap-2 mt-2">
                        {(Array.isArray(thisCourse?.badges) ? thisCourse?.badges : typeof thisCourse?.badges === 'string' ? thisCourse?.badges.split(',') : [])?.map((bg_rnd, index) => {

                            return (
                                <div key={index} className={`${colors[index % 10]} w-fit text-white small-box-shadow text-xs font-bold px-10 py-2 rounded-full shadow-sm`}>
                                    {bg_rnd.trim && bg_rnd.trim() || bg_rnd}
                                </div>);

                        })}
                    </div>

                    <div className='flex flex-wrap justify-between'>
                        {thisCourse?.features?.map((f, index) => (
                            <div className='flex gap-2 items-center'>
                                <span
                                    style={{ color: colors[index % 10].text }}
                                    className={`p-2 ${colors[index % 10].bg} small-box-shadow rounded-lg text-xs my-2 px-2`}>
                                    {f}
                                </span>
                            </div>
                        ))}
                    </div>

                </div>

                {/* 📝 Right Column: Details & Actions */}
                <div className="lg:w-2/3 flex flex-col justify-between">
                    <div>
                        <h2 className="text-3xl font-[Plus_Jakarta_Sans] font-bold mb-3">{thisCourse?.course_name}</h2>
                        <p className="mb-6 text-sm md:text-sm leading-relaxed">{thisCourse?.longDescription || thisCourse?.description}</p>

                        {/* 📊 Key Information Grid */}
                        <div className="grid grid-cols-2 mt-5 small-box-shadow sm:grid-cols-4 gap-4 mb-6 p-4 rounded-xl">
                            <div className="flex flex-col items-start">
                                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Duration</span>
                                <span className="text-sm font-bold flex items-center gap-1 mt-1">
                                    <img src="/Dashboard/Courses/duration.svg" alt="Duration" className="h-3 w-3" />
                                    {thisCourse?.duration}
                                </span>
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Level</span>
                                <span className="text-sm font-bold flex items-center gap-1 mt-1">
                                    <img src="/Dashboard/Courses/level.svg" alt="Level" className="h-3 w-3" />
                                    {thisCourse?.level}
                                </span>
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Type</span>
                                <span className="text-sm font-bold flex items-center gap-1 mt-1">
                                    <img src="/Dashboard/Courses/fee.svg" alt="Type" className="h-3 w-3" />
                                    {thisCourse?.type}
                                </span>
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Rating</span>
                                <span className="text-sm font-bold flex items-center gap-1 mt-1">
                                    <img src="/Dashboard/Courses/star.svg" alt="Rating" className="h-3 w-3" />
                                    {thisCourse?.rating}
                                </span>
                            </div>
                        </div>

                        {/* 🛠️ Skills Section */}
                        <div className="my-10">
                            <h3 className="text-lg font-bold mb-3 text-gray-800">Skills you'll gain:</h3>
                            <div className="flex flex-wrap gap-2">
                                {(Array.isArray(thisCourse?.skills) ? thisCourse?.skills : typeof thisCourse?.skills === 'string' ? thisCourse?.skills.split(',') : [])?.map((sk_val, index) =>
                                    <span key={index} className=" text-gray-700 text-xs font-semibold px-4 py-1.5 rounded-lg border border-gray-200">
                                        • {sk_val.trim && sk_val.trim() || sk_val}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 🎯 Action Buttons */}
                    <div className="flex flex-wrap gap-4 mt-2">
                        {isEnrolled ?
                            <button
                                onClick={() => navigate(`/dashboard/courses/learning/${thisCourse?.course_id || thisCourse?.id}`)}
                                style={{ backgroundColor: "#7F77FF" }}
                                className="cursor-pointer text-sm small-box-shadow blue text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-all transform hover:-translate-y-0.5">
                                Continue Learning 🚀
                            </button> :

                            <button
                                onClick={handleEnroll}
                                style={{ backgroundColor: "#7F77FF" }}
                                className="cursor-pointer text-sm small-box-shadow blue text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-all transform hover:-translate-y-0.5">
                                {isEnrolled ? "Continue Learning" : "Enroll Now"} 🎓
                                <img src="/Dashboard/Courses/enroll.svg" alt="Enroll" className="h-4 w-4" />
                            </button>
                        }

                        <button onClick={() => {
                            const link = document.createElement('a');
                            link.href = '/React_Syllabus.pdf';
                            link.download = `${thisCourse?.course_name}_Syllabus.pdf`;
                            link.click();
                        }}
                            className="cursor-pointer text-sm border-2 border-[#7F77FF] text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-500 hover:text-black transition-all small-box-shadow red">
                            Download Syllabus 📄
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Overview;