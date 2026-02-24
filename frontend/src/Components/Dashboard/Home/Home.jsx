import React from 'react'
import Dash_Layout from '../../../layout/Dash_Layout'
import "./home.css"
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
        <div className='dash-home-container'>
            <div className='dash-home-left'>
                <Greet />
                <div className='dash-home-course-progress dark-blue medium-box-shadow'>
                    <CourseProgress Courses={Courses}/>
                </div>
            </div>
            <div className='dash-home-right'>
                <ProgressBox />
                <ActivityGraph />
            </div>
        </div>
    </Dash_Layout>
    )
}

export default Home