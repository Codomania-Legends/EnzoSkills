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
        deployed_link: String,
        project_image: String
    }],
    badges: [{ type: String }],
    awards: [{ type: String }],
    streak: { type: Number, default: 0 },

    // --- Learning & Assessment Progress ---
    courses: [
        {
            course_id: String,
            course_name: String,
            progress_status: { type: String, default: 'In Progress' },
            week_completed: { type: Number, default: 0 },
            topics_completed: { type: Number, default: 0 },
            subtopics_completed: { type: Number, default: 0 },
            progress_percentage: { type: Number, default: 0 },
            completed_days: [{ type: Number }],
            last_activity: { type: Date, default: Date.now }
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