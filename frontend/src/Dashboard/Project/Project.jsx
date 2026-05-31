import React, { useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import AddProjectForm from './AddProjectForm';
import { useUser } from '../../Utility/UserDetails';
import { sileo } from 'sileo';

function Project() {
  const { userDetails } = useUser();
  const [projectToEdit, setProjectToEdit] = useState(null);
  const isLoaded = userDetails && !Array.isArray(userDetails) && !!userDetails.user_id;
  const userProjects = (userDetails?.projects || []).filter(proj => proj && proj.project_name);

  const formattedProjects = userProjects.map((proj) => ({
    id: proj._id,
    image: proj.project_image || "/Dashboard/projectImg.svg",
    ProjectName: proj.project_name || "Untitled Project",
    ProjectLink: proj.project_repo || "#",
    ProjectDescription: proj.description || "No description provided.",
    ProjectStatus: proj.deployed_link || "Status Unknown",
    techStack: proj.project_tech ? proj.project_tech.split(/[,\n;]/).map(s => s.trim()).filter(Boolean) : []
  }));

  const handleEditClick = (item) => {
    const rawProject = userProjects.find(p => p._id === item.id);
    if (rawProject) {
      setProjectToEdit(rawProject);
      setShowForm(true);
    } else {
      sileo.info("Demo projects cannot be edited. Please add a new project!");
    }
  };

  const data = formattedProjects.length > 0 ? formattedProjects : [
    {
      image: "/Dashboard/projectImg.svg",
      ProjectName: "Choco-Pebble",
      ProjectLink: "https://github.com/Codomania-Legends/ChocoPebble",
      ProjectDescription: "Not a Work of a Beginner",
      ProjectStatus: "Completed",
      techStack: ["React JS", "Node JS", "MongoDB", "Tailwind", "GSAP"]
    },
    {
      image: "/Dashboard/contrizee.png",
      ProjectName: "ContriZee",
      ProjectLink: "https://github.com/Codomania-Legends/ContriZee",
      ProjectDescription: "Smart group expense management and settlement application with real-time tracking.",
      ProjectStatus: "Completed",
      techStack: ["React JS", "Firebase", "Tailwind", "Context API"]
    },
    {
      image: "/Dashboard/SIPVision.png",
      ProjectName: "SIPVision",
      ProjectLink: "https://github.com/Codomania-Legends/SIPVision",
      ProjectDescription: "Financial visualization tool for projecting historical stock and mutual fund investment returns.",
      ProjectStatus: "In Progress",
      techStack: ["React JS", "Tailwind", "Chart.js", "REST API"]
    },
    {
      "image": "/Dashboard/enzoskills.png",
      "ProjectName": "EnzoSkills",
      "ProjectLink": "https://github.com/Codomania-Legends/EnzoSkills",
      "ProjectDescription": "A structured, interactive learning path dashboard designed to track coding skills and monitor progress.",
      "ProjectStatus": "In Progress",
      "techStack": ["React JS", "Node JS", "MongoDB", "Tailwind", "GSAP"]
    }
  ];


  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const containerRef = useRef(null);


  if (!isLoaded) {
    return (
      <div className="h-full w-full py-4 box-border pb-16 bg-transparent relative">
        <div className="flex justify-between items-center w-full mb-8">
          <div className="flex items-center gap-4 project-title">
            <img src="/Dashboard/Courses/Back.svg" alt="Back" className="h-4 w-4 cursor-pointer" />
            <h1 className="text-2xl font-bold text-gray-900">My Project</h1>
          </div>
          <button className="add-project-button -translate-x-10 text-xs font-semibold text-white small-box-shadow violetBlue px-10 py-3 rounded-xl cursor-pointer opacity-50 pointer-events-none">
            Add Project +
          </button>
        </div>

        {/* Skeleton Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-md sm:max-w-none mx-auto px-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="project flex w-full flex-col bg-white/40 medium-box-shadow rounded-[2.5em] p-5 gap-3 relative animate-pulse">
              <div className="w-[90%] mx-auto h-35 bg-gray-300/60 rounded-[1.5em]" />
              <div className="h-6 bg-gray-300/60 rounded w-2/3 mx-2 mt-2" />
              <div className="flex justify-between items-end px-2 pb-2">
                <div className="flex flex-col gap-3 w-1/2">
                  <div className="h-4 bg-gray-300/60 rounded w-3/4" />
                  <div className="h-6 bg-gray-300/60 rounded-full w-1/2" />
                </div>
                <div className="flex flex-col gap-1 w-[40%]">
                  <div className="h-3 bg-gray-300/60 rounded w-full" />
                  <div className="h-3 bg-gray-300/60 rounded w-4/5" />
                  <div className="h-3 bg-gray-300/60 rounded w-2/3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    /* Added `relative` here so the absolutely positioned form targets this container coordinate map */
    <div ref={containerRef} className='h-full w-full py-4 box-border pb-16 bg-transparent relative'>

      {/* Overlay Component injection outside header elements flow */}
      <AddProjectForm showForm={showForm} setShowForm={setShowForm} projectToEdit={projectToEdit} setProjectToEdit={setProjectToEdit} />

      <div className="flex justify-between items-center w-full mb-8">
        <div className="flex items-center gap-4 project-title">
          <img src="/Dashboard/Courses/Back.svg" alt="Back" className="h-4 w-4 cursor-pointer" />
          <h1 className="text-2xl font-bold text-gray-900">My Project</h1>
        </div>

        {/* Add Project Button */}
        <button
          className="add-project-button -translate-x-10 text-xs font-semibold text-white small-box-shadow violetBlue px-10 py-3 rounded-xl cursor-pointer transition-all hover:scale-105 z-10"
          onClick={() => {
            setProjectToEdit(null);
            setShowForm(!showForm);
          }}>
          
          {showForm ? "Close Form ✕" : "Add Project +"}
        </button>
      </div>

      {/* Projects Grid Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-md sm:max-w-none mx-auto px-4">
        {data.map((item, index) =>
        <div key={index} className="project slide-up -translate-y-5 flex w-full flex-col white bg-white medium-box-shadow rounded-[2.5em] p-5 gap-3 relative transition-all duration-300 hover:scale-103 hover:shadow-xl hover:-translate-y-6">
            <div className="w-[90%] mx-auto h-35 overflow-hidden rounded-[1.5em] flex items-center justify-center">
              <img src={item.image} alt={item.ProjectName} className="w-full h-full object-cover" />
            </div>
            <h2 className="text-2xl text-left font-bold px-2">{item.ProjectName}</h2>
            <div className='w-full flex justify-between items-end px-2 pb-2'>
              <div className="flex flex-col gap-3">
                <a href={item.ProjectLink} target='_blank' rel="noopener noreferrer" className="text-blue-500 text-xs font-semibold flex items-center gap-1">
                  <span className="text-sm">🔗</span> Repo Link
                </a>
                <span className="blue small-box-shadow text-[10px] font-bold px-4 py-2 rounded-full w-fit">
                  {item.ProjectStatus}
                </span>
                <p className="text-[10px] text-gray-600 font-medium">
                  {item.ProjectDescription}
                </p>
              </div>
              <div className='flex flex-col max-w-[45%]'>
                <ul className="list-disc pl-4 text-gray-700 marker:text-black">
                  {item.techStack.map((tech, i) =>
                    <li key={i} className="text-[10px] font-bold leading-normal mb-1">{tech}</li>
                  )}
                </ul>
              </div>
            </div>
            <div className="absolute top-6 right-6 bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors p-2 rounded-full cursor-pointer shadow-sm flex items-center justify-center" onClick={() => handleEditClick(item)} title="Edit Project">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>);

}

export default Project;