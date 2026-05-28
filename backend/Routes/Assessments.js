const express = require("express")
const { createAssessment, getAssessment, getSpecificAssessment } = require("../Controllers/Assessments")
const { generateAssessment } = require("../AI_Models/generateAssessments")

const assessmentRouter = express.Router()

assessmentRouter.post("/create", createAssessment)
assessmentRouter.get("/get", getAssessment)
assessmentRouter.get("/get/:assessment_id", getSpecificAssessment)
assessmentRouter.post("/generate", generateAssessment)

module.exports = assessmentRouter