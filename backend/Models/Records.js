const { Schema, model } = require("mongoose");

const RecordsSchema = new Schema({
    user_id: { type: String, required: true, index: true },
    course_id: { type: String, required: true },
    course_name: { type: String, default: "Course" },
    day: { type: String, default: "Day 1" },
    day_num: { type: Number, default: 1 },
    topic_title: { type: String, default: "" },
    tasks: { type: String, default: "5/5 Tasks" },
    badge: { type: String, default: "Silver" },
    badgeImage: { type: String, default: "/Records/silver.png" },
    score: { type: Number, default: 100 },
    rating: { type: Number, default: 5.0 },
    review: { type: String, default: "Completed curriculum milestone" },
    completed_at: { type: Date, default: Date.now },
    reviews: [{
        user_id: String,
        user_name: String,
        rating: String,
        feedback: String,
    }]
}, { timestamps: true });

const RECORDS = model("records", RecordsSchema);

module.exports = RECORDS;
