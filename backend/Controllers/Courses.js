const COURSES = require("../Models/Courses")
const { nanoid } = require("nanoid")

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


// finding and updating the enrolled students in a course
const handle_Enrolled_std = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ msg: "Body not found" });
        }

        const { user_id, course_id } = req.body;

        const UserEnrolled = await COURSES.findOneAndUpdate(
            { course_id: course_id },
            { $push: { user_enrolled: { user_id: user_id } } },
            { new: true }
        );

        if (!UserEnrolled) {
            return res.status(404).json({ msg: "Course not found" });
        }

        // Log the action!
        const HISTORY = require("../Models/History");
        await HISTORY.create({
            user_id: user_id,
            action_title: "Enrolled in Course",
            action_description: `You have successfully enrolled in the course: ${UserEnrolled.course_name}. Happy learning!`
        });

        res.status(200).json({
            msg: "User Enrolled Successfully",
            enrolled: UserEnrolled
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// learning material for the opted course
const handle_Material = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "Body not found" });
        }

        const { course_id, daywise_material } = req.body;

        const updatedCourse = await COURSES.findOneAndUpdate(
            { course_id: course_id },
            {
                $push: {
                    daywise_material: Array.isArray(daywise_material)
                        ? { $each: daywise_material }
                        : daywise_material
                }
            },
            { new: true, runValidators: true }
        );

        if (!updatedCourse) {
            return res.status(404).json({ error: "Course not found with that ID" });
        }

        res.status(200).json({
            msg: "Material updated/added successfully",
            course: updatedCourse
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
        const getCourse = await COURSES.findOne({ course_id: courseId });
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
        const { course_id, assessment_id, score } = req.body;
        // Mock backend saving logic here. Would typically find User and push to completed_assessments
        res.json({ msg: "Assessment marked as complete", assessment_id, score });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const get_My_Courses = async (req, res) => {
    try {
        const courseId = req.params.id;
        const getCourse = await COURSES.findOne({ course_id: courseId });
        if (!getCourse) throw (new Error("Course not found"));
        res.json({
            msg: "Course Fetched Successfully",
            course: getCourse
        });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }4
}

module.exports = {
    handle_Course_Creation,
    get_All_Courses,
    get_Single_Course,
    handle_Enrolled_std,
    handle_Material,
    handle_All_Assessments,
    complete_Assessment
}