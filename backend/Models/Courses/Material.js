const mongoose = require("mongoose")
const {Schema, model} = require("mongoose")

const MATERIAL = model( "/material", new Schema({
    course_id : Number,
    course_name : String,
    duration : String,
    daywise_material : [{
        topics : String,
        title : String,
        material : [{
            heading : String,
            learning_para : String,
        }]

    }]
}) )

module.exports = MATERIAL