const RECORDS = require("../Models/Records")

const COURSES = require("../Models/Courses");

const handle_Records_Section = async (req, res) => {
    try {
        const { course_id, ...recordData } = req.body;

        // Find the course and push the new record into its records array
        const updatedCourse = await RECORDS.findOneAndUpdate(
            { course_id: course_id },
            { $push: { records: recordData } }, 
            { new: true, runValidators: true }
        );

        if (!updatedCourse) {
            return res.status(404).json({ error: "Course ID not found. Cannot link records." });
        }

        res.status(200).json({
            msg: "Record linked to course successfully",
            course: updatedCourse
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    handle_Records_Section
}