import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

// Added setShowForm to props so the back button can close the form overlay
function AddProjectForm({ showForm, setShowForm }) {
  const formRef = useRef(null);

  useEffect(() => {
    if (showForm) {
      gsap.fromTo(formRef.current, {
        opacity: 0,
        yPercent: -20,
      }, {
        opacity: 1,
        yPercent: 0,
        duration: 0.3,
        ease: "power3.out",
        onComplete: () => {
          gsap.from(".show-profile-text", {
            y: 0,
            opacity: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: "power3.out"
          });
        }
      });
    } else {
      gsap.fromTo(formRef.current, {
        opacity: 1,
        yPercent: 0,
      }, {
        opacity: 0,
        yPercent: 20,
        duration: 0.2,
        ease: "power3.in"
      });
    }
  }, [showForm]);

  const [formData, setFormData] = useState({
    projectName: '',
    projectRepoLink: '',
    projectStatus: '',
    projectDescription: '',
    projectTechStacks: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Project Data:', formData);
  };

  if (!showForm) return null;

  return (
    <div 
      ref={formRef} 
      className="absolute bottom-0 right-0 w-full max-sm:w-full md:w-[40%] h-full formBGColor medium-box-shadow overflow-y-auto p-4 sm:p-8 flex justify-center items-start box-border mb-2 z-50 rounded-3xl"
    >
      <form 
        onSubmit={handleSubmit} 
        className="w-full h-[90%] max-w-xl flex flex-col gap-4 text-left"
      >
        
        {/* Heading Wrapper Section:
          - Wrapped the button and h1 in a flex container.
          - Uses items-center and a gap to keep them cleanly aligned inline.
        */}
        <div className="flex items-center gap-3 mb-2">
          <img 
            src="/Dashboard/Courses/Back.svg" 
            alt="Back" 
            className="h-4 w-4 cursor-pointer hover:scale-110 transition-transform"
            onClick={() => setShowForm && setShowForm(false)} 
          />
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
            Add You Projects +
          </h1>
        </div>

        {/* Input Field: Project Name */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-base font-bold text-gray-900 pl-1">Project Name :</label>
          <input
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            placeholder="Enter Project Name"
            className="w-full h-12 rounded-2xl border-none outline-none px-5 text-sm font-medium text-white placeholder-gray-300 small-box-shadow formInputColor"
          />
        </div>

        {/* Input Field: Project Repo Link */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-base font-bold text-gray-900 pl-1">Project Repo Link :</label>
          <input
            type="url"
            name="projectRepoLink"
            value={formData.projectRepoLink}
            onChange={handleChange}
            placeholder="Enter Project Repo Link"
            className="w-full h-12 rounded-2xl border-none outline-none px-5 text-sm font-medium text-white placeholder-gray-300 small-box-shadow formInputColor"
          />
        </div>

        {/* Input Field: Project Status */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-base font-bold text-gray-900 pl-1">Project Status :</label>
          <input
            type="text"
            name="projectStatus"
            value={formData.projectStatus}
            onChange={handleChange}
            placeholder="Enter Project Status"
            className="w-full h-12 rounded-2xl border-none outline-none px-5 text-sm font-medium text-white placeholder-gray-300 small-box-shadow formInputColor"
          />
        </div>

        {/* Input Field: Project Description */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-base font-bold text-gray-900 pl-1">Project Description :</label>
          <input
            type="text"
            name="projectDescription"
            value={formData.projectDescription}
            onChange={handleChange}
            placeholder="Enter Project Description"
            className="w-full h-12 rounded-2xl border-none outline-none px-5 text-sm font-medium text-white placeholder-gray-300 small-box-shadow formInputColor"
          />
        </div>

        {/* Textarea Field: Project TechStacks */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-base font-bold text-gray-900 pl-1">Project TechStacks :</label>
          <textarea
            name="projectTechStacks"
            value={formData.projectTechStacks}
            onChange={handleChange}
            placeholder="Enter Project Teck Stack...."
            rows="3"
            className="w-full rounded-2xl border-none outline-none p-5 text-sm font-medium text-white placeholder-gray-300 small-box-shadow formInputColor resize-none"
          />
        </div>

        {/* Action Button Segment */}
        <div className="w-full flex justify-center gap-4 mt-4">
          <button
            type="submit"
            className="px-10 py-3 rounded-xl font-bold text-white small-box-shadow transition-transform active:scale-95 cursor-pointer text-center formInputColor"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProjectForm;