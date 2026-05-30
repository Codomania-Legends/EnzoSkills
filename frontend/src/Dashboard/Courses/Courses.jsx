import { useRef } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { sileo } from 'sileo';
import { useCourse } from '../../Utility/Course';
import { useUser } from '../../Utility/UserDetails';

function Courses() {
    const { setCurrentCourse, courseDetails } = useCourse();
    const { userDetails, setUserDetails } = useUser();
    const navigate = useNavigate();
    const courseContainerRef = useRef(null);

    const enrollInCourse = async (courseId) => {
        try {
            // Note: In production, replace the hardcoded localhost string with an environment variable!
            const response = await axios.patch("http://localhost:3000/courses/enroll", {
                course_id: courseId,
                user_id: userDetails.user_id
            });
            sileo.success({ title: "Enrollment Successful", description: response.data.msg });
            setUserDetails((prev) => ({ ...prev, courses: [...prev.courses, { course_id: courseId }] }));
            return response.data;
        } catch (error) {
            // Extract the specific backend message (e.g., "User is already enrolled"), or default to standard error
            const errorMessage = error.response?.data?.msg || error.message;
            sileo.error({ title: "Enrollment Failed", description: errorMessage });
        }
    };

    const loadStaticCourses = async () => {
        const staticCourseList = [
            {
                course_name: "Advanced CSS & Tailwind",
                image: "https://res.cloudinary.com/ddwk0yg4r/image/upload/v1714902802/samples/landscapes/nature-mountains.jpg",
                duration: "3 Months",
                level: "Beginners",
                type: "Unpaid",
                rating: 4.7,
                badges: ["Trending", "Top Rated", "Free"],
                skills: ["Responsive Design", "Tailwind CSS", "CSS Grid & Flexbox"],
                features: ["30 hours video", "Certificate"],
                description: "Transform your raw HTML into stunning, responsive user interfaces."
            },
            {
                course_name: "React.js Front-End Mastery",
                image: "https://res.cloudinary.com/ddwk0yg4r/image/upload/v1714902803/samples/landscapes/beach-boat.jpg",
                duration: "6 Months",
                level: "Intermediate",
                type: "Paid",
                rating: 4.9,
                badges: ["Most Popular", "Bestseller"],
                skills: ["React Hooks", "State Management", "API Integration"],
                features: ["60 hours video", "15 projects"],
                description: "Learn to build dynamic, single-page applications using React."
            }
        ];

        try {
            // Promise.all runs these simultaneously for better performance!
            const createCoursePromises = staticCourseList.map(course =>
                axios.post("http://localhost:3000/courses/create", course)
            );
            await Promise.all(createCoursePromises);
            window.location.reload();
        } catch (error) {
            console.error("Static load error:", error);
            sileo.error("Failed to load static courses");
        }
    };

    return (
        <div ref={courseContainerRef} className="container w-full sm:overflow-scroll md:overflow-visible h-full md:h-full mx-auto px-4 mt-5">
            <div className="flex justify-between items-center w-full mb-5 pr-4">
                <div className="flex items-center gap-4">
                    <img src="/Dashboard/Courses/Back.svg" alt="Back" className="h-4 w-4 cursor-pointer" onClick={() => navigate(-1)} />
                    <h1 className="text-2xl font-bold courses-page-title">Courses</h1>
                </div>
                <div className="flex gap-4">
                    {Array.isArray(courseDetails) && courseDetails.length === 0 &&
                        <button
                            onClick={loadStaticCourses}
                            className="px-4 py-2 rounded-xl text-sm font-bold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-all small-box-shadow">
                            Load Static Data 🧪
                        </button>
                    }
                    <button
                        onClick={() => navigate("/addcourses")}
                        className="px-6 py-2 rounded-xl text-sm font-bold text-white small-box-shadow purple">
                        + Create Course
                    </button>
                </div>
            </div>

            <div className="flex h-[80%] justify-between relative items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 h-full">
                    {Array.isArray(courseDetails) && courseDetails.map((course) => {

                        // 1. Properly checking inside the array of objects! 🔍
                        const currentCourseId = course.course_id || course.id;
                        const isEnrolled = userDetails.courses?.some(
                            (c) => c.course_id === currentCourseId
                        );

                        console.log(course.course_name, currentCourseId, isEnrolled)

                        return (
                            <div onClick={() => setCurrentCourse(currentCourseId)} className='fade_in -y-10 slide_right flex justify-center h-full md:h-[90%] items-center' key={currentCourseId}>
                                <div className="white flex flex-col justify-around medium-box-shadow h-full rounded-[2em] p-4 w-full px-6">
                                    <div className='flex justify-center'>
                                        <img src={course.image} alt={course.course_name} className="h-25 md:h-30 object-cover" />
                                    </div>
                                    <div className='flex justify-evenly flex-col items-start h-[50%]'>
                                        <h3 className="text-sm md:text-md font-semibold mt-2 md:mt-0 mb-2">{course.course_name}</h3>
                                        <div className='flex items-center justify-between w-full md:w-[90%]'>
                                            <p className="text-black mb-2 gap-1 text-xs flex items-center justify-evenly font-semibold">
                                                <img src="/Dashboard/Courses/duration.svg" alt="Duration" className="h-2 w-2" />
                                                {course.duration}
                                            </p>
                                            <p className="text-black mb-2 gap-1 text-xs flex items-center justify-evenly font-semibold">
                                                <img src="/Dashboard/Courses/level.svg" alt="Level" className="h-2 w-2" />
                                                {course.level}
                                            </p>
                                            <p className="text-black mb-2 gap-1 text-xs flex items-center justify-evenly font-semibold">
                                                <img src="/Dashboard/Courses/fee.svg" alt="Type" className="h-2 w-2" />
                                                {course.type}
                                            </p>
                                        </div>
                                        <p className="flex items-center gap-1 text-black mb-2 text-xs">
                                            {Array.from({ length: parseInt(course.rating || 0) }, (_, i) =>
                                                <img key={i} src="/Dashboard/Courses/star.svg" alt="Rating" className="h-3 w-3" />
                                            )}
                                            {course.rating}
                                        </p>
                                        <p className="text-black my-2 md:my-4 text-xs">{course.description}</p>
                                    </div>
                                    <div className='flex justify-evenly w-full align-bottom'>
                                        <button
                                            style={{ backgroundColor: isEnrolled ? "black" : "#7F77FF" }}
                                            className={`text-xs small-box-shadow text-white px-4 md:px-6 md:py-2 rounded-xl justify-between flex items-center gap-2 `}
                                            onClick={(e) => {
                                                e.stopPropagation(); // 3. Stops parent div click! 🛑
                                                if (!isEnrolled) {
                                                    enrollInCourse(currentCourseId);
                                                }
                                            }}
                                            disabled={isEnrolled}
                                        >
                                            {isEnrolled ? "Enrolled" : "Enroll"}
                                            <img src="/Dashboard/Courses/enroll.svg" alt="Enroll" className="h-3 w-3" />
                                        </button>
                                        <button style={{ backgroundColor: "#7F77FF" }} className="text-xs cursor-pointer small-box-shadow blue text-white px-4 md:px-6 py-2 md:py-2 rounded-xl">View Details</button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div >
    );
}

export default Courses;