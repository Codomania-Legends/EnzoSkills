import React from 'react'

function CourseProgress({Courses}) {
    return (
        <>
            <h2>Course Progress</h2>
                <div className='dash-home-course-progress-content'>
                    {
                        Courses.map((course , index) => (
                            <div className='dash-home-course-progress-item white small-box-shadow border-radius-10' key={index}>
                                <img src={course.image} alt="" />
                                <div className='dash-home-course-progress-item-content'>
                                    <h3 className='dash-home-course-name'>{course.name}</h3>
                                    <div className="dash-home-course-progress-items-Details">
                                        <div className='course-progress-items flex justify-center align-center flex-col'>
                                            <p>{course.overall_progress}</p>
                                            <span className='text-xs'>Overall Progress</span>
                                            <div className="course-progress-marker bg-[#27C84050]" />
                                        </div>
                                        <div className='course-progress-items flex justify-center align-center flex-col'>
                                            <p>{course.assignments[0]} / {course.assignments[1]}</p>
                                            <span className='text-xs'>Assignments</span>
                                            <div className="course-progress-marker bg-[#6073FF50]" />
                                        </div>
                                        <div className='course-progress-items flex justify-center align-center flex-col'>
                                            <p>{course.assessments[0]} / {course.assessments[1]}</p>
                                            <span className='text-xs'>Assessments</span>
                                            <div className="course-progress-marker bg-[#FF383C50]" />
                                        </div>
                                        <div className="side-options-dash-home">
                                            <img src="/Dashboard/Courses/info.svg" alt="" />
                                            <img src="/Dashboard/Courses/menu.svg" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
        </>
    )
}

export default CourseProgress