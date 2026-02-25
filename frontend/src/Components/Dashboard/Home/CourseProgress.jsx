import React from 'react'

function CourseProgress({Courses}) {
    return (
        <>
            <h2 className='font-["Plus_Jakarta_Sans"] text-base font-semibold mb-4 text-center md:text-left'>Course Progress</h2>
                <div className='grid gap-y-4 px-2 md:px-8'>
                    {
                        Courses.map((course , index) => (
                            <div className='w-full flex flex-col lg:flex-row justify-between items-center rounded-2xl p-4 gap-4 relative white small-box-shadow' key={index}>
                                <img src={course.image} alt="" className="w-16 md:w-20 lg:w-auto object-contain" />
                                
                                <div className='h-full w-full lg:w-[70%] flex flex-col justify-between items-center lg:items-start gap-4 lg:gap-0'>
                                    <h3 className='font-bold font-["Plus_Jakarta_Sans"] text-center lg:text-left'>{course.name}</h3>
                                    
                                    {/* Stats container wrapped for mobile */}
                                    <div className="flex flex-wrap lg:flex-nowrap justify-evenly lg:justify-between items-center w-full gap-y-4 mt-2 lg:mt-0">
                                        
                                        <div className='relative flex justify-center items-center flex-col w-[30%] lg:w-auto'>
                                            <p className='font-bold text-xs md:text-sm'>{course.overall_progress}</p>
                                            <span className='text-[8px] md:text-xxs text-center'>Overall Progress</span>
                                            <div className="h-[0.5em] w-full lg:w-[60%] absolute top-[30%] lg:top-[30%] bg-[#27C84050]" />
                                        </div>
                                        
                                        <div className='relative flex justify-center items-center flex-col w-[30%] lg:w-auto'>
                                            <p className='font-bold text-xs md:text-sm'>{course.assignments[0]} / {course.assignments[1]}</p>
                                            <span className='text-[8px] md:text-xxs text-center'>Assignments</span>
                                            <div className="h-[0.5em] w-full lg:w-[60%] absolute top-[30%] lg:top-[30%] bg-[#6073FF50]" />
                                        </div>
                                        
                                        <div className='relative flex justify-center items-center flex-col w-[30%] lg:w-auto'>
                                            <p className='font-bold text-xs md:text-sm'>{course.assessments[0]} / {course.assessments[1]}</p>
                                            <span className='text-[8px] md:text-xxs text-center'>Assessments</span>
                                            <div className="h-[0.5em] w-full lg:w-[60%] absolute top-[30%] lg:top-[30%] bg-[#FF383C50]" />
                                        </div>
                                        
                                        {/* Adjusted side options position for mobile */}
                                        <div className="absolute top-2 right-2 lg:top-[10%] lg:right-[2%] flex justify-end gap-2 w-auto lg:w-[10%]">
                                            <img src="/Dashboard/Courses/info.svg" alt="" className="w-4 lg:w-auto cursor-pointer" />
                                            <img src="/Dashboard/Courses/menu.svg" alt="" className="w-4 lg:w-auto cursor-pointer" />
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