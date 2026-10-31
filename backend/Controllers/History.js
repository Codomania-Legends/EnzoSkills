const HISTORY = require("../Models/History");
const USER = require("../Models/User");

// Add a new history log
const add_History = async (req, res) => {
    try {
        const { user_id, action_type, action_title, action_description } = req.body;

        if (!user_id || !action_title || !action_description) {
            return res.status(400).json({ msg: "user_id, action_title, and action_description are required" });
        }

        const newLog = await HISTORY.create({
            user_id,
            action_type: action_type || "OTHER",
            action_title,
            action_description,
            timestamp: new Date()
        });

        res.status(201).json({ msg: "History log created", log: newLog });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Seed initial history logs for a user if they don't have any yet
const seedUserHistoryIfEmpty = async (userId) => {
    try {
        const count = await HISTORY.countDocuments({ user_id: userId });
        if (count === 0) {
            const user = await USER.findOne({ user_id: userId });
            const userName = user?.user_name || "Student";
            const now = Date.now();

            const initialLogs = [
                {
                    user_id: userId,
                    action_type: "COURSE_ENROLL",
                    action_title: "Enrolled in Course",
                    action_description: "Enrolled in Advanced CSS & Tailwind curriculum.",
                    timestamp: new Date(now - 1000 * 60 * 60 * 24 * 2) // 2 days ago
                },
                {
                    user_id: userId,
                    action_type: "LESSON_LEARN",
                    action_title: "Curriculum Lesson Completed",
                    action_description: "Completed Day 1: Flexbox & Responsive Layouts.",
                    timestamp: new Date(now - 1000 * 60 * 60 * 24) // 1 day ago
                },
                {
                    user_id: userId,
                    action_type: "OTHER",
                    action_title: "Account Created",
                    action_description: `Welcome to EnzoSkills, ${userName}! Your account was successfully initialized.`,
                    timestamp: new Date(now - 1000 * 60 * 60 * 24 * 3) // 3 days ago
                }
            ];

            await HISTORY.insertMany(initialLogs);
        }
    } catch (err) {
        console.error("Error seeding initial history:", err.message);
    }
};

// Get history logs for a specific user
const get_History = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ msg: "User ID is required" });
        }

        // Seed initial starter logs if none exist for this user
        await seedUserHistoryIfEmpty(userId);

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
