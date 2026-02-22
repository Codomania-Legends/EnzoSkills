import React from 'react'
import "../Utility/global.css"
import "./layout.css"

function Sidebar({active}) {
    return (
        <div className="sidebar-container medium-box-shadow white p-5">
            <div className={`${active == null ? 'sidebar-box-active' : 'sidebar-box'}`}>
                <img src='/Sidebar/home.svg' />
                <p>Home</p>
            </div>
            <div className={`${active === 'courses' ? 'sidebar-box-active' : 'sidebar-box'}`}>
                <img src='/Sidebar/courses.svg' />
                <p>Courses</p>
            </div>
            <div className={`${active === 'library' ? 'sidebar-box-active' : 'sidebar-box'}`}>
                <img src='/Sidebar/library.svg' />
                <p>Library</p>
            </div>
            <div className={`${active === 'project' ? 'sidebar-box-active' : 'sidebar-box'}`}>
                <img src='/Sidebar/project.svg' />
                <p>Project</p>
            </div>
            <div className={`${active === 'room' ? 'sidebar-box-active' : 'sidebar-box'}`}>
                <img src='/Sidebar/room.svg' />
                <p>Room</p>
            </div>
            <div className={`${active === 'AI' ? 'sidebar-box-active' : 'sidebar-box'}`}>
                <img src='/Sidebar/AI.svg' />
                <p>Cloura</p>
            </div>
            <div className={`${active === 'records' ? 'sidebar-box-active' : 'sidebar-box'}`}>
                <img src='/Sidebar/records.svg' />
                <p>Records</p>
            </div>
        </div>
    )
}

export default Sidebar