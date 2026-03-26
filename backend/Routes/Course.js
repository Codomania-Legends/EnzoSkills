const express = require("express")
const { handle_Course_Creation, get_All_Courses, handle_Enrolled_std, handle_Material, handle_All_Assessments,  } = require("../Controllers/Courses")
const courseRouter = express.Router()

//course Routers
courseRouter.post( "/create", handle_Course_Creation )
courseRouter.get( "/get", get_All_Courses)
courseRouter.patch( "/enroll", handle_Enrolled_std )

//material Routers
courseRouter.patch( "/material", handle_Material )

//Assessment Router
courseRouter.patch( "/assessment", handle_All_Assessments )

module.exports = courseRouter

