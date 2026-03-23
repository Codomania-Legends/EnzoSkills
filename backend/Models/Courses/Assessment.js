const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const QuestionSchema = new Schema({
    question_num: Number,
    question: String,
    answer: String,
    options: [String]
});

const AssessmentSchema = new Schema({
    course_id: Number,
    course_name: String,
    duration: String,
    assessment_id: Number,
    weekwise_material: [{
        week: Number,
        material_id: Number,
        day: String,
        question_n_answer: [QuestionSchema] 
    }],
    final_material: [QuestionSchema]
});

const ASSESSMENT = model("Assessment", AssessmentSchema);

module.exports = ASSESSMENT;