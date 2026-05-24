import React, { useRef, useState } from 'react';
import axios from 'axios';
import { sileo } from 'sileo';
import { useNavigate } from 'react-router';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import TitleAnimation from '../TitleAnimation';

function AddCourses() {
    const navigate = useNavigate();
    const containerRef = useRef();
    const [allDetails, setAllDetails] = useState({
        course_name: "",
        image: "",
        duration: "",
        price: "",
        rating: "",
        description: "",
        type: "",
        level: "",
        skills: "",
        features: "",
        badges: ""
    });

    const [loading, setLoading] = useState(false);

    useGSAP(() => {
        const tl = gsap.timeline();
        TitleAnimation(tl, "add-course-title");
    }, { scope: containerRef });

    const handleAddCourse = async () => {
        try {
            // Split comma-separated strings into arrays for schema
            const payload = {
                ...allDetails,
                skills: allDetails.skills.split(',').map(s => s.trim()).filter(Boolean),
                features: allDetails.features.split(',').map(s => s.trim()).filter(Boolean),
                badges: allDetails.badges.split(',').map(s => s.trim()).filter(Boolean),
            };

            const res = await axios.post("http://localhost:3000/courses/create", payload);

            if (res.data.error) throw new Error(res.data.error);

            const responseData = res.data;

            setAllDetails({
                course_name: "", image: "", duration: "", price: "", rating: "", description: "",
                type: "", level: "", skills: "", features: "", badges: ""
            });

            return responseData;

        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Server Error";
            throw new Error(errorMessage);
        }
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

            const file = await res.json();
            setAllDetails(prev => ({ ...prev, image: file.secure_url }));

        } catch (error) {
            console.error("Upload Error:", error);
        } finally {
            setLoading(false);
        }
    };

    // Fill Static Data for Testing
    const fillStaticData = () => {
        setAllDetails({
            course_name: "Mastering React & Node.js",
            image: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg", // Placeholder image
            duration: "8 Weeks",
            price: "49.99",
            rating: "4.8",
            description: "A comprehensive guide to building scalable full-stack applications using React, Node.js, Express, and MongoDB. Learn advanced state management, authentication, and deployment strategies.",
            type: "Paid",
            level: "Intermediate",
            skills: "React, Node.js, Express, MongoDB, Redux",
            features: "Lifetime Access, Certificate of Completion, Real-world Projects",
            badges: "Bestseller, Highest Rated"
        });
    };

    const inputClass = "border border-gray-400 rounded-2xl h-12 pl-5 bg-[#f0f2f5] outline-none shadow-[inset_4px_4px_8px_#b8b9be] w-full text-sm";

    return (
        <div ref={containerRef} className="container h-full mx-auto px-4 mt-5 flex flex-col items-center overflow-y-auto">
            <div className="flex justify-between items-center w-[90%] mb-5">
                <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate("/dashboard/courses")}>
                    <img src="/Dashboard/Courses/Back.svg" alt="Back" className="h-6 w-6" />
                    <h1 className="text-2xl font-bold add-course-title">Create Course</h1>
                </div>

                {/* Static Data Button */}
                <button
                    onClick={fillStaticData}
                    className="px-5 py-2 rounded-xl text-blue-700 font-bold small-box-shadow gray hover:bg-blue-100 transition-all active:scale-95"
                >
                    Fill Static Data 🧪
                </button>
            </div>

            <div className="w-[90%] bg-white rounded-3xl p-8 medium-box-shadow white flex flex-col gap-6 mb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-bold text-gray-600 ml-1">Course Name</label>
                        <input value={allDetails.course_name} onChange={(e) => setAllDetails({ ...allDetails, course_name: e.target.value })} type="text" placeholder="e.g. Advanced React" className={inputClass} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-bold text-gray-600 ml-1">Duration</label>
                        <input value={allDetails.duration} onChange={(e) => setAllDetails({ ...allDetails, duration: e.target.value })} type="text" placeholder="e.g. 3 Months" className={inputClass} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-bold text-gray-600 ml-1">Price</label>
                        <input value={allDetails.price} onChange={(e) => setAllDetails({ ...allDetails, price: e.target.value })} type="text" placeholder="e.g. $49.99 or Free" className={inputClass} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-bold text-gray-600 ml-1">Rating (1-5)</label>
                        <input value={allDetails.rating} onChange={(e) => {
                            let val = e.target.value; if (val > 5) val = 5; if (val < 1) val = 1; setAllDetails({ ...allDetails, rating: val })
                        }} type="number" min={1} max={5} step={0.1} placeholder="4.5" className={inputClass} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-bold text-gray-600 ml-1">Type</label>
                        <input value={allDetails.type} onChange={(e) => setAllDetails({ ...allDetails, type: e.target.value })} type="text" placeholder="Paid / Unpaid" className={inputClass} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-bold text-gray-600 ml-1">Level</label>
                        <input value={allDetails.level} onChange={(e) => setAllDetails({ ...allDetails, level: e.target.value })} type="text" placeholder="Beginner / Intermediate / Expert" className={inputClass} />
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-gray-600 ml-1">Skills (comma separated)</label>
                    <input value={allDetails.skills} onChange={(e) => setAllDetails({ ...allDetails, skills: e.target.value })} type="text" placeholder="React, Node, CSS" className={inputClass} />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-gray-600 ml-1">Features (comma separated)</label>
                    <input value={allDetails.features} onChange={(e) => setAllDetails({ ...allDetails, features: e.target.value })} type="text" placeholder="Certificate, Lifetime Access" className={inputClass} />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-gray-600 ml-1">Badges (comma separated)</label>
                    <input value={allDetails.badges} onChange={(e) => setAllDetails({ ...allDetails, badges: e.target.value })} type="text" placeholder="Bestseller, New" className={inputClass} />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-gray-600 ml-1">Description</label>
                    <textarea value={allDetails.description} onChange={(e) => setAllDetails({ ...allDetails, description: e.target.value })} placeholder="Detailed description of the course..." className={`${inputClass} h-32 pt-3 resize-none`} />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-gray-600 ml-1">Course Thumbnail</label>
                    <input type="file" onChange={handleImages} className="border border-gray-400 rounded-xl p-2 bg-[#f0f2f5] shadow-[inset_4px_4px_8px_#b8b9be] w-fit" />
                    {loading && <p className="text-sm text-blue-500 mt-2 font-bold">Uploading to Cloudinary... ☁️</p>}
                    {!loading && allDetails.image && <img src={allDetails.image} className="mt-4 w-48 h-32 object-cover rounded-xl shadow-md" alt="Preview" />}
                </div>

                <div className="flex justify-end gap-4 mt-6">
                    <button onClick={() => navigate("/dashboard/courses")} className="px-6 py-3 rounded-2xl font-bold text-gray-600 border border-gray-400 hover:bg-gray-100 transition-all">Cancel</button>
                    <button
                        onClick={async () => {
                            try {
                                const data = await sileo.promise(handleAddCourse(), {
                                    loading: "Adding Course...",
                                    success: (data) => ({ title: "Success!", description: `Course added successfully!` }),
                                    error: (err) => ({ title: "Error!", description: err?.message || "Something went wrong" })
                                });
                                // Navigate to detailed courses section using the backend generated ID
                                if (data && data.course && data.course.course_id) {
                                    navigate(`/dashboard/courses/overview/${data.course.course_id}`);
                                }
                            } catch (e) {
                                console.error(e);
                            }
                        }}
                        className="px-8 py-3 rounded-2xl font-bold text-white small-box-shadow purple"
                    >
                        Create Course
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddCourses;