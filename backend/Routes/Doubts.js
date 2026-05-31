const express = require("express");
const DoubtRouter = express.Router();
const DoubtSolver = require("../AI_Models/DoubtSolver");
const { get_Course_Doubts, create_Doubt, reply_To_Doubt, delete_Doubt, edit_Doubt } = require("../Controllers/Doubt");

DoubtRouter.post("/solve", DoubtSolver);
DoubtRouter.get("/course/:courseId", get_Course_Doubts);
DoubtRouter.post("/create", create_Doubt);
DoubtRouter.post("/reply", reply_To_Doubt);
DoubtRouter.delete("/delete/:doubtId", delete_Doubt);
DoubtRouter.patch("/edit", edit_Doubt);

module.exports = DoubtRouter;