const express = require("express");
const DoubtRouter = express.Router();
const DoubtSolver = require("../AI_Models/DoubtSolver");

DoubtRouter.post("/solve", DoubtSolver);

module.exports = DoubtRouter;