import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router';

function CourseProgress({ Courses, User }) {
    const container = useRef();
    const [extraDetails, setExtraDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let courseList = [];

        if (Array.isArray(Courses)) {
            courseList = Courses;
        } else if (Courses && typeof Courses === 'object') {
            courseList = [Courses];
        }

        const userCourses = User?.courses || [];

        if (courseList.length > 0) {
            const mergedCourses = courseList.map(course => {
                const cId = course.course_id || course.id;
                const userProgress = userCourses.find(uc => String(uc.course_id) === String(cId)) || {};
                return {
                    ...course,
                    ...userProgress,
                    course_id: cId
                };
            });
            setExtraDetails(mergedCourses);
        } else if (userCourses.length > 0) {
            setExtraDetails(userCourses);
        } else {
            setExtraDetails([]);
        }

        setIsLoading(false);
    }, [User, Courses]);

    return (
        <>
            <h2 className='font-["Plus_Jakarta_Sans"] text-base font-semibold mb-4 text-center md:text-left'>
                Course Progress
            </h2>
            <div ref={container} className='fade_in grid gap-y-6 px-2 md:px-8'>
                {isLoading ? (
                    <div style={{ "--boxColor": "#ffffff50" }} className='relative w-full animate-pulse rounded-2xl p-4 gap-4 small-box-shadow'>
                        <p className='animate-pulse text-center w-full font-bold text-xs md:text-sm'>Loading Courses...</p>
                    </div>
                ) : extraDetails.length > 0 ? (
                    extraDetails.map((course, index) => {
                        const courseId = course.course_id || course.id || index;
                        const courseTitle = course.course_name || course.name || 'Untitled Course';
                        const progress = course.progress_percentage ?? course.progress ?? 0;
                        const weeks = course.week_completed ?? 0;
                        const assessmentsCount = Array.isArray(course.assessments)
                            ? `${course.assessments[0]} / ${course.assessments[1]}`
                            : (course.topics_completed ?? 0);

                        return (
                            <Link
                                to={`/dashboard/courses/overview/${courseId}`}
                                className='fade_in w-full flex flex-col lg:flex-row justify-between items-center rounded-2xl p-4 gap-4 relative white small-box-shadow'
                                key={courseId}
                            >
                                <img
                                    src={course.image || "/Dashboard/Courses/Course_Image.png"}
                                    alt={courseTitle}
                                    className="fade_in h-16 md:w-20 lg:w-auto object-contain"
                                />

                                <div className='fade_in h-full w-full lg:w-[70%] flex flex-col justify-between items-center lg:items-start gap-4 lg:gap-0'>
                                    <h3 className='fade_in font-bold font-["Plus_Jakarta_Sans"] text-center lg:text-left'>
                                        {course.course_name}
                                    </h3>

                                    {/* Stats container wrapped for mobile */}
                                    <div className="fade_in flex flex-wrap lg:flex-nowrap justify-evenly lg:justify-between items-center w-full gap-y-4 mt-2 lg:mt-0">

                                        <div className='relative flex justify-center items-center flex-col w-[30%] lg:w-auto'>
                                            <p className='fade_in font-bold text-xs md:text-sm'>{progress}%</p>
                                            <span className='fade_in text-[8px] md:text-xxs text-center'>Overall Progress</span>
                                            <div className="h-[0.5em] w-full lg:w-[60%] absolute top-[30%] lg:top-[30%] bg-[#27C84050]" />
                                        </div>

                                        <div className='relative flex justify-center items-center flex-col w-[30%] lg:w-auto'>
                                            <p className='fade_in font-bold text-xs md:text-sm'>{weeks}</p>
                                            <span className='fade_in text-[8px] md:text-xxs text-center'>Weeks</span>
                                            <div className="h-[0.5em] w-full lg:w-[60%] absolute top-[30%] lg:top-[30%] bg-[#6073FF50]" />
                                        </div>

                                        <div className='fade_in relative flex justify-center items-center flex-col w-[30%] lg:w-auto'>
                                            <p className='fade_in font-bold text-xs md:text-sm'>{assessmentsCount}</p>
                                            <span className='fade_in text-[8px] md:text-xxs text-center'>Topics / Assessments</span>
                                            <div className="h-[0.5em] w-full lg:w-[60%] absolute top-[30%] lg:top-[30%] bg-[#FF383C50]" />
                                        </div>

                                        {/* Side options */}
                                        <div className="absolute top-2 right-2 lg:top-[10%] lg:right-[2%] flex justify-end items-center gap-2 w-auto lg:w-[10%]">
                                            <img src="/Dashboard/Courses/info.svg" alt="Info" className="w-4 h-4 lg:w-auto cursor-pointer" />
                                            <img src="/Dashboard/Courses/menu.svg" alt="Menu" className="w-3 h-3 lg:w-auto cursor-pointer" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                ) : (
                    <div style={{ "--boxColor": "#ffffff50" }} className='relative w-full rounded-2xl p-6 text-center small-box-shadow white'>
                        <p className='font-bold text-xs md:text-sm text-gray-500'>No enrolled courses yet.</p>
                        <Link to="/dashboard/courses" className="inline-block mt-2 text-xs font-semibold text-indigo-600 hover:underline">
                            Browse Courses →
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}

export default CourseProgress;