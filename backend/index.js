const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const userRouter = require("./Routes/Route")

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

mongoose.connect("mongodb://localhost:27017/EnzoSkills")
    .then(() => {
        console.log("Connected to MongoDB")
    }).catch((err) => {
        console.log(err)
    })

app.use( "/user", userRouter )
app.use( "/courses", userRouter )

app.listen(3000, () => {
    console.log("Server started on port 3000")
})