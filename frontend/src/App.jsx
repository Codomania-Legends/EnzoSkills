import React from 'react'
import "./Utility/global.css"
import Sidebar from './layout/Sidebar'
import Dash_Navbar from './layout/Dash_Navbar'

function App() {
  return (
    <>
    <div className='app-container h-100vh w-100vw'>
      <Dash_Navbar />
      <Sidebar />
    </div>
    </>
  )
}

export default App