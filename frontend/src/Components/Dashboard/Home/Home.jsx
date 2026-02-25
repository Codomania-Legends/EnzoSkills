import React from 'react'
import Dash_Layout from '../../../layout/Dash_Layout'
import Greet from './Greet'
import CourseProgress from './CourseProgress'
import ProgressBox from './ProgressBox'
import ActivityGraph from './ActivityGraph'

function Home() {
    const Courses = [
        {
            name: "Learning React",
            overall_progress: "72%",
            image : "/Dashboard/Courses/c_1.png",
            assessments : [3 , 4],
            assignments : [5 , 5],            
        },
        {
            name: "Learning Python",
            overall_progress: "65%",
            image : "/Dashboard/Courses/c_2.png",
            assessments : [4 , 4],
            assignments : [1 , 3],            
        },
    ]
    return (
    <Dash_Layout>
        <div className='min-h-screen md:h-full w-full flex flex-col md:flex-row justify-center items-center gap-8 md:gap-0 py-8 md:py-0'>
            
            <div className='h-auto md:h-full w-full md:w-1/2 flex flex-col justify-around items-center md:items-start px-4 md:px-8 gap-8 md:gap-0'>
                <Greet />
                
                <div className='max-h-[400px] md:max-h-[60%] w-full md:w-[90%] rounded-[2em] overflow-y-scroll py-8 px-4 [&::-webkit-scrollbar]:hidden dark-blue medium-box-shadow'>
                    <CourseProgress Courses={Courses}/>
                </div>
            </div>
            
            <div className='h-auto md:h-full w-full md:w-1/2 flex flex-col justify-around items-center md:items-start px-4 md:px-0 gap-8 md:gap-0'>
                <ProgressBox />
                <ActivityGraph />
            </div>
        </div>
    </Dash_Layout>
    )
}

export default Home