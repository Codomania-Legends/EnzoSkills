const mongoose = require("mongoose")

const COURSES = mongoose.model("Courses", new mongoose.Schema({
    course_id : Number,
    image: String,
    course_name: String,
    duration: String,
    price: Number,
    rating: String,
    reviews : [{
        user_id : Number,
        user_name : String,
        rating : String,
        feedback : String,
    }],
    description: String,
    badges : String,
    features : String,
    skills : String, 
    user_enrolled : {
        type : [ 
            new mongoose.Schema({
                user_id : Number
            })
        ],
        default : undefined
    },
}))

module.exports = COURSES