const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const userRouter = require("./Routes/User")
const courseRouter = require("./Routes/Course")
const libraryRouter = require("./Routes/Library")
const recordsRouter = require("./Routes/Records")
const historyRouter = require("./Routes/History")
const DoubtRouter = require("./Routes/Doubts")
const assessmentRouter = require("./Routes/Assessments")

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
app.use("/user", userRouter)

//course router e.g. http://localhost:3000/courses/get
app.use("/courses", courseRouter)

//assessments router e.g. http://localhost:3000/assessments/create
app.use("/assessments", assessmentRouter)

//library router e.g. http://localhost:3000/library/get
app.use("/library", libraryRouter)

//doubts router e.g. http://localhost:3000/doubts/solve
app.use("/doubts", DoubtRouter)

//records router e.g. http://localhost:3000/records/get
app.use("/records", recordsRouter)

//history router e.g. http://localhost:3000/history/get/:userId
app.use("/history", historyRouter)

app.listen(3000, () => {
    console.log("Server started on port 3000")
})