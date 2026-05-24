const express = require("express")
const { handle_Course_Creation, get_All_Courses, get_Single_Course, handle_Enrolled_std, handle_Material, handle_All_Assessments, complete_Assessment } = require("../Controllers/Courses")
const courseRouter = express.Router()

//course Routers
courseRouter.post( "/create", handle_Course_Creation )
courseRouter.get( "/get", get_All_Courses)
courseRouter.get( "/get/:id", get_Single_Course)
courseRouter.patch( "/enroll", handle_Enrolled_std )

//material Routers
courseRouter.patch( "/material", handle_Material )

//Assessment Router
courseRouter.patch( "/assessment", handle_All_Assessments )
courseRouter.post( "/assessment/complete", complete_Assessment )

module.exports = courseRouter

