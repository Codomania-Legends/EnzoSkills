const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const userRouter = require("./Routes/User")
const courseRouter = require("./Routes/Course")

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//connecting mongoDB with nodejs
mongoose.connect("mongodb://localhost:27017/EnzoSkills")
    .then(() => {
        console.log("Connected to MongoDB")
    }).catch((err) => {
        console.log(err)
    })

//user router e.g. http://localhost:3000/user/getusers
app.use( "/user", userRouter )

//course router e.g. http://localhost:3000/courses/get
app.use( "/courses", courseRouter )

app.listen(3000, () => {
    console.log("Server started on port 3000")
})