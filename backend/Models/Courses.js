const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    course_id: { type: String, required: true, unique: true },
    image: String,
    course_name: { type: String, required: true },
    duration: String,
    price: Number,
    rating: { type: Number, default: 0 }, // Changed to Number for easier sorting/filtering
    reviews: [{
        user_id: { type: String, required: true }, // Changed to String to match typical Auth IDs
        user_name: String,
        rating: Number,
        feedback: String,
    }],
    description: String,
    badges: { type: String, default: '' },
    features: { type: String, default: '' },
    skills: { type: String, default: '' }, 
    user_enrolled: [{
        user_id: { type: String, required: true },
        enrolled_at: { type: Date, default: Date.now } // Useful for tracking
    }] ,

    //Materials
    daywise_material : [{
        topics : String,
        title : String,
        day : Number,
        material : [{
            heading : String,
            learning_para : String,
        }]

    }],

    //Assesment 
    weekwise_assessment: [{
        week: Number,
        day: String,
        question_n_answer: [{
            question_num: Number,
            question: String,
            answer: String,
            options: [String]
        }] 
    }],
    final_assessment: [{
        question_num: Number,
        question: String,
        answer: String,
        options: [String]
    }]
});

const COURSES = mongoose.model("Courses", CourseSchema);

module.exports = COURSES;