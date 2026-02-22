import React from 'react'
import "./Utility/global.css"
import Sidebar from './layout/Sidebar'
import MainHomePage from './Components/MainHome/MainHomePage'

function App() {
  return (
    <>
    <div className='app-container h-100vh w-100vw'>
      <Sidebar />
    </div><MainHomePage/>
    </>
  )
}

export default App