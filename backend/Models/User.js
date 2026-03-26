const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    user_id: { type: String, required: true, unique: true },
    user_name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true, lowercase: true }, 
    image: { type: String, default: '' },
    designation: { type: String, default: '' },
    phone_num: { type: Number, default: 0 },
    user_post: String,
    skills_occupied: [{ skills: String }],
    experience: { type: Number, default: 0 },
    education: {
        secondary_Edu: { school_name: String, year: Number, marks: Number },
        higher_Edu: { school_name: String, year: Number, marks: Number },
        degree: { clg_name: String, duration: Number, year: Number, marks: Number }
    },
    projects: [{
        project_name: String,
        description: String,
        project_tech: String,
        project_repo: String,
        deployed_link: String
    }]
}, { timestamps: true });

module.exports = model("User", UserSchema);