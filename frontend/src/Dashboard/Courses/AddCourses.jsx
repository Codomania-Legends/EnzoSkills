import React, { useState } from 'react';
import axios from 'axios';
import { sileo } from 'sileo';

function AddCourses() {
    const [allDetails, setAllDetails] = useState({
        course_name: "",
        image: "",
        duration: "",
        price: "",
        rating: "",
        description: ""
    });

    const [loading, setLoading] = useState(false);

    const handleAddCourse = async () => {
    try {
        const res = await axios.post("http://localhost:3000/courses/create", allDetails);
        
        // If your backend sends back a specific error field in a 200 response
        if (res.data.error) throw new Error(res.data.error);

        // Capture the data we need for the toast BEFORE clearing state
        const responseData = res.data;

        setAllDetails({
            course_name: "",
            image: "",
            duration: "",
            price: "",
            rating: "",
            description: ""
        });

        return responseData; 
        
    } catch (error) {
        // Axios stores the server's error message in error.response.data
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

    return (
        <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <input 
                value={allDetails.course_name} 
                onChange={(e) => setAllDetails({...allDetails, course_name: e.target.value})} 
                type="text" placeholder="Course Name" 
                className='small-box-shadow' 
            />

            <input 
                value={allDetails.duration} 
                onChange={(e) => setAllDetails({...allDetails, duration: e.target.value})} 
                type="text" placeholder="Course Duration" 
                className='small-box-shadow' 
            />
            
            <input 
                value={allDetails.price} 
                onChange={(e) => setAllDetails({...allDetails, price: e.target.value})} 
                type="text" placeholder="Course Price" 
                className='small-box-shadow' 
            />

            <input 
                value={allDetails.rating} 
                onChange={(e) => {
                    const val = e.target.value;
                    if (val > 5) val = 5;
                    if (val < 1) val = 1;
                    setAllDetails({...allDetails, rating: val})}} 
                type="number" min={1} max={5} step={0.1} placeholder="Course Rating" 
                className='small-box-shadow' 
            />

            <input 
                value={allDetails.type} 
                onChange={(e) => setAllDetails({...allDetails, type: e.target.value})} 
                type="text" placeholder="Course Type" 
                className='small-box-shadow' 
            />

            <input 
                value={allDetails.level} 
                onChange={(e) => setAllDetails({...allDetails, level: e.target.value})} 
                type="text" placeholder="Course Level" 
                className='small-box-shadow' 
            />

            <input 
                value={allDetails.skills} 
                onChange={(e) => setAllDetails({...allDetails, skills: e.target.value})} 
                type="text" placeholder="Course Skills" 
                className='small-box-shadow' 
            />

            <input 
                value={allDetails.features} 
                onChange={(e) => setAllDetails({...allDetails, features: e.target.value})} 
                type="text" placeholder="Course Features" 
                className='small-box-shadow' 
            />

            <input 
                value={allDetails.badges} 
                onChange={(e) => setAllDetails({...allDetails, badges: e.target.value})} 
                type="text" placeholder="Course Badges" 
                className='small-box-shadow' 
            />

            <textarea 
                value={allDetails.description} 
                onChange={(e) => setAllDetails({...allDetails, description: e.target.value})} 
                placeholder="Course Description" 
                className='small-box-shadow' 
            />


            <div className="course-image">
                <input type="file" onChange={handleImages} className='small-box-shadow' />
                {loading ? <p>Uploading...</p> : allDetails.image && <img src={allDetails.image} width="300px" alt="Preview" />}
            </div>

            <button 
                onClick={() => sileo.promise(handleAddCourse(), {
                    loading: "Adding Course...",
                    success: (data) => ({
                        title: "Success!",
                        description: `Course ${data.course_name || ''} added successfully!`
                    }),
                    error: (err) => {console.log(err); return({
                        title: "Error!",
                        description: err?.message || "Something went wrong"
                    })}
                })} 
                className='small-box-shadow'
            >
                Add Course
            </button>
            <button 
                onClick={() => navigate("/addmaterial")} 
                className='small-box-shadow'
            >
                Add Material for course
            </button>
        </div>
    );
}

export default AddCourses;