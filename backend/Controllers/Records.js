const RECORDS = require("../Models/Records");
const USER = require("../Models/User");
const COURSES = require("../Models/Courses");
const HISTORY = require("../Models/History");

const defaultTopics = {
    1: "HTML5 Semantics & Project Architecture",
    2: "CSS Box Model & Core Fundamentals",
    3: "Flexbox Layouts & Responsive Navbars",
    4: "CSS Grid Systems & Two-Dimensional Layouts",
    5: "Tailwind CSS Architecture & Utility Patterns",
    6: "Responsive Breakpoints & Mobile Optimization",
    7: "Modern Transitions & Micro-Animations",
    8: "Component-Driven Styling & Modularity",
    9: "Advanced Pseudo-Classes & Modern Selectors",
    10: "Performance Optimization & Production Build"
};

// Clean up any legacy dummy records from the database
const cleanupDummyRecords = async (userId) => {
    try {
        const dummyReviews = [
            "Great grasp of Flexbox & Grid layouts",
            "Solid understanding of responsive breakpoints",
            "Excellent execution of hooks and custom state",
            "Strong mastery of middleware and REST principles",
            "Good progress on context API architecture",
            "Good schema modeling and document validation",
            "Clean aggregation pipelines and indexing",
            "Comprehensive problem solving and test execution"
        ];
        await RECORDS.deleteMany({
            user_id: userId,
            review: { $in: dummyReviews }
        });
    } catch (err) {
        console.error("Error cleaning up dummy records:", err.message);
    }
};

// Sync real course progress and assessments into the RECORDS collection
const syncRealUserDataToRecords = async (userId) => {
    try {
        const user = await USER.findOne({ user_id: userId });
        if (!user) return;

        // 1. Sync real completed curriculum days
        if (Array.isArray(user.courses)) {
            for (const c of user.courses) {
                const cId = String(c.course_id);
                const foundCourse = await COURSES.findOne({ course_id: cId });
                const courseName = c.course_name || foundCourse?.course_name || "Course " + cId;
                const completedDate = c.last_activity || user.updatedAt || new Date();

                if (Array.isArray(c.completed_days) && c.completed_days.length > 0) {
                    for (const dayNum of c.completed_days) {
                        const matchedMaterial = (foundCourse?.daywise_material || []).find(m => Number(m.day) === Number(dayNum));
                        const matchedRoadmap = (foundCourse?.roadmap || []).find(r => Number(r.levelNumber) === Number(dayNum));
                        const topicTitle = matchedMaterial?.title || matchedRoadmap?.topic || defaultTopics[dayNum] || `Day ${dayNum} Lesson`;
                        
                        const badgeType = dayNum % 5 === 0 ? "Gold" : dayNum % 2 === 0 ? "Silver" : "Bronze";

                        await RECORDS.findOneAndUpdate(
                            { user_id: userId, course_id: cId, day_num: dayNum },
                            {
                                $set: {
                                    user_id: userId,
                                    course_id: cId,
                                    course_name: courseName,
                                    day: `Day ${dayNum}`,
                                    day_num: dayNum,
                                    topic_title: topicTitle,
                                    tasks: "5/5 Tasks",
                                    badge: badgeType,
                                    badgeImage: `/Records/${badgeType.toLowerCase()}.png`,
                                    score: 100,
                                    rating: 5.0,
                                    review: `Mastered ${topicTitle}. Solved all practical exercises and verified code behavior.`,
                                    completed_at: completedDate
                                }
                            },
                            { upsert: true, new: true }
                        );
                    }
                } else if (c.progress_percentage > 0) {
                    const p = c.progress_percentage;
                    const badgeType = p >= 80 ? "Gold" : p >= 50 ? "Silver" : "Bronze";
                    await RECORDS.findOneAndUpdate(
                        { user_id: userId, course_id: cId, day_num: 1 },
                        {
                            $set: {
                                user_id: userId,
                                course_id: cId,
                                course_name: courseName,
                                day: "Day 1",
                                day_num: 1,
                                topic_title: "Curriculum Foundation Milestone",
                                tasks: `${c.topics_completed || 1} Topics Completed`,
                                badge: badgeType,
                                badgeImage: `/Records/${badgeType.toLowerCase()}.png`,
                                score: p,
                                rating: Number((p / 20).toFixed(1)),
                                review: `Reached ${p}% course completion in ${courseName}.`,
                                completed_at: completedDate
                            }
                        },
                        { upsert: true, new: true }
                    );
                }
            }
        }

        // 2. Sync real assessment submissions
        if (Array.isArray(user.assessments)) {
            for (const ass of user.assessments) {
                const numericScore = Number(ass.score) || 80;
                const badgeType = numericScore >= 80 ? "Gold" : numericScore >= 60 ? "Silver" : "Bronze";
                const assDate = ass.completed_at ? new Date(ass.completed_at) : new Date();

                await RECORDS.findOneAndUpdate(
                    { user_id: userId, course_id: String(ass.assessment_id) },
                    {
                        $set: {
                            user_id: userId,
                            course_id: String(ass.assessment_id),
                            course_name: "Assessment",
                            day: "Assessment",
                            day_num: 999,
                            topic_title: "Curriculum Topic Evaluation",
                            tasks: "10/10 Questions Evaluated",
                            badge: badgeType,
                            badgeImage: `/Records/${badgeType.toLowerCase()}.png`,
                            score: numericScore,
                            rating: Number((numericScore / 20).toFixed(1)),
                            review: `Scored ${numericScore}% - All questions evaluated and certified.`,
                            completed_at: assDate
                        }
                    },
                    { upsert: true, new: true }
                );
            }
        }
    } catch (err) {
        console.error("Error syncing real user data to records:", err.message);
    }
};

// Get real records for a user
const get_User_Records = async (req, res) => {
    try {
        const userId = req.params.userId || req.query.user_id;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        // 1. Clean out legacy dummy records
        await cleanupDummyRecords(userId);

        // 2. Sync real course progress & assessments
        await syncRealUserDataToRecords(userId);

        // 3. Fetch real records, latest first
        const userRecords = await RECORDS.find({ user_id: userId }).sort({ completed_at: -1, day_num: 1 });

        res.status(200).json({
            msg: "Real user records fetched successfully",
            records: userRecords
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// General get_Records
const get_Records = async (req, res) => {
    try {
        const userId = req.query.user_id || req.query.userId;
        if (userId) {
            await cleanupDummyRecords(userId);
            await syncRealUserDataToRecords(userId);
            const userRecords = await RECORDS.find({ user_id: userId }).sort({ completed_at: -1, day_num: 1 });
            return res.json({
                msg: "Real records fetched successfully",
                records: userRecords
            });
        }

        const getRecords = await RECORDS.find({}).sort({ completed_at: -1 }).limit(50);
        res.json({
            msg: "Records fetched successfully",
            records: getRecords
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add or update a specific record for a user
const add_Or_Update_Record = async (req, res) => {
    try {
        const {
            user_id,
            course_id,
            course_name,
            day,
            day_num,
            topic_title,
            tasks,
            badge,
            badgeImage,
            score,
            rating,
            review,
            completed_at
        } = req.body;

        if (!user_id || !course_id) {
            return res.status(400).json({ error: "user_id and course_id are required" });
        }

        const parsedDayNum = day_num || (day ? parseInt(day.replace(/\D/g, '')) || 1 : 1);
        const filter = {
            user_id,
            course_id,
            day_num: parsedDayNum
        };

        const updateData = {
            user_id,
            course_id,
            course_name: course_name || "Course",
            day: day || `Day ${parsedDayNum}`,
            day_num: parsedDayNum,
            topic_title: topic_title || `Day ${parsedDayNum} Topic`,
            tasks: tasks || "5/5 Tasks",
            badge: badge || "Silver",
            badgeImage: badgeImage || "/Records/silver.png",
            score: score !== undefined ? Number(score) : 100,
            rating: rating !== undefined ? Number(rating) : 5.0,
            review: review || `Completed Day ${parsedDayNum} curriculum lesson.`,
            completed_at: completed_at ? new Date(completed_at) : new Date()
        };

        const savedRecord = await RECORDS.findOneAndUpdate(
            filter,
            { $set: updateData },
            { new: true, upsert: true }
        );

        if (badge) {
            await USER.findOneAndUpdate(
                { user_id },
                { $addToSet: { badges: badge } }
            );
        }

        await HISTORY.create({
            user_id,
            action_title: `Earned ${badge || 'Achievement'} Badge`,
            action_description: `Achieved ${savedRecord.score}% on ${savedRecord.day} of ${savedRecord.course_name} (${savedRecord.topic_title})`
        });

        res.status(200).json({
            msg: "Record saved successfully",
            record: savedRecord
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const handle_Records_Section = async (req, res) => {
    return add_Or_Update_Record(req, res);
};

module.exports = {
    handle_Records_Section,
    get_Records,
    get_User_Records,
    add_Or_Update_Record
};
