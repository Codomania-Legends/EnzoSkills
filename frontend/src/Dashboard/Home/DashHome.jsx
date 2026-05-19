import React from 'react'
import Dash_Layout from '../layout/Dash_Layout'
import Greet from './Greet'
import CourseProgress from './CourseProgress'
import ProgressBox from './ProgressBox'
import ActivityGraph from './ActivityGraph'
import { useGSAP } from '@gsap/react'
import { Fade_in, Slide_up } from '../../Utility/Animations/Basic'
import { useRef } from 'react'

function DashHome() {
    const containerRef = useRef(null);
    useGSAP(() => {
        Slide_up(containerRef.current)
    }, {scope : containerRef})
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
        /* 
          - Mobile layout changed to `justify-start items-stretch` with a base `p-4` spacing.
          - Added `box-border` to prevent absolute layout breakages from nested children.
        */
        <div ref={containerRef} className='h-full  overflow-y-auto md:overflow-hidden md:h-full w-full flex flex-col md:flex-row justify-start md:justify-center items-stretch md:items-center gap-6 md:gap-0 p-4 sm:p-6 md:py-0 md:px-0 box-border'>
            
            {/* Left Column (Greet & Course Progress) */}
            <div className='h-auto md:h-full w-full md:w-1/2 flex flex-col justify-start md:justify-around items-stretch md:items-start px-0 md:px-8 gap-6 md:gap-0'>
                <Greet />
                
                {/* Fixed height constraints for mobile so internal custom scrollbar works correctly */}
                <div className='slide-up h-[350px] md:h-[50%] w-full rounded-[2em] overflow-y-scroll py-6 px-6 sm:px-8 [&::-webkit-scrollbar]:hidden dark-blue medium-box-shadow'>
                    <CourseProgress Courses={Courses}/>
                </div>
            </div>
            
            {/* Right Column (Progress Snapshot Box & Activity Graph) */}
            <div className='h-auto md:h-full w-full md:w-1/2 flex flex-col justify-start md:justify-around items-stretch md:items-start px-0 md:px-0 gap-6 md:gap-0'>
                <ProgressBox />
                <ActivityGraph />
            </div>
        </div>
    )
}

export default DashHome