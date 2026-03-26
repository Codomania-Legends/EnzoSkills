const mongoose = require("mongoose")
const {Schema, model} = require("mongoose")

const LibrarySchema = new Schema({
    books : [{
        book_name : String,
        book_img : String,
        book_pdf : String
    }],
    videos : [{
        video_name : String,
        video_img : String,
        video_link : String
    }]
})

const LIBRARY = model( 'library', LibrarySchema )

module.exports = LIBRARY