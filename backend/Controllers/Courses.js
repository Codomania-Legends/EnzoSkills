const COURSES = require("../Models/Courses/Courses")

const handle_Course_Section = async ( req, res ) => {
    try {
        if( !req.body ) throw( new Error("Body not found") )
        const { image, course_name, duration, price, rating, description } = req.body
        const course_id = nanoid(10)
        if( await COURSES.findOne({course_name}) ) throw( new Error("Course Already Exists") )
        const newCourse = await COURSES.create({
            course_id : course_id,
            image : image,
            course_name : course_name,
            duration : duration,
            price : price,
            rating : rating,
            description : description
        })
        if( !newCourse ) throw( new Error("Internal Error") )
        res.json({
            msg : "Course Created Successfully",
            user : newCourse
        })
    } catch (error) {
        res.end(error.message)
    }

}

module.exports = {
    handle_Course_Section
}