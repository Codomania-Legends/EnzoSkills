import React, { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';
import { Fade_in, Slide_left, Slide_right } from '../../Utility/Animations/Basic';
import CourseDetails from './CourseDetails';
import gsap from 'gsap';
import axios from 'axios';
function Courses() {    
    const coursesData = [
        {
            id: 1,
            course_name: "Advanced CSS & Tailwind",
            image: "/Dashboard/Courses/Course_Image.png",
            duration: "3 Months",
            level: "Beginners",
            type: "Unpaid",
            rating: 4.7,
            badges: ["Trending", "Top Rated", "Free"], // 🏷️ Multiple badges
            isEnrolled: true, 
            progress: 65, // 📊 Completion percentage
            skills: ["Responsive Design", "Tailwind CSS", "CSS Grid & Flexbox", "Mobile-First Workflow"],
            description: "Transform your raw HTML into stunning, responsive user interfaces. This course covers modern CSS Grid, Flexbox, and utility-first styling with Tailwind CSS."
        },
        {
            id: 2,
            course_name: "React.js Front-End Mastery",
            image: "/Dashboard/Courses/Course_Image.png", 
            duration: "6 Months",
            level: "Intermediate",
            type: "Paid",
            rating: 4.9,
            badges: ["Most Popular", "Bestseller", "Certificate"], // ⭐ High-value badges
            isEnrolled: false,
            progress: 0,
            skills: ["React Hooks", "State Management", "API Integration", "React Router"],
            description: "Learn to build dynamic, single-page applications using the world's most popular UI library. Includes Redux and Context API."
        },
        {
            id: 3,
            course_name: "Node.js & Express Backend",
            image: "/Dashboard/Courses/Course_Image.png", 
            duration: "5 Months",
            level: "Intermediate",
            type: "Paid",
            rating: 4.8,
            badges: ["Recommended", "Update Available"], // 👍 Direct user guidance
            isEnrolled: false,
            progress: 0,
            skills: ["RESTful APIs", "JWT Authentication", "Middleware", "Express.js"],
            description: "Step over to the server side and learn how to build scalable APIs and microservices using Node runtime."
        },
        {
            id: 4,
            course_name: "Database Design with MongoDB",
            image: "/Dashboard/Courses/Course_Image.png", 
            duration: "2 Months",
            level: "All Levels",
            type: "Unpaid",
            rating: 4.6,
            badges: ["New", "Beginner Friendly"], // ✨ Fresh content markers
            isEnrolled: true,
            progress: 100, // ✅ Completed course
            skills: ["NoSQL Modeling", "Mongoose ODM", "Aggregation Pipelines", "Database Security"],
            description: "Master NoSQL databases with MongoDB. Understand document-based storage and complex queries."
        }
    ];

    const [showDetails, setShowDetails] = useState([false , {}]);

    const [courses, setCourses] = useState([]);
    useEffect(() => {
        const getAllCourses = async () => {
            try {
                const res = await axios.get("http://localhost:3000/courses/get");
                console.log(res.data.course)
                setCourses(res.data.course);
            } catch (error) {
                console.log(error)
                setCourses(coursesData);
                throw(error.message)
            }
        }
        getAllCourses();
    }, []);

    const containerRef = useRef(null);
    useGSAP(() => {
    // This will now trigger every time 'courses' is updated
    // if (courses.length > 0) {
    //     gsap.from(".slide_right", {
    //         opacity: 0,
    //         y: 30, // Subtle slide up looks great with fade
    //         duration: 1,
    //         stagger: 0.2,
    //         ease: "power2.out"
    //     });
    // }

    // gsap.from(".fade_in", {
    //     opacity: 0,
    //     duration: 1,
    //     stagger: 0.2,
    //     ease: "power2.out"
    // });
}, { scope: containerRef, dependencies: [courses] });
    return (
        <div ref={containerRef} className="container h-full mx-auto px-4 mt-5">
            <div className="flex fade_in justify-evenly items-center w-1/10 mb-5">
                <img src="/Dashboard/Courses/Back.svg" alt="Back" className="h-4 w-4" />
                <h1 className="text-2xl h-[10%] font-bold">Courses</h1>
            </div>
            <div className="flex h-[80%] justify-between relative items-center">
                {showDetails[0] && <CourseDetails course={showDetails[1]} setShowDetails={setShowDetails} />}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 h-full">
                    {Array.isArray(courses) && courses.map((course) => (
                        <div onClick={() => setShowDetails([true, course])} className='slide_right flex justify-center h-[90%] items-center' key={course.course_id}>
                            <div className="white flex flex-col justify-around medium-box-shadow h-full rounded-[2em] p-4 w-full px-6">
                                <div className='flex justify-center'>
                                    <img src={course.image} alt={course.course_name} className="h-30 object-cover" />
                                </div>
                                <div className='flex justify-evenly flex-col items-start h-[50%]'>

                                    <h3 className="text-md font-semibold mb-2">{course.course_name}</h3>
                                    <div className='flex items-center justify-between w-[90%]'>
                                        <p className="text-black mb-2 gap-1 text-xs flex items-center justify-evenly font-semibold">
                                            <img src="/Dashboard/Courses/duration.svg" alt="Duration" className="h-2 w-2" />
                                            {course.duration}
                                        </p>
                                        <p className="text-black mb-2 gap-1 text-xs flex items-center justify-evenly font-semibold">
                                            <img src="/Dashboard/Courses/level.svg" alt="Level" className="h-2 w-2" />
                                            {course.level}
                                        </p>
                                        {/* <p className="text-black mb-2 gap-1 text-xs flex items-center justify-evenly font-semibold">
                                            <img src="/Dashboard/Courses/fee.svg" alt="Type" className="h-2 w-2" />
                                            {course.price}
                                        </p> */}
                                        <p className="text-black mb-2 gap-1 text-xs flex items-center justify-evenly font-semibold">
                                            <img src="/Dashboard/Courses/fee.svg" alt="Type" className="h-2 w-2" />
                                            {course.type}
                                    </p>
                                    </div>
                                    <p className="flex items-center gap-1 text-black mb-2 text-xs">
                                        {Array.from({ length: parseInt(course.rating) }, (_, i) => (
                                            <img key={i} src="/Dashboard/Courses/star.svg" alt="Rating" className="h-3 w-3" />
                                        ))}
                                        {course.rating}
                                    </p>
                                    <p className="text-black my-4 text-xs">{course.description}</p>
                                </div>
                                <div className='flex justify-evenly w-full align-bottom'>
                                    <button style={{backgroundColor: "#7F77FF"}} className="text-xs small-box-shadow blue text-white px-6 py-2 rounded-xl justify-between flex items-center gap-2">
                                        Enroll
                                        <img src="/Dashboard/Courses/enroll.svg" alt="Enroll" className="h-3 w-3" />
                                    </button>
                                    <button style={{backgroundColor: "#7F77FF"}} className="text-xs small-box-shadow blue text-white px-6 py-2 rounded-xl">View Details</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Courses