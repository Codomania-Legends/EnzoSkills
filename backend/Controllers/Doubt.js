const Doubt = require("../Models/Doubt");

// Get all doubts for a specific course
const get_Course_Doubts = async (req, res) => {
    try {
        const { courseId } = req.params;
        const doubts = await Doubt.find({ course_id: courseId }).sort({ createdAt: -1 });
        res.json({ success: true, doubts });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Create a new doubt
const create_Doubt = async (req, res) => {
    try {
        const { course_id, user_id, user_name, profile_img, doubt_title, doubt_text } = req.body;
        if (!course_id || !user_id || !doubt_title || !doubt_text) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const newDoubt = await Doubt.create({
            course_id,
            user_id,
            user_name,
            profile_img,
            doubt_title,
            doubt_text,
            replies: []
        });

        res.json({ success: true, doubt: newDoubt });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Reply to a doubt
const reply_To_Doubt = async (req, res) => {
    try {
        const { doubt_id, user_id, user_name, profile_img, reply_text } = req.body;
        if (!doubt_id || !user_id || !user_name || !reply_text) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const updatedDoubt = await Doubt.findByIdAndUpdate(
            doubt_id,
            {
                $push: {
                    replies: {
                        user_id,
                        user_name,
                        profile_img,
                        reply_text
                    }
                }
            },
            { new: true }
        );

        if (!updatedDoubt) {
            return res.status(404).json({ success: false, error: "Doubt not found" });
        }

        res.json({ success: true, doubt: updatedDoubt });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Delete a doubt
const delete_Doubt = async (req, res) => {
    try {
        const { doubtId } = req.params;
        const deleted = await Doubt.findByIdAndDelete(doubtId);
        if (!deleted) {
            return res.status(404).json({ success: false, error: "Doubt not found" });
        }
        res.json({ success: true, msg: "Doubt deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Edit a doubt's title and description
const edit_Doubt = async (req, res) => {
    try {
        const { doubt_id, doubt_title, doubt_text } = req.body;
        if (!doubt_id || !doubt_title || !doubt_text) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const updated = await Doubt.findByIdAndUpdate(
            doubt_id,
            { doubt_title, doubt_text },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ success: false, error: "Doubt not found" });
        }

        res.json({ success: true, doubt: updated });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    get_Course_Doubts,
    create_Doubt,
    reply_To_Doubt,
    delete_Doubt,
    edit_Doubt
};
