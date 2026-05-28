const mongoose = require("mongoose");

const AssessmentSchema = new mongoose.Schema({
    assessment_id: { type: String, required: true, unique: true },
    course_id: { type: String, required: true },
    week: { type: String, required: true },
    day: { type: String, required: true },
    assessment_name: { type: String, required: true },
    assessment_type: { type: String, required: true },
    assessment_duration: { type: String, required: true },
    assessment_total_marks: { type: String, required: true },
    assessment_pass_marks: { type: String, required: true },
    assessment_questions: [{
        // Changed from question_id to id to match the AI's output
        id: {
            type: String,
            required: true
        },
        question: {
            type: String,
            required: true
        },
        answer: {
            type: String,
            required: true
        },
        // Changed to an Array of Strings to hold the 4 multiple choice options
        options: [{
            type: String,
            required: true
        }]
    }],
    assessment_reviews: [{
        user_id: { type: String, required: true },
        user_name: { type: String },
        rating: { type: String },
        feedback: { type: String },
    }],
});

const ASSESSMENTS = mongoose.model("Assessments", AssessmentSchema);

module.exports = ASSESSMENTS;   