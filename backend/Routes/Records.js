const express = require("express")
const { handle_Records_Section } = require("../Controllers/Records")
const recordsRouter = express.Router()

recordsRouter.patch( "/postrecords", handle_Records_Section )

module.exports = recordsRouter