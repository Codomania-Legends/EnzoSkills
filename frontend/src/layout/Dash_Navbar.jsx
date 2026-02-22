import React from 'react'

function Dash_Navbar() {
  return (
    <div className='dash-navbar-container'>
        <div className='dash-navbar-left'>
            <img src="/full-logo.png" alt="Logo" className='dash-navbar-logo'/>
        </div>

            {/* Searchbar only for Courses Section */}
            <div className='flex-1'>
                <div className='dash-navbar-searchbar small-box-shadow blue'>
                    <img src='/Dashboard/search.svg' />
                    <input type="text" placeholder='Search' className='dash-navbar-input-search' />
                </div>
            </div>
        <div className='dash-navbar-right'>
            <div className='dash-navbar-profile'>
                <img src='/Dashboard/profile.png' />
            </div>
            <div className='dash-navbar-menu'>
                <img src='/Dashboard/menu.png' />
            </div>
        </div>
    </div>
  )
}

export default Dash_Navbar