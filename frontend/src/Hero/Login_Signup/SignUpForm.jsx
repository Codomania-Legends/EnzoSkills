import React, { useState } from 'react';

const ProfileForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    image: '',
    phone: '',
    designation: '', // Added
    skills: '',
    experience: '', // Added
    education: {
      secondary_Edu: { school_name: '', year: '', marks: '' },
      higher_Edu: { school_name: '', year: '', marks: '' },
      degree: { clg_name: '', duration: '', year: '', marks: '' }
    },
    projects: [{ project_name: '', description: '', project_tech: '', project_repo: '', deployed_link: '' }]
  });

  
  // Handlers
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleEduChange = (level, field, value) => {
    setFormData(prev => ({
      ...prev,
      education: { ...prev.education, [level]: { ...prev.education[level], [field]: value } }
    }));
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[index][field] = value;
    setFormData({ ...formData, projects: updatedProjects });
  };

  //add project
  const addProject = () => {
    setFormData({
      ...formData,
      projects: [...formData.projects, { project_name: '', description: '', project_tech: '', project_repo: '', deployed_link: '' }]
    });
  };

  //remove project
  const removeProject = (index) => {
    setFormData({
      ...formData,
      projects: formData.projects.filter((_, i) => i !== index)
    });
  };

  //Skip button
  const handleSkip = () => {
    // If using React Router: navigate("/dashboard/home");
    window.location.href = "/dashboard/home"; 
  };

  const hexagonStyle = {
  clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)"
};
  return (
    <div className="min-h-screen w-full small  flex items-center justify-center flex-col p-6 font-sans">
      <div className="absolute top-8 right-10">
        <button 
          onClick={handleSkip}
          className="px-6 py-2 rounded-xl text-purple-700 font-bold small-box-shadow gray hover:bg-purple-100 transition-all active:scale-95"
        >
          Skip &rarr;
        </button>
      </div>

      {/* Progress Tracker */}
      <div className="flex justify-between w-1/2 mb-10 px-10 relative">
        {/* Background Gray Line (Static) */}
        <div className="absolute top-1/2 left-12 w-[85%] h-1  bg-gray-400 -z-0 transform -translate-y-1/2"></div>
        
        {/* Active Purple Line (Moving) */}
        <div 
          className="absolute top-1/2 left-12 w-full h-1 bg-purple-600 z-0 transform -translate-y-1/2 transition-all duration-500 ease-in-out"
          style={{ 
            /* Logic: width grows by 33.3% for each step moved past step 1 */
            width: `${((step - 1) / 3.5) * 100}%` 
          }}
        ></div>

        {[1, 2, 3, 4].map((i) => (
          <div 
            key={i}
            // style={hexagonStyle} 
            className={`w-14 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-500 z-10 ${
              step >= i 
                ? 'small-box-shadow purple text-white' 
                : 'small-box-shadow gray text-gray-600'
            }`}
          >
            {i}
          </div>
        ))}
      </div>
      <div className="max-w-3xl white h-[70vh] flex flex-col items-center justify-center rounded-4xl medium-box-shadow w-full">
        

        <form className='h-[90%] w-[90%] ' onSubmit={(e) => e.preventDefault()}>
          
          {/* STEP 1: BASIC INFO & DESIGNATION */}
          {step === 1 && (
            <div className='h-full w-full flex flex-col justify-between p-4'>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-purple-700">Professional Identity</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-gray-600 ml-1">Designation</label>
                    <input className='border border-gray-400 rounded-2xl h-12 pl-5 bg-[#f0f2f5] outline-none shadow-[inset_4px_4px_8px_#b8b9be]' type="text" placeholder="Frontend Developer" value={formData.designation} onChange={(e) => setFormData({...formData, designation: e.target.value})} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-gray-600 ml-1">Phone Number</label>
                    <input className='border border-gray-400 rounded-2xl h-12 pl-5 bg-[#f0f2f5] outline-none shadow-[inset_4px_4px_8px_#b8b9be]' type="text" placeholder="+91 0000000000" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-600 ml-1">Profile Picture</label>
                  <input className='border border-gray-400 rounded-xl p-2 bg-[#f0f2f5] shadow-[inset_4px_4px_8px_#b8b9be]' type="file" />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-600 ml-1">Professional Experience</label>
                  <textarea className='border border-gray-400 rounded-2xl p-5 h-32 bg-[#f0f2f5] outline-none shadow-[inset_4px_4px_8px_#b8b9be] resize-none' placeholder="Brief Summary" value={formData.experience} onChange={(e) => setFormData({...formData, experience: e.target.value})} />
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button type="button" className='small-box-shadow purple text-white rounded-2xl px-8 py-3 font-bold shadow-lg' onClick={nextStep}>Next</button>
              </div>
            </div>
          )}

          {/* STEP 2: SKILLS */}
          {step === 2 && (
            <div className="h-[90%] w-full flex flex-col justify-between p-4">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-purple-700">Core Skills</h2>
                <p className="text-gray-500 text-sm">List your tech stack separated by commas.</p>
                
                <div className="flex flex-col gap-1 mt-4">
                  <label className="text-sm font-bold text-gray-600 ml-1">Skills Occupied</label>
                  <textarea 
                    className="border border-gray-400 rounded-2xl p-5 h-48 bg-[#f0f2f5] outline-none shadow-[inset_4px_4px_8px_#b8b9be] resize-none" 
                    placeholder="React, Node.js, GSAP, Tailwind CSS..." 
                    value={formData.skills} 
                    onChange={(e) => setFormData({...formData, skills: e.target.value})} 
                  />
                </div>
              </div>

              <div className="flex justify-between mt-10">
                <button type="button" className="small-box-shadow gray text-gray-700 rounded-2xl px-8 py-3 font-bold border border-gray-400" onClick={prevStep}>Back</button>
                <button type="button" className="small-box-shadow purple text-white rounded-2xl px-8 py-3 font-bold shadow-md" onClick={nextStep}>Next</button>
              </div>
            </div>
          )}

          {/* STEP 3: EDUCATION (Full Schema) */}
          {step === 3 && (
            <div className="h-full w-full flex flex-col justify-between p-4">
              <div>
                <h2 className="text-2xl font-bold mb-6 text-purple-700">Education Details</h2>
                <div className="space-y-6 max-h-[45vh] overflow-y-auto pr-4 custom-scrollbar">
                  
                  {/* Degree Section */}
                  <div className="p-5 rounded-3xl shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] border border-gray-300">
                    <h3 className="font-bold text-purple-600 mb-4 text-xs uppercase tracking-widest">Degree / Graduation</h3>
                    <div className="flex flex-col gap-1 mb-4">
                      <label className="text-xs font-bold text-gray-600 ml-1">College Name</label>
                      <input className="border border-gray-400 rounded-xl h-10 pl-4 bg-[#f0f2f5]" placeholder="College Name" value={formData.education.degree.clg_name} onChange={(e) => handleEduChange('degree', 'clg_name', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-600 ml-1">Duration</label>
                        <input className="border border-gray-400 rounded-xl h-10 pl-4 bg-[#f0f2f5]" placeholder="Years" value={formData.education.degree.duration} onChange={(e) => handleEduChange('degree', 'duration', e.target.value)} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-600 ml-1">Year</label>
                        <input className="border border-gray-400 rounded-xl h-10 pl-4 bg-[#f0f2f5]" placeholder="Passing" value={formData.education.degree.year} onChange={(e) => handleEduChange('degree', 'year', e.target.value)} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-600 ml-1">Marks</label>
                        <input className="border border-gray-400 rounded-xl h-10 pl-4 bg-[#f0f2f5]" placeholder="CGPA" value={formData.education.degree.marks} onChange={(e) => handleEduChange('degree', 'marks', e.target.value)} />
                      </div>
                    </div>
                  </div>

                  {/* Higher Secondary Section */}
                  <div className="p-5 rounded-3xl shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] border border-gray-300">
                    <h3 className="font-bold text-purple-600 mb-4 text-xs uppercase tracking-widest">Higher Education (12th)</h3>
                    <div className="flex flex-col gap-1 mb-4">
                      <label className="text-xs font-bold text-gray-600 ml-1">School Name</label>
                      <input className="border border-gray-400 rounded-xl h-10 pl-4 bg-[#f0f2f5]" placeholder="School Name" value={formData.education.higher_Edu.school_name} onChange={(e) => handleEduChange('higher_Edu', 'school_name', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-600 ml-1">Year</label>
                        <input className="border border-gray-400 rounded-xl h-10 pl-4 bg-[#f0f2f5]" placeholder="Year" value={formData.education.higher_Edu.year} onChange={(e) => handleEduChange('higher_Edu', 'year', e.target.value)} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-600 ml-1">Marks</label>
                        <input className="border border-gray-400 rounded-xl h-10 pl-4 bg-[#f0f2f5]" placeholder="Percentage" value={formData.education.higher_Edu.marks} onChange={(e) => handleEduChange('higher_Edu', 'marks', e.target.value)} />
                      </div>
                    </div>
                  </div>

                  {/* Secondary Section */}
                  <div className="p-5 rounded-3xl shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] border border-gray-300">
                    <h3 className="font-bold text-purple-600 mb-4 text-xs uppercase tracking-widest">Secondary Education (10th)</h3>
                    <div className="flex flex-col gap-1 mb-4">
                      <label className="text-xs font-bold text-gray-600 ml-1">School Name</label>
                      <input className="border border-gray-400 rounded-xl h-10 pl-4 bg-[#f0f2f5]" placeholder="School Name" value={formData.education.secondary_Edu.school_name} onChange={(e) => handleEduChange('secondary_Edu', 'school_name', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-600 ml-1">Year</label>
                        <input className="border border-gray-400 rounded-xl h-10 pl-4 bg-[#f0f2f5]" placeholder="Year" value={formData.education.secondary_Edu.year} onChange={(e) => handleEduChange('secondary_Edu', 'year', e.target.value)} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-600 ml-1">Marks</label>
                        <input className="border border-gray-400 rounded-xl h-10 pl-4 bg-[#f0f2f5]" placeholder="Percentage" value={formData.education.secondary_Edu.marks} onChange={(e) => handleEduChange('secondary_Edu', 'marks', e.target.value)} />
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button type="button" className="small-box-shadow gray text-gray-700 rounded-2xl px-8 py-3 font-bold border border-gray-400" onClick={prevStep}>Back</button>
                <button type="button" className="small-box-shadow purple text-white rounded-2xl px-8 py-3 font-bold shadow-md" onClick={nextStep}>Next</button>
              </div>
            </div>
          )}

          {/* STEP 4: PROJECTS (Full Schema) */}
          {step === 4 && (
            <div className="h-full w-full flex flex-col justify-between ">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-purple-700">Project Portfolio</h2>
                  <button 
                    type="button" 
                    onClick={addProject} 
                    className="text-purple-600 font-bold text-sm hover:scale-105 transition-transform"
                  >
                    + ADD PROJECT
                  </button>
                </div>
                
                <div className="space-y-6 max-h-[47vh] overflow-y-auto pr-4 custom-scrollbar">
                  {formData.projects.map((proj, idx) => (
                    <div key={idx} className="relative p-8 rounded-[30px] border border-gray-300 shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff] bg-white/10">
                      
                      {/* Remove Button */}
                      {formData.projects.length > 1 && (
                        <button 
                          type="button"
                          onClick={() => removeProject(idx)}
                          className="absolute top-4 right-6 text-red-500 font-bold text-xs hover:text-red-700"
                        >
                          REMOVE
                        </button>
                      )}

                      <div className="flex flex-col gap-1 mb-4">
                        <label className="text-xs font-bold text-gray-600 ml-1">Project Name</label>
                        <input className="border border-gray-400 rounded-xl h-10 pl-4 bg-[#f0f2f5] outline-none" placeholder="e.g., EnzoSkills Dashboard" value={proj.project_name} onChange={(e) => handleProjectChange(idx, 'project_name', e.target.value)} />
                      </div>

                      <div className="flex flex-col gap-1 mb-4">
                        <label className="text-xs font-bold text-gray-600 ml-1">Description</label>
                        <textarea className="border border-gray-400 rounded-xl p-4 h-15 bg-[#f0f2f5] outline-none resize-none" placeholder="What does this project do?" value={proj.description} onChange={(e) => handleProjectChange(idx, 'description', e.target.value)} />
                      </div>

                      <div className="flex flex-col gap-1 mb-4">
                        <label className="text-xs font-bold text-gray-600 ml-1">Tech Stack</label>
                        <input className="border border-gray-400 rounded-xl h-10 pl-4 bg-[#f0f2f5] outline-none" placeholder="React, Node.js, GSAP..." value={proj.project_tech} onChange={(e) => handleProjectChange(idx, 'project_tech', e.target.value)} />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                          <label className="text-xs font-bold text-gray-600 ml-1">Repo URL</label>
                          <input className="border border-gray-400 rounded-xl h-10 pl-4 bg-[#f0f2f5] outline-none" placeholder="GitHub Link" value={proj.project_repo} onChange={(e) => handleProjectChange(idx, 'project_repo', e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-xs font-bold text-gray-600 ml-1">Deployed Link</label>
                          <input className="border border-gray-400 rounded-xl h-10 pl-4 bg-[#f0f2f5] outline-none" placeholder="Live Demo" value={proj.deployed_link} onChange={(e) => handleProjectChange(idx, 'deployed_link', e.target.value)} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between mb-2">
                <button type="button" className="small-box-shadow gray text-gray-700 rounded-2xl px-8 py-3 font-bold border border-gray-400" onClick={prevStep}>Back</button>
                <button type="submit" className="small-box-shadow purple text-white rounded-2xl px-8 py-3 font-bold shadow-md" onClick={() => console.log("Final Data:", formData)}>Finish Profile</button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;