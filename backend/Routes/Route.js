const express = require("express")
const { handle_User_Signup, handle_User_Login } = require("../Controllers/User")
const { handle_Course_Section } = require("../Controllers/Courses")
const userRouter = express.Router()

userRouter.post( "/signup", handle_User_Signup )
userRouter.post( "/login", handle_User_Login )
userRouter.post( "/courses", handle_Course_Section )

module.exports = userRouter

