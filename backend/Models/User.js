const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const EducationSchema = new Schema({
    secondary_Edu: {
        school_name: String,
        year: Number,
        marks: Number   
    },
    higher_Edu: {
        school_name: String,
        year: Number,
        marks: Number   
    },
    degree: {
        clg_name: String,
        duration: Number,
        year: Number,
        marks: Number   
    }
});

const ProjectSchema = new Schema({
    project_id: Number,
    project_name: String,
    project_img : String,
    description: String,
    project_tech : String,
    project_repo: String,
    deployed_link: String,
    project_status : String,
});

const UserSchema = new Schema({
    user_id: String,
    user_name: String,
    password : String,
    image: {type : String, default : ''},
    designation: {type : String, default : ''},
    email: { type: String, unique: true }, 
    phone_num: {type : Number, default : 0},
    user_post: String,
    skills_occupied: [{
        skills: String
    }],
    experience: {type : Number, default : 0},
    education: [EducationSchema],
    projects: [ProjectSchema]
});

const USER = model("User", UserSchema);

module.exports = USER;