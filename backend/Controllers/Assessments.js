const ASSESSMENTS = require("../Models/Assessments");
const { nanoid } = require("nanoid")

exports.createAssessment = async (req, res) => {
    try {
        // 1. FIRST: Check and fix the data type BEFORE doing anything else! 🚨
        if (typeof req.body.assessment_questions === 'string') {
            try {
                req.body.assessment_questions = JSON.parse(req.body.assessment_questions);
            } catch (err) {
                return res.status(400).json({ message: "Invalid JSON format in assessment_questions" });
            }
        }

        // Add these logs to verify it worked (should print 'object' and 'true' now!) 🔍
        console.log("What is the exact data type? ->", typeof req.body.assessment_questions);
        console.log("Is it a real JavaScript Array? ->", Array.isArray(req.body.assessment_questions));

        // 2. SECOND: Now extract the variables (assessment_questions is safely an array now!) 📦
        const {
            course_id,
            week,
            day,
            assessment_name,
            assessment_type,
            assessment_duration,
            assessment_total_marks,
            assessment_pass_marks,
            assessment_questions,
            assessment_reviews } = req.body;

        const assessment_id = nanoid(10);

        // 3. THIRD: Create the document with the clean array ✅
        let assessment = new ASSESSMENTS({
            assessment_id,
            course_id,
            week,
            day,
            assessment_name,
            assessment_type,
            assessment_duration,
            assessment_total_marks,
            assessment_pass_marks,
            assessment_questions, // This is now guaranteed to be an Array!
            assessment_reviews
        });

        console.log(assessment.assessment_questions)

        await assessment.save();
        res.status(201).json({ message: "Assessment created successfully" });

    } catch (error) {
        console.error("Save Error:", error);
        res.status(500).json({ message: "Error creating assessment", error: error.message });
    }
};

exports.getAssessment = async (req, res) => {
    try {
        const assessment = await ASSESSMENTS.find();
        res.status(200).json(assessment);
    } catch (error) {
        res.status(500).json({ message: "Error getting assessment" });
    }
};

exports.getSpecificAssessment = async (req, res) => {
    try {
        const { assessment_id } = req.params;
        const assessment = await ASSESSMENTS.findOne({ assessment_id });
        res.status(200).json(assessment);
    } catch (error) {
        res.status(500).json({ message: "Error getting specific assessment" });
    }
}
