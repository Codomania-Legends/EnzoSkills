import React, { useState } from 'react'
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";

function AddCourses() {
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'demo'
        }
    });

    const myImage = cld.image('sample');

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const handleImages = async (e) => {
        const files = e.target.files
        const data = new FormData()
        data.append("file", files[0])
        data.append("upload_preset", "EnzoSkills")

        setLoading(true)
        try {
            const res = await fetch( "https://api.cloudinary.com/v1_1/ddwk0yg4r/image/upload", {
                method: "POST",
                body: data
            })

            const file = await res.json()
            console.log(file)

            setImageUrl(file.secure_url)
            console.log("Upload Success:", file.secure_url)

        } catch (error) {
            console.log("Upload Error:", err)
        } finally {
            setLoading(false)
        }
        
    }
  return (
    <div>
        <div className="course-name">
            <input type="text" placeholder="Course Name" className='small-box-shadow' />
        </div>
        <div className="course-image">
            <input type="file" onChange={handleImages} className='small-box-shadow' />
            {loading ? <p>Uploading...</p> : <img src={imageUrl} width="300px" />}
        </div>
        <div className="course-duration">
            <input type="text" placeholder="Course Duration" className='small-box-shadow' />
        </div>
        <div className="course-price">
            <input type="text" placeholder="Course Price" className='small-box-shadow' />
        </div>
        <div className="course-rating">
            <input type="text" placeholder="Course Rating" className='small-box-shadow' />
        </div>
        <div className="course-description">
            <input type="text" placeholder="Course Description" className='small-box-shadow' />
        </div>
        <button className='small-box-shadow'>Add Course</button>
    </div>
  )
}

export default AddCourses