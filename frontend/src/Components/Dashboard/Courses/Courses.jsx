import React from 'react'

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
    return (
        <div className="container h-full mx-auto px-4 mt-5">
            <h1 className="text-2xl h-[10%] font-bold">Courses</h1>
            <div className="flex h-[90%] justify-between">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {coursesData.map((course) => (
                        <div className='flex--center h-[80%]' key={course.id}>
                            <div className="white medium-box-shadow h-full rounded-xl p-4">
                                <img src={course.image} alt={course.title} className="w-full h-48 object-cover mb-4" />
                                <h2 className="text-lg font-semibold mb-2">{course.title}</h2>
                                <p className="text-gray-600 mb-2">Duration: {course.duration}</p>
                                <p className="text-gray-600 mb-2">Level: {course.level}</p>
                                <p className="text-gray-600 mb-2">Type: {course.type}</p>
                                <p className="text-gray-600 mb-2">Rating: {course.rating}</p>
                                <p className="text-gray-600 mb-2">Description: {course.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Courses