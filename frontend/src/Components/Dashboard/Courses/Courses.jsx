import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react';
import { Fade_in, Slide_left, Slide_right } from '../../../Animations/Basic';

function Courses() {
    const coursesData = [
        {
            id: 1,
            title: "Advanced CSS & Tailwind",
            image: "/Dashboard/Courses/Course_Image.png", // Replace with your actual image path 🖼️
            duration: "3 Months",
            level: "Beginners",
            type: "Unpaid",
            rating: 4.7,
            description: "Transform your raw HTML into stunning, responsive user interfaces. This course covers modern CSS Grid, Flexbox, and utility-first styling with Tailwind CSS. By the end, you will be able to clone any website design and ensure it looks perfect on mobile, tablet, and desktop screens."
        },
        {
            id: 2,
            title: "React.js Front-End Mastery",
            image: "/Dashboard/Courses/Course_Image.png", 
            duration: "6 Months",
            level: "Intermediate",
            type: "Paid",
            rating: 4.9,
            description: "Learn to build dynamic, single-page applications using the world's most popular UI library. We will cover hooks, state management, context API, and React Router. You will build highly interactive interfaces and connect them to external APIs, culminating in a robust e-commerce frontend project."
        },
        {
            id: 3,
            title: "Node.js & Express Backend",
            image: "/Dashboard/Courses/Course_Image.png", 
            duration: "5 Months",
            level: "Intermediate",
            type: "Paid",
            rating: 4.8,
            description: "Step over to the server side and learn how to build scalable APIs and microservices. This course dives into Node runtime, Express.js framework, middleware, and JWT authentication. You will learn how to handle user data securely and architect robust server environments for your web apps."
        },
        {
            id: 4,
            title: "Database Design with MongoDB",
            image: "/Dashboard/Courses/Course_Image.png", 
            duration: "2 Months",
            level: "All Levels",
            type: "Unpaid",
            rating: 4.6,
            description: "Master NoSQL databases with MongoDB. Understand document-based storage, complex queries, aggregation pipelines, and data modeling. We will use Mongoose to interact with our database within a Node environment, giving you the final piece needed for complete MERN stack development."
        }
    ]
    const containerRef = useRef(null);
    useGSAP( () => {
        Slide_right()
        Fade_in()
    } )
    return (
        <div ref={containerRef} className="container h-full mx-auto px-4 mt-5">
            <div className="flex fade_in justify-evenly items-center w-1/10 mb-5">
                <img src="/Dashboard/Courses/Back.svg" alt="Back" className="h-4 w-4" />
                <h1 className="text-2xl h-[10%] font-bold">Courses</h1>
            </div>
            <div className="flex h-[90%] justify-between">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {coursesData.map((course) => (
                        <div className='slide_right flex justify-center h-[90%]' key={course.id}>
                            <div className="white flex flex-col justify-around medium-box-shadow h-full rounded-[2em] p-4 w-full px-6">
                                <div className='flex justify-center'>
                                    <img src={course.image} alt={course.title} className="h-30 object-cover" />
                                </div>
                                <div>

                                    <h3 className="text-md font-semibold mb-2">{course.title}</h3>
                                    <div className='flex items-center justify-between w-[90%]'>
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