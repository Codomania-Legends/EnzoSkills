const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    user_id: { type: String, required: true, unique: true },
    user_name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true, lowercase: true },
    image: { type: String, default: '' },
    designation: { type: String, default: '' },
    phone_num: { type: String, default: '' },
    user_post: String,
    skills_occupied: [{ skills: String }],
    experience: { type: String, default: '' },
    education: {
        secondary_Edu: { school_name: String, year: String, marks: String },
        higher_Edu: { school_name: String, year: String, marks: String },
        degree: { clg_name: String, duration: String, year: String, marks: String }
    },
    projects: [{
        project_name: String,
        description: String,
        project_tech: String,
        project_repo: String,
        deployed_link: String
    }],
    badges: [{ type: String }],
    awards: [{ type: String }],
    streak: { type: Number, default: 0 },

    // --- Learning & Assessment Progress ---
    courses: [
        {
            course_id: String,
            progress_status: String,
            week_completed: Number,
            topics_completed: Number,
            subtopics_completed: Number,
            progress_percentage: Number
        }
    ],
    assessments: [
        {
            assessment_id: String,
            status: String,
            completed_at: String,
            score: String
        }],
    // --------------------------------------


}, { timestamps: true });

const USER = model("User", UserSchema)

module.exports = USER