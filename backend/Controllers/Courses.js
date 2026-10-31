const mongoose = require("mongoose");
const COURSES = require("../Models/Courses");
const HISTORY = require("../Models/History");
const { nanoid } = require("nanoid");
const USER = require("../Models/User");

// creating courses in function below
const handle_Course_Creation = async (req, res) => {
    try {
        if (!req.body) throw (new Error("Body not found"))
        const { image, course_name, duration, price, rating, description, features, skills, level, type, roadmap, } = req.body
        const course_id = nanoid(10)
        if (await COURSES.findOne({ course_name })) throw (new Error("Course Already Exists"))
        const newCourse = await COURSES.create({
            course_id: course_id,
            image: image,
            course_name: course_name,
            duration: duration,
            price: price,
            rating: rating,
            description: description,
            features: features,
            skills: skills,
            level: level,
            type: type,
            roadmap: roadmap,
        })

        if (!newCourse) throw (new Error("Internal Error"))
        res.json({
            msg: "Course Created Successfully",
            course: newCourse
        })
    } catch (error) {
        res.json({ error: error.message })
    }

}

// finding and updating the enrolled students in a cours

const enrollStudentInCourse = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ msg: "Request body cannot be empty" });
        }
        console.log("Enrolling")
        const { user_id, course_id } = req.body;

        // Atomically find the course and push the user ONLY if they aren't already in the array
        const updatedCourse = await COURSES.findOneAndUpdate(
            {
                course_id: course_id,
                "user_enrolled.user_id": { $ne: user_id } // Prevents duplicate enrollment
            },
            {
                $push: { user_enrolled: { user_id: user_id } }
            },
            { returnDocument: 'after' }
        );

        await USER.findOneAndUpdate(
            {
                user_id,
                "courses.course_id": { $ne: course_id }
            },
            {
                $push: {
                    courses: {
                        course_id,
                        progress_status: "In Progress",
                        week_completed: 0,
                        topics_completed: 0,
                        subtopics_completed: 0,
                        progress_percentage: 0
                    }
                }
            },
            {
                new: true // Mongoose
            }
        );


        // If no document was returned, it means either the course doesn't exist, OR the user is already enrolled
        if (!updatedCourse) {
            const courseExists = await COURSES.findOne({ course_id: course_id });

            if (!courseExists) {
                return res.status(404).json({ msg: "Course not found" });
            }

            return res.status(409).json({ msg: "User is already enrolled in this course" });
        }

        // Log the action
        await HISTORY.create({
            user_id: user_id,
            action_type: "COURSE_ENROLL",
            action_title: "Enrolled in Course",
            action_description: `You have successfully enrolled in the course: ${updatedCourse.course_name}. Happy learning!`
        });

        res.status(200).json({
            msg: "User enrolled successfully",
            enrolled: updatedCourse
        });

    } catch (error) {
        console.group()
        res.status(500).json({ error: error.message });
    }
};


// learning material for the opted course
const handle_Material = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "Body not found" });
        }

        let { course_id, daywise_material } = req.body;

        // If daywise_material is sent as a string (e.g. from x-www-form-urlencoded), parse it
        if (typeof daywise_material === "string") {
            try {
                daywise_material = JSON.parse(daywise_material);
            } catch {
                return res.status(400).json({ error: "daywise_material must be valid JSON or an array/object" });
            }
        }

        // Handle case where user pastes a full object or array containing { course_id, daywise_material }
        if (daywise_material && !Array.isArray(daywise_material) && daywise_material.daywise_material) {
            course_id = course_id || daywise_material.course_id;
            daywise_material = daywise_material.daywise_material;
        } else if (Array.isArray(daywise_material) && daywise_material.length > 0 && daywise_material[0].daywise_material) {
            course_id = course_id || daywise_material[0].course_id;
            daywise_material = daywise_material[0].daywise_material;
        }

        if (!course_id) {
            return res.status(400).json({ error: "course_id is required" });
        }

        if (!daywise_material) {
            return res.status(400).json({ error: "daywise_material is required" });
        }

        const itemsToPush = Array.isArray(daywise_material) ? daywise_material : [daywise_material];

        let query = { course_id: course_id };
        if (mongoose.Types.ObjectId.isValid(course_id)) {
            query = { $or: [{ course_id: course_id }, { _id: course_id }] };
        }

        const course = await COURSES.findOne(query);

        if (!course) {
            return res.status(404).json({ error: "Course not found with that ID" });
        }

        if (!Array.isArray(course.daywise_material)) {
            course.daywise_material = [];
        }

        // Upsert each item by day number so we never create duplicate days
        for (const item of itemsToPush) {
            const itemDay = Number(item.day);
            const existingIndex = course.daywise_material.findIndex(
                (m) => Number(m.day) === itemDay
            );
            if (existingIndex !== -1) {
                course.daywise_material[existingIndex] = item;
            } else {
                course.daywise_material.push(item);
            }
        }

        // Keep daywise material sorted chronologically by day
        course.daywise_material.sort((a, b) => (Number(a.day) || 0) - (Number(b.day) || 0));

        await course.save();

        res.status(200).json({
            msg: "Material updated/added successfully",
            course: course
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//weekly and final assessment for the opted/enrolled course
const handle_All_Assessments = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "Body not found" });
        }

        const { course_id, weekwise_assessment, final_assessment } = req.body;

        const updatedCourse = await COURSES.findOneAndUpdate(
            { course_id: course_id },
            {
                $push: {
                    // Use $each to push individual items from the array
                    weekwise_assessment: { $each: weekwise_assessment || [] },
                    final_assessment: { $each: final_assessment || [] }
                }
            },
            { new: true, runValidators: true }
        );

        if (!updatedCourse) {
            return res.status(404).json({ error: "Course not found" });
        }

        res.status(200).json({
            msg: "Assessments added successfully",
            course: updatedCourse
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// getting all the courses
const get_All_Courses = async (req, res) => {
    try {
        const getCourses = await COURSES.find({})
        if (getCourses.length == 0) throw (new Error("Courses are not Available"))
        res.json({
            msg: "Courses Fetched Successfully",
            course: getCourses
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


// getting a single course by ID
const get_Single_Course = async (req, res) => {
    try {
        const courseId = req.params.id;
        const query = mongoose.Types.ObjectId.isValid(courseId)
            ? { $or: [{ course_id: courseId }, { _id: courseId }] }
            : { course_id: courseId };
        const getCourse = await COURSES.findOne(query);
        if (!getCourse) throw (new Error("Course not found"));
        res.json({
            msg: "Course Fetched Successfully",
            course: getCourse
        });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

const complete_Assessment = async (req, res) => {
    try {
        const { user_id, course_id, assessment_id, score } = req.body;
        
        if (user_id) {
            // Push to user assessments
            await USER.findOneAndUpdate(
                { user_id },
                {
                    $push: {
                        assessments: {
                            assessment_id: assessment_id || "final_assessment",
                            status: "Completed",
                            completed_at: new Date().toISOString(),
                            score: String(score)
                        }
                    }
                }
            );

            // Log activity strictly for Action 3: Give assessment
            await HISTORY.create({
                user_id,
                action_type: "ASSESSMENT_GIVEN",
                action_title: "Assessment Completed",
                action_description: `Completed assessment for ${course_id || 'course'} with score ${score}%.`
            });
        }

        res.json({ msg: "Assessment marked as complete", assessment_id, score });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createRoadmap = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) throw (new Error("Body not found"))
        const { course_id, roadmap } = req.body

        const updatedCourse = await COURSES.findOneAndUpdate(
            { course_id: course_id },
            {
                $push: {
                    roadmap: roadmap
                }
            },
            { new: true, runValidators: true }
        )
        if (!updatedCourse) throw (new Error("Course not found"))
        res.json({
            msg: "Roadmap Created Successfully",
            course: updatedCourse
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function get_User_Courses(req, res) {
    try {
        const userId = req.params.id || req.params.user_id;
        const fetchedCourses = await COURSES.find({ "user_enrolled.user_id": userId });
        res.json({
            msg: "Courses Fetched Successfully",
            courses: fetchedCourses,
            course: fetchedCourses
        });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Update progress for a user in a course
const update_Course_Progress = async (req, res) => {
    try {
        const {
            user_id,
            course_id,
            course_name,
            progress_percentage,
            completed_days,
            topics_completed,
            week_completed
        } = req.body;

        if (!user_id || !course_id) {
            return res.status(400).json({ error: "user_id and course_id are required" });
        }

        const percentage = Math.min(100, Math.max(0, Number(progress_percentage) || 0));
        const completedDaysList = Array.isArray(completed_days) ? completed_days.map(Number) : [];
        const completedCount = completedDaysList.length || Number(topics_completed) || 0;
        const weekCount = Number(week_completed) || (completedCount > 0 ? Math.max(1, Math.ceil(completedCount / 5)) : 0);
        const status = percentage >= 100 ? "Completed" : "In Progress";

        // Find user
        const user = await USER.findOne({ user_id });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (!Array.isArray(user.courses)) {
            user.courses = [];
        }

        const courseIndex = user.courses.findIndex(c => String(c.course_id) === String(course_id));

        if (courseIndex !== -1) {
            user.courses[courseIndex].progress_percentage = percentage;
            user.courses[courseIndex].completed_days = completedDaysList;
            user.courses[courseIndex].topics_completed = completedCount;
            user.courses[courseIndex].week_completed = weekCount;
            user.courses[courseIndex].progress_status = status;
            user.courses[courseIndex].last_activity = new Date();
            if (course_name && !user.courses[courseIndex].course_name) {
                user.courses[courseIndex].course_name = course_name;
            }
        } else {
            user.courses.push({
                course_id: String(course_id),
                course_name: course_name || "Course",
                progress_percentage: percentage,
                completed_days: completedDaysList,
                topics_completed: completedCount,
                week_completed: weekCount,
                progress_status: status,
                last_activity: new Date()
            });
        }

        await user.save();

        // Also ensure COURSES user_enrolled contains user
        await COURSES.findOneAndUpdate(
            { course_id: String(course_id), "user_enrolled.user_id": { $ne: user_id } },
            { $push: { user_enrolled: { user_id } } }
        );

        // Auto-log to history strictly for Action 2: Learn something
        if (completedCount > 0) {
            await HISTORY.create({
                user_id,
                action_type: "LESSON_LEARN",
                action_title: "Curriculum Lesson Completed",
                action_description: `Completed learning day in ${course_name || 'Course'} (${percentage}% total progress).`
            });

            // Upsert real day records in the RECORDS collection in MongoDB
            const RECORDS = require("../Models/Records");
            for (const dayNum of completedDaysList) {
                const badgeType = dayNum % 5 === 0 ? "Gold" : dayNum % 2 === 0 ? "Silver" : "Bronze";
                await RECORDS.findOneAndUpdate(
                    { user_id, course_id: String(course_id), day_num: dayNum },
                    {
                        $set: {
                            user_id,
                            course_id: String(course_id),
                            course_name: course_name || "Course",
                            day: `Day ${dayNum}`,
                            day_num: dayNum,
                            tasks: "5/5 Tasks",
                            badge: badgeType,
                            badgeImage: `/Records/${badgeType.toLowerCase()}.png`,
                            score: 100,
                            rating: 5.0,
                            review: `Successfully completed Day ${dayNum} curriculum lesson.`
                        }
                    },
                    { upsert: true, new: true }
                );
            }
        }

        res.status(200).json({
            msg: "Progress saved successfully",
            progress: {
                course_id,
                progress_percentage: percentage,
                completed_days: completedDaysList,
                topics_completed: completedCount,
                week_completed: weekCount,
                progress_status: status
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get specific course progress for a user
const get_Course_Progress = async (req, res) => {
    try {
        const { userId, courseId } = req.params;
        if (!userId || !courseId) {
            return res.status(400).json({ error: "userId and courseId are required" });
        }

        const user = await USER.findOne({ user_id: userId });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const courseProgress = (user.courses || []).find(c => String(c.course_id) === String(courseId));
        if (!courseProgress) {
            return res.status(200).json({
                msg: "No progress found for course",
                progress: {
                    course_id: courseId,
                    progress_percentage: 0,
                    completed_days: [],
                    week_completed: 0,
                    topics_completed: 0,
                    progress_status: "Not Started"
                }
            });
        }

        res.status(200).json({
            msg: "Course progress fetched successfully",
            progress: courseProgress
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    handle_Course_Creation,
    get_All_Courses,
    get_Single_Course,
    enrollStudentInCourse,
    handle_Material,
    handle_All_Assessments,
    complete_Assessment,
    createRoadmap,
    get_User_Courses,
    update_Course_Progress,
    get_Course_Progress
}