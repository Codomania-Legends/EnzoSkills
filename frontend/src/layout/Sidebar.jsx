import React from 'react'
import "../Utility/global.css"
import "./layout.css"

function Sidebar({active}) {
    return (
        <div className="sidebar-container medium-box-shadow white p-5">
            <div className={`${active == null ? 'sidebar-box-active' : 'sidebar-box'}`}>
                <img src='/Sidebar/home.svg' />
                <p className='text-block small-box-shadow'>Home</p>
            </div>
            <div className={`${active === 'courses' ? 'sidebar-box-active' : 'sidebar-box'}`}>
                <img src='/Sidebar/courses.svg' />
                <p className='text-block small-box-shadow'>Courses</p>
            </div>
            <div className={`${active === 'library' ? 'sidebar-box-active' : 'sidebar-box'}`}>
                <img src='/Sidebar/library.svg' />
                <p className='text-block small-box-shadow'>Library</p>
            </div>
            <div className={`${active === 'project' ? 'sidebar-box-active' : 'sidebar-box'}`}>
                <img src='/Sidebar/project.svg' />
                <p className='text-block small-box-shadow'>Project</p>
            </div>
            <div className={`${active === 'room' ? 'sidebar-box-active' : 'sidebar-box'}`}>
                <img src='/Sidebar/room.svg' />
                <p className='text-block small-box-shadow'>Room</p>
            </div>
            <div className={`${active === 'AI' ? 'sidebar-box-active' : 'sidebar-box'}`}>
                <img src='/Sidebar/AI.svg' />
                <p className='text-block small-box-shadow'>Cloura</p>
            </div>
            <div className={`${active === 'records' ? 'sidebar-box-active' : 'sidebar-box'}`}>
                <img src='/Sidebar/records.svg' />
                <p className='text-block small-box-shadow'>Records</p>
            </div>
        </div>
    )
}

export default Sidebar