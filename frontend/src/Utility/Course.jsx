import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";

export const courseContext = createContext();

export function CourseProvider({ children, id }) {
    const [courseDetails, setCourseDetails] = useState(null);
    const [currentCourse, setCurrentCourse] = useState(null);

    const coursesData = [
        {
            id: 1,
            course_name: "Advanced CSS & Tailwind",
            image: "/Dashboard/Courses/Course_Image.png",
            duration: "3 Months",
            level: "Beginners",
            type: "Unpaid",
            rating: 4.7,
            badges: ["Trending", "Top Rated", "Free"],
            isEnrolled: true,
            progress: 65,
            skills: ["Responsive Design", "Tailwind CSS", "CSS Grid & Flexbox", "Mobile-First Workflow"],
            description: "Transform your raw HTML into stunning, responsive user interfaces.",
            longDescription: "Dive deep into modern web design with this comprehensive styling course. You will move beyond basic properties to master CSS Grid, Flexbox, and complex animations. Furthermore, learn how to leverage the utility-first Tailwind CSS framework to rapidly build custom, responsive interfaces without leaving your HTML. By the end of this journey, you will be able to construct production-ready layouts that look perfect on any device.",
            thisCourseIncludes: [
                "30 hours of on-demand video",
                "50 interactive coding exercises",
                "Downloadable design assets",
                "Access on mobile and TV",
                "Certificate of completion"
            ]
        },
        {
            id: 2,
            course_name: "React.js Front-End Mastery",
            image: "/Dashboard/Courses/Course_Image.png",
            duration: "6 Months",
            level: "Intermediate",
            type: "Paid",
            rating: 4.9,
            badges: ["Most Popular", "Bestseller", "Certificate"],
            isEnrolled: false,
            progress: 0,
            skills: ["React Hooks", "State Management", "API Integration", "React Router"],
            description: "Learn to build dynamic, single-page applications using the world's most popular UI library.",
            longDescription: "This intensive React.js mastery course takes you from fundamental concepts to advanced frontend architecture. Understand the virtual DOM, master component lifecycles, and utilize modern React Hooks. You will build multiple real-world projects, integrating external APIs and managing complex application state with modern tools. Perfect for developers looking to land senior front-end engineering roles.",
            thisCourseIncludes: [
                "60 hours of on-demand video",
                "15 real-world portfolio projects",
                "React snippets cheat sheet",
                "Full lifetime access",
                "Certificate of completion"
            ]
        },
        {
            id: 3,
            course_name: "Node.js & Express Backend",
            image: "/Dashboard/Courses/Course_Image.png",
            duration: "5 Months",
            level: "Intermediate",
            type: "Paid",
            rating: 4.8,
            badges: ["Recommended", "Update Available"],
            isEnrolled: false,
            progress: 0,
            skills: ["RESTful APIs", "JWT Authentication", "Middleware", "Express.js"],
            description: "Step over to the server side and learn how to build scalable APIs.",
            longDescription: "Unlock the full power of server-side JavaScript. This course provides a hands-on approach to building fast, highly scalable network applications using Node.js and Express. You will learn the intricacies of the event loop, asynchronous programming, and stream processing. Implement secure RESTful APIs, handle complex file uploads, and manage secure user authentication using JSON Web Tokens (JWT).",
            thisCourseIncludes: [
                "45 hours of on-demand video",
                "REST API project portfolio",
                "Source code for all backend services",
                "Access to private developer community",
                "Certificate of completion"
            ]
        },
        {
            id: 4,
            course_name: "Database Design with MongoDB",
            image: "/Dashboard/Courses/Course_Image.png",
            duration: "2 Months",
            level: "All Levels",
            type: "Unpaid",
            rating: 4.6,
            badges: ["New", "Beginner Friendly"],
            isEnrolled: true,
            progress: 100,
            skills: ["NoSQL Modeling", "Mongoose ODM", "Aggregation Pipelines", "Database Security"],
            description: "Master NoSQL databases with MongoDB.",
            longDescription: "Discover the incredible flexibility and performance of NoSQL databases with MongoDB. This course covers everything from basic CRUD operations to highly advanced aggregation pipelines. Learn how to design effective, scalable data models, ensure strict database security, and interact seamlessly with your database using the Mongoose Object Data Modeling (ODM) library in a Node.js environment.",
            thisCourseIncludes: [
                "20 hours of on-demand video",
                "Database design pattern templates",
                "Weekly quizzes and assessments",
                "Access on mobile and TV",
                "Certificate of completion"
            ]
        }
    ];

    const location = useLocation();
    
    // Extract ID from URL if we are on a detail page
    const match = location.pathname.match(/\/dashboard\/courses\/(?:overview|learning|assessment|roadmap|doubts)\/([^/]+)/);
    const idFromUrl = match ? match[1] : null;
    const activeId = id || idFromUrl;

    useEffect(() => {
        const fetchAllCourses = async () => {
            try {
                const allResults = await axios.get("http://localhost:3000/courses/get");
                setCourseDetails(allResults.data.course);
            } catch (error) {
                console.log("Error fetching all courses:", error.message);
                setCourseDetails(coursesData);
            }
        };
        fetchAllCourses();
    }, []);

    useEffect(() => {
        if (activeId && courseDetails) {
            const matchedCourse = courseDetails.find(c => String(c.id) === String(activeId));
            if (matchedCourse) {
                setCurrentCourse(matchedCourse);
            } else {
                const fetchSingle = async () => {
                    try {
                        const singleResult = await axios.get(`http://localhost:3000/api/course/${activeId}/overview`);
                        setCurrentCourse(singleResult.data.course);
                    } catch (error) {
                        console.log("Error fetching single course:", error.message);
                        const fallbackCourse = coursesData.find(c => String(c.id) === String(activeId));
                        setCurrentCourse(fallbackCourse || null);
                    }
                };
                fetchSingle();
            }
        } else if (!activeId) {
            setCurrentCourse(null);
        }
    }, [activeId, courseDetails]);

    return (
        <courseContext.Provider value={{
            courseDetails,
            setCourseDetails,
            currentCourse,
            setCurrentCourse
        }}>
            {children}
        </courseContext.Provider>
    );
}

export const useCourse = () => {
    const contextValue = useContext(courseContext);

    if (!contextValue) {
        throw new Error("useCourse must be used within a CourseProvider! 🚨");
    }

    return contextValue;
};