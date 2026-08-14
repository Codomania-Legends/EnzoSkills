const express = require("express")
const { handle_Course_Creation, createRoadmap, get_All_Courses, get_Single_Course, enrollStudentInCourse, handle_Material, handle_All_Assessments, complete_Assessment, get_User_Courses } = require("../Controllers/Courses")
const courseRouter = express.Router()

//course Routers
courseRouter.post("/create", handle_Course_Creation)
courseRouter.get("/get", get_All_Courses)
courseRouter.get("/get/:id", get_Single_Course)

courseRouter.get( "/user/:id" , get_User_Courses)

// courseRouter.get("/mycourses/:id", get_My_Courses)
courseRouter.patch("/enroll", enrollStudentInCourse)

//material Routers
courseRouter.patch("/material", handle_Material)

//Assessment Router
courseRouter.patch("/assessment", handle_All_Assessments)
courseRouter.post("/assessment/complete", complete_Assessment)

//roadmap router
courseRouter.patch("/roadmap", createRoadmap)

module.exports = courseRouter

