const express = require("express")
const { handle_Records_Section, get_Records } = require("../Controllers/Records")
const recordsRouter = express.Router()

recordsRouter.patch( "/postrecords", handle_Records_Section )
recordsRouter.get( "/get", get_Records )

module.exports = recordsRouter