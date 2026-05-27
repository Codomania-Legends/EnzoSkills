const express = require("express")
const { handle_User_Signup, handle_User_Login, get_All_Users, get_Single_User, handle_All_User_Details, update_All_Skills, update_All_Projects, update_All_Experience, update_User_Gamification } = require("../Controllers/User")
const getMotivationalQuotes = require("../AI_Models/QuotesGeneration")
const userRouter = express.Router()

// Daily Quotes
userRouter.get("/dailyquotes", getMotivationalQuotes)

//login and signup router
userRouter.post("/signup", handle_User_Signup)
userRouter.post("/login", handle_User_Login)

//Router forfilling all details
userRouter.patch("/alldetails", handle_All_User_Details)

// get all users
userRouter.get("/getusers", get_All_Users)

// get single user
userRouter.get("/getuser/:id", get_Single_User)

//router for updating skills
userRouter.patch("/skillupdate", update_All_Skills)

//router for updating projects
userRouter.patch("/updateproject", update_All_Projects)

//router for updating experience
userRouter.patch("/updateexperience", update_All_Experience)

//router for updating gamification
userRouter.patch("/gamification", update_User_Gamification)

module.exports = userRouter

