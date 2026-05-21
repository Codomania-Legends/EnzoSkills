import React from 'react'
import { NavLink } from 'react-router'

function MobileSidebar() {
  const pages = [
    {
      name: "Home",
      icon: "/Sidebar/home.svg",
      path: "/dashboard/home"
    },
    {
      name: "Library",
      icon: "/Sidebar/library.svg",
      path: "/dashboard/library"
    },
    {
      name: "Courses",
      icon: "/Sidebar/courses.svg",
      path: "/dashboard/courses"
    },
    {
      name: "Project",
      icon: "/Sidebar/project.svg",
      path: "/dashboard/project"
    },
    {
      name: "Room",
      icon: "/Sidebar/room.svg",
      path: "/dashboard/room"
    },
    {
      name: "AI",
      icon: "/Sidebar/AI.svg",
      path: "/dashboard/AI"
    },
    {
      name: "Records",
      icon: "/Sidebar/records.svg",
      path: "/dashboard/records"
    }
  ]
  return (
    <div className='md:hidden absolute bottom-10 w-full flex justify-center items-center'>
      <div className='w-8/10 flex justify-around items-center white small-box-shadow px-2 py-5 rounded-full'>
        {pages.map((page, index) => (
          <NavLink to={page.path} key={page.path + page.name} className="flex flex-col justify-center items-center">
            <img src={page.icon} alt={page.name} className='h-3 w-3' />
            <p className='text-xs'>{page.name}</p>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default MobileSidebar