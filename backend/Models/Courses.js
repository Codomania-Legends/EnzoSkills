const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    course_id: { type: String, required: true, unique: true },
    image: String,
    course_name: { type: String, required: true },
    duration: String,
    price: String,
    level: String,
    type: String,
    rating: { type: Number, default: 0 }, // Changed to Number for easier sorting/filtering
    roadmap: [{
        id: { type: String, required: true },
        weekStart: { type: String },
        weekTitle: { type: String },
        levelNumber: { type: Number, required: true },
        topic: { type: String, required: true },
        achievement: { type: String }
    }],
    reviews: [{
        user_id: { type: String, required: true }, // Changed to String to match typical Auth IDs
        user_name: String,
        rating: Number,
        feedback: String,
    }],
    description: String,
    features: [{ type: String, default: '' }],
    skills: [{ type: String, default: '' }],
    badges: [{ type: String, default: '' }],
    user_enrolled: [{
        user_id: { type: String, required: true },
        enrolled_at: { type: Date, default: Date.now } // Useful for tracking
    }],

    //Materials
    daywise_material: [{
        topics: String,
        title: String,
        day: Number,
        material: [{
            heading: String,
            learning_para: String,
        }]

    }],
});

const COURSES = mongoose.model("Courses", CourseSchema);

module.exports = COURSES;