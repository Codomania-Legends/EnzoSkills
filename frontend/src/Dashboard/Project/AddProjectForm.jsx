import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { sileo } from 'sileo';
import { useUser } from '../../Utility/UserDetails';

// Added setShowForm to props so the back button can close the form overlay
function AddProjectForm({ showForm, setShowForm, projectToEdit, setProjectToEdit }) {
  const formRef = useRef(null);
  const { setUserDetails } = useUser();
  const [projectImage, setProjectImage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // gsap animations removed
  }, [showForm]);

  const [formData, setFormData] = useState({
    projectName: '',
    projectRepoLink: '',
    projectStatus: '',
    projectDescription: '',
    projectTechStacks: ''
  });

  useEffect(() => {
    if (projectToEdit) {
      setFormData({
        projectName: projectToEdit.project_name || '',
        projectRepoLink: projectToEdit.project_repo || '',
        projectStatus: projectToEdit.deployed_link || '',
        projectDescription: projectToEdit.description || '',
        projectTechStacks: projectToEdit.project_tech || ''
      });
      setProjectImage(projectToEdit.project_image || '');
    } else {
      setFormData({
        projectName: '',
        projectRepoLink: '',
        projectStatus: '',
        projectDescription: '',
        projectTechStacks: ''
      });
      setProjectImage('');
    }
  }, [projectToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImages = async (e) => {
    const files = e.target.files;
    if (!files[0]) return;

    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "EnzoSkills");

    setLoading(true);
    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/ddwk0yg4r/image/upload", {
        method: "POST",
        body: data
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error?.message || "Failed to upload image");
      }
      const file = await res.json();
      setProjectImage(file.secure_url);
      sileo.success("Project image uploaded successfully! 📷");
    } catch (error) {
      console.error("Upload Error:", error);
      sileo.error("Upload failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = Cookies.get("user_id");
    if (!userId) {
      sileo.error("User ID not found. Please log in again.");
      return;
    }

    if (!formData.projectName) {
      sileo.error("Project Name is required.");
      return;
    }

    const isEditMode = !!projectToEdit;
    const url = isEditMode
      ? "http://localhost:3000/user/editproject"
      : "http://localhost:3000/user/updateproject";

    const payload = {
      user_id: userId,
      project_name: formData.projectName,
      project_repo: formData.projectRepoLink,
      deployed_link: formData.projectStatus,
      description: formData.projectDescription,
      project_tech: formData.projectTechStacks,
      project_image: projectImage
    };

    if (isEditMode) {
      payload.project_id = projectToEdit._id;
    }

    try {
      const res = await axios.patch(url, payload);
      sileo.success(isEditMode ? "Project updated successfully! 🎉" : "Project added successfully! 🎉");
      
      setUserDetails((prev) => {
        let updatedProjects;
        if (isEditMode) {
          updatedProjects = (prev.projects || []).map((p) =>
            p._id === projectToEdit._id
              ? { ...p, ...payload, _id: p._id }
              : p
          );
        } else {
          updatedProjects = res.data.projects || [
            ...(prev.projects || []),
            {
              ...payload,
              _id: res.data.projects ? res.data.projects[res.data.projects.length - 1]?._id : undefined
            }
          ];
        }

        return {
          ...prev,
          projects: updatedProjects
        };
      });

      setFormData({
        projectName: '',
        projectRepoLink: '',
        projectStatus: '',
        projectDescription: '',
        projectTechStacks: ''
      });
      setProjectImage('');
      if (setProjectToEdit) setProjectToEdit(null);
      setShowForm(false);
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || "Failed to save project";
      sileo.error("Failed to save project: " + errorMessage);
    }
  };

  if (!showForm) return null;

  return (
    <div
      ref={formRef}
      className="absolute bottom-0 right-0 w-full max-sm:w-full md:w-[40%] h-full formBGColor medium-box-shadow overflow-y-auto p-4 sm:p-8 flex justify-center items-start box-border mb-2 z-50 rounded-3xl">
      
      <form
        onSubmit={handleSubmit}
        className="w-full h-[90%] max-w-xl flex flex-col gap-4 text-left">
        
        
        {/* Heading Wrapper Section:
           - Wrapped the button and h1 in a flex container.
           - Uses items-center and a gap to keep them cleanly aligned inline.
          */}
        <div className="flex items-center gap-3 mb-2">
          <img
            src="/Dashboard/Courses/Back.svg"
            alt="Back"
            className="h-4 w-4 cursor-pointer hover:scale-110 transition-transform"
            onClick={() => setShowForm && setShowForm(false)} />
          
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
            {projectToEdit ? "Update Project ✎" : "Add You Projects +"}
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
            className="w-full h-12 rounded-2xl border-none outline-none px-5 text-sm font-medium text-white placeholder-gray-300 small-box-shadow formInputColor" />
          
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
            className="w-full h-12 rounded-2xl border-none outline-none px-5 text-sm font-medium text-white placeholder-gray-300 small-box-shadow formInputColor" />
          
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
            className="w-full h-12 rounded-2xl border-none outline-none px-5 text-sm font-medium text-white placeholder-gray-300 small-box-shadow formInputColor" />
          
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
            className="w-full h-12 rounded-2xl border-none outline-none px-5 text-sm font-medium text-white placeholder-gray-300 small-box-shadow formInputColor" />
          
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
            className="w-full rounded-2xl border-none outline-none p-5 text-sm font-medium text-white placeholder-gray-300 small-box-shadow formInputColor resize-none" />
          
        </div>

        {/* Input Field: Project Image */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-base font-bold text-gray-900 pl-1">Project Image :</label>
          <input
            type="file"
            onChange={handleImages}
            className="w-full h-12 rounded-2xl border-none outline-none px-5 py-2 text-sm font-medium text-white placeholder-gray-300 small-box-shadow formInputColor file:mr-4 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-white/25 file:text-white hover:file:bg-white/40 cursor-pointer" />
          {loading && <p className="text-xs text-blue-600 font-bold mt-1">Uploading image... ☁️</p>}
          {!loading && projectImage && (
            <div className="flex items-center gap-4 mt-2">
              <img src={projectImage} alt="Project Preview" className="w-16 h-12 rounded-lg object-cover border border-purple-500" />
              <p className="text-xs text-green-600 font-bold">Uploaded successfully! ✅</p>
            </div>
          )}
        </div>

        {/* Action Button Segment */}
        <div className="w-full flex justify-center gap-4 mt-4">
          <button
            type="submit"
            disabled={loading}
            className={`px-10 py-3 rounded-xl font-bold text-white mb-10 small-box-shadow transition-transform active:scale-95 cursor-pointer text-center formInputColor ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
            
            {loading ? "Uploading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>);

}

export default AddProjectForm;