import React from 'react'

function AddMaterial() {
    const handleAddCourse = async () => {
        try {
            const res = await axios.post( "http://localhost:3000/courses/create", allDetails );

            // If your backend sends back a specific error field in a 200 response
            if ( res.data.error ) throw new Error( res.data.error );

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
            
        } catch ( error ) {
            
            // Axios stores the server's error message in error.response.data
            const errorMessage = error.response?.data?.message || error.message || "Server Error";
            throw new Error( errorMessage );
        }
    };
    return (
        <div>
            <button 
                onClick={
                    () => sileo.promise(handleAddCourse(), {
                        loading: "Adding Course...",
                        success: (data) => ({
                            title: "Success!",
                            description: `Course ${data.course_name || ''} added successfully!`
                        }),
                        error: (err) => {console.log(err); return({
                            title: "Error!",
                            description: err?.message || "Something went wrong"
                        })}
                    })
                } 
                className='small-box-shadow'>
                Add Material
            </button>
        </div>
    )
}

export default AddMaterial