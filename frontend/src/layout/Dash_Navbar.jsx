import React from 'react'

function Dash_Navbar() {
  return (
    <div className='dash-navbar-container'>
        <div className='dash-navbar-left h-100% '>
            <img src="/full-logo.png" alt="Logo" />
        </div>

        <div className='dash-navbar-right'>
            <div className='dash-navbar-searchbar'>
                <img src='/Dashboard/search.svg' />
                <input type="text" placeholder='Search' className='dash-navbar-input-search' />
            </div>
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