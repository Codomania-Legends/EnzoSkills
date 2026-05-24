const HISTORY = require("../Models/History");

// Add a new history log
const add_History = async (req, res) => {
    try {
        const { user_id, action_title, action_description } = req.body;

        if (!user_id || !action_title || !action_description) {
            return res.status(400).json({ msg: "user_id, action_title, and action_description are required" });
        }

        const newLog = await HISTORY.create({
            user_id,
            action_title,
            action_description
        });

        res.status(201).json({ msg: "History log created", log: newLog });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get history logs for a specific user
const get_History = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ msg: "User ID is required" });
        }

        // Fetch logs sorted by newest first
        const logs = await HISTORY.find({ user_id: userId }).sort({ timestamp: -1 });

        res.status(200).json({ msg: "History fetched", logs });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    add_History,
    get_History
};
