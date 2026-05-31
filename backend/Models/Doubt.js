const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ReplySchema = new Schema({
    user_id: { type: String, required: true },
    user_name: { type: String, required: true },
    profile_img: { type: String, default: '' },
    reply_text: { type: String, required: true }
}, { timestamps: true });

const DoubtSchema = new Schema({
    course_id: { type: String, required: true },
    user_id: { type: String, required: true },
    user_name: { type: String, required: true },
    profile_img: { type: String, default: '' },
    doubt_title: { type: String, required: true },
    doubt_text: { type: String, required: true },
    replies: [ReplySchema]
}, { timestamps: true });

const Doubt = model("Doubt", DoubtSchema);
module.exports = Doubt;
