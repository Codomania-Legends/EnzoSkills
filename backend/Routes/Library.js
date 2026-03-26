const express = require("express")
const { handle_Library_PDFs_and_Videos, get_Library } = require("../Controllers/Library")
const libraryRouter = express.Router()

//posting and getting library
libraryRouter.post( "/pdf", handle_Library_PDFs_and_Videos )
libraryRouter.get( "/getlib", get_Library )

module.exports = libraryRouter