import React from 'react'
import Sidebar from './Sidebar'
import Dash_Navbar from './Dash_Navbar'
import "./layout.css"
import { Outlet } from 'react-router'

function Dash_Layout() {
    return (
        <div className='dash-container'>
            <div className='dash-navbar'>
                <Dash_Navbar />
            </div>
            <div className="main-container">
                <div className='dash-sidebar'>
                    <Sidebar />
                </div>
                <div className='dash-content'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dash_Layout