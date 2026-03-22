import React from 'react'

function CourseDetails({course, setShowDetails}) {
    return (
        <div className='course-details-container w-full h-full absolute z-10 flex justify-center items-center backdrop-blur-xs rounded-4xl p-5'>
            <div className='w-1/2 h-full big-box-shadow white rounded-4xl'>
                <div onClick={() => setShowDetails([false, null])} className='absolute top-0 right-0 m-4 text-2xl font-bold cursor-pointer'>X</div>
                <div className='flex justify-center items-center'>
                    <img src={course.image} alt={course.title} className="h-30 object-cover" />
                </div>
                <div className='flex justify-center items-center'>
                    <h1 className="text-2xl h-[10%] font-bold">{course.title}</h1>
                </div>
                <div className='flex justify-center items-center'>
                    <h1 className="text-2xl h-[10%] font-bold">{course.description}</h1>
                </div>
            </div>
        </div>
    )
}

export default CourseDetails