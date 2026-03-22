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
    <div className='h-full w-full'>
      <div className="flex fade_in items-center gap-4 mb-8">
        <img src="/Dashboard/Courses/Back.svg" alt="Back" className="h-4 w-4 cursor-pointer" />
        <h1 className="text-2xl font-bold">Project</h1>
      </div>

      <div className="flex w-full flex-wrap gap-6 justify-start">
        {data.map((item, index) => (
          <div key={index} className="flex w-[23%] flex-col white medium-box-shadow rounded-[3em] py-8 px-4 gap-4 relative">
            
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