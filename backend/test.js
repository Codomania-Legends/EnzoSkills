const mongoose = require('mongoose');
const { Schema } = mongoose;

const CourseSchema = new Schema({
    course_id: String,
    roadmap: [{
        weekStart: { type: String },
        weekTitle: { type: String },
        levelNumber: { type: Number, required: true },
        topic: { type: String, required: true },
        achievement: { type: String }
    }]
});

const Course = mongoose.model('CourseTest7', CourseSchema);

async function run() {
    try {
        const doc = new Course({
            course_id: "test",
            roadmap: [
                {
                    "id": "W1",
                    "weekStart": "Week 1",
                    "weekTitle": "JavaScript & Modern ES6+ Foundations",
                    "levelNumber": 1,
                    // topic is missing
                    "achievement": "Build a strong JavaScript foundation for React and Node.js"
                }
            ]
        });
        const err = doc.validateSync();
        console.log("Validation error missing field:", err ? err.message : "None");
    } catch (e) {
        console.error(e);
    }
}
run();
