const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const HistorySchema = new Schema({
    user_id: { type: String, required: true },
    action_title: { type: String, required: true },
    action_description: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = model("History", HistorySchema);
