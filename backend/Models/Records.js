const mongoose = require("mongoose")
const {Schema, model} = require("mongoose")

const RecordsSchema = new Schema({
    course_id : String,
    course_name : String,
    day_num : Number,
    task_num : String,
    rating: String,
    reviews : [{
        user_id : String,
        user_name : String,
        rating : String,
        feedback : String,
    }],
    badge : String,
    score : Number
})

const RECORDS = model( "/records", RecordsSchema )

module.exports = RECORDS