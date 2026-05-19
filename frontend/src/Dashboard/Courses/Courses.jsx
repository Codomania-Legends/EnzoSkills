import { useRef } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useCourse } from '../../Utility/Course';
import { useNavigate } from 'react-router';
function Courses() {

    const { currentCourse, setCurrentCourse, courseDetails } = useCourse();

    const navigate = useNavigate();

    const containerRef = useRef(null);
    useGSAP(() => {
        gsap.from(".fade_in", {
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out"
        });
    }, { scope: containerRef, dependencies: [courseDetails] });
    return (
        <div ref={containerRef} className="container overflow-scroll md:overflow-hidden h-full md:h-full mx-auto px-4 mt-5">
            <div className="flex justify-evenly items-center w-1/10 mb-5">
                <img src="/Dashboard/Courses/Back.svg" alt="Back" className="h-4 w-4" />
                <h1 className="text-2xl h-[10%] font-bold">Courses</h1>
            </div>
            <div className="flex h-[80%] justify-between relative items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 h-full">
                    {Array.isArray(courseDetails) && courseDetails.map((course) => (
                        <div onClick={() => { setCurrentCourse(course.id); navigate(`/dashboard/courses/overview/${course.id}`); }} className='slide_right flex justify-center h-full md:h-[90%] items-center' key={course.id}>
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
                                        {Array.from({ length: parseInt(course.rating) }, (_, i) => (
                                            <img key={i} src="/Dashboard/Courses/star.svg" alt="Rating" className="h-3 w-3" />
                                        ))}
                                        {course.rating}
                                    </p>
                                    <p className="text-black my-2 md:my-4 text-xs">{course.description}</p>
                                </div>
                                <div className='flex justify-evenly w-full align-bottom'>
                                    <button style={{ backgroundColor: "#7F77FF" }} className="text-xs cursor-pointer small-box-shadow blue text-white px-4 md:px-6 md:py-2 rounded-xl justify-between flex items-center gap-2">
                                        Enroll
                                        <img src="/Dashboard/Courses/enroll.svg" alt="Enroll" className="h-3 w-3" />
                                    </button>
                                    <button style={{ backgroundColor: "#7F77FF" }} className="text-xs cursor-pointer small-box-shadow blue text-white px-4 md:px-6 py-2 md:py-2 rounded-xl">View Details</button>
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