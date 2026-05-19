import React from 'react'

function Project() {
  const data = [
    {
      image: "/Dashboard/projectImg.svg", // Use your chocolate image here
      ProjectName: "Choco-Pebble",
      ProjectLink: "https://github.com/Codomania-Legends/ChocoPebble",
      ProjectDescription: "Not a Work of a Beginner",
      ProjectStatus: "Completed",
      techStack: ["React JS", "Node JS", "MongoDB", "Tailwind", "GSAP"],
    },
    {
      image: "/Dashboard/projectImg.svg", // Use your chocolate image here
      ProjectName: "Choco-Pebble",
      ProjectLink: "https://github.com/Codomania-Legends/ChocoPebble",
      ProjectDescription: "Not a Work of a Beginner",
      ProjectStatus: "Completed",
      techStack: ["React JS", "Node JS", "MongoDB", "Tailwind", "GSAP"],
    },
    {
      image: "/Dashboard/projectImg.svg", // Use your chocolate image here
      ProjectName: "Choco-Pebble",
      ProjectLink: "https://github.com/Codomania-Legends/ChocoPebble",
      ProjectDescription: "Not a Work of a Beginner",
      ProjectStatus: "Completed",
      techStack: ["React JS", "Node JS", "MongoDB", "Tailwind", "GSAP"],
    },
    {
      image: "/Dashboard/projectImg.svg", // Use your chocolate image here
      ProjectName: "Choco-Pebble",
      ProjectLink: "https://github.com/Codomania-Legends/ChocoPebble",
      ProjectDescription: "Not a Work of a Beginner",
      ProjectStatus: "Completed",
      techStack: ["React JS", "Node JS", "MongoDB", "Tailwind", "GSAP"],
    },
  ]

  return (
    <div className='h-full w-full py-4 box-border pb-16 bg-transparent'>
      <div className="flex justify-between items-center w-full mb-8">
        <div className="flex items-center gap-4">
          <img src="/Dashboard/Courses/Back.svg" alt="Back" className="h-4 w-4 cursor-pointer" />
          <h1 className="text-3xl font-bold text-gray-900">My Project</h1>
        </div>

        {/* Add Project Button Styling */}
        <button className="text-xs font-semibold text-white px-5 py-2.5 rounded-xl shadow-lg cursor-pointer transition-all hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #3b4b7a, #202b4d)' }}>
          Add Project +
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-md sm:max-w-none mx-auto px-4 ">
        {data.map((item, index) => (
          <div key={index} className="flex w-full flex-col white medium-box-shadow rounded-[2.5em] p-5 gap-3 relative">

            {/* Top Section: Project Image */}
            <div className="flex align-center justify-center h-[50%] overflow-hidden">
              <img
                src={item.image}
                alt={item.ProjectName}
                className=" object-cover"
              />
            </div>

            {/* Middle Section: Project Title */}
            <h2 className="text-2xl font-bold px-2">{item.ProjectName}</h2>

            {/* Bottom Section: Split Info and Tech Stack */}
            <div className='flex justify-between items-end px-2 pb-2'>

              {/* Left Side: Link, Status, Description */}
              <div className="flex flex-col gap-3">
                <a
                  href={item.ProjectLink}
                  target='main'
                  rel="noopener noreferrer"
                  className="text-blue-500 text-xs font-semibold flex items-center gap-1"
                >
                  <span className="text-sm">🔗</span> Repo Link
                </a>

                <span className="blue small-box-shadow text-[10px] font-bold px-4 py-2 rounded-full w-fit">
                  {item.ProjectStatus}
                </span>

                <p className="text-[10px] text-gray-600 font-medium">
                  {item.ProjectDescription}
                </p>
              </div>

              {/* Right Side: Tech Stack List */}
              <div className='flex flex-col'>
                <ul className="list-disc list-inside text-gray-700 marker:text-black">
                  {item.techStack.map((tech, i) => (
                    <li key={i} className="text-[10px] font-bold leading-tight">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Optional Edit Icon (The purple pen in your image) */}
            <div className="absolute top-6 right-6 bg-indigo-500 p-1 rounded-bl-lg rounded-tr-md">
              {/* Add a tiny edit SVG here if needed */}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Project