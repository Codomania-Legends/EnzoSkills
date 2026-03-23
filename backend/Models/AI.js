const mongoose = require("mongoose")
const {Schema, model} = require("mongoose")

const AISchema = new Schema({
    user_id : Number,
    chats : String
})

const AI = model( "/ai", AISchema )

module.exports = AI